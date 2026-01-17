// index.js
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "2mb" }));

const RETOOL_DOMAIN = process.env.RETOOL_DOMAIN;      // can be full agent-card URL OR org base
const AGENT_ID = process.env.RETOOL_AGENT_ID;         // UUID (needed if RETOOL_DOMAIN is org base)
const API_KEY = process.env.RETOOL_A2A_API_KEY;       // retool_wk_...

const PORT = Number(process.env.PORT || 4000);
const POLL_EVERY_MS = 15000;            // 15 seconds (as requested)
const AGENT_CACHE_MS = 5 * 60 * 1000;   // cache agent-card for 5 minutes
const RUN_KEEP_MS = 60 * 60 * 1000;     // keep completed runs in memory for 1 hour

// -------------------- helpers --------------------

function nowIso() {
  return new Date().toISOString();
}

function maskKey(k) {
  const s = String(k || "");
  if (!s) return "(empty)";
  if (s.length <= 12) return s;
  return `${s.slice(0, 10)}…${s.slice(-6)}`;
}

function resolveAgentCardUrl({ retoolDomain, agentId }) {
  const v = String(retoolDomain || "").trim();
  if (!v) return null;

  if (v.includes("/.well-known/agent-card.json")) return v;

  if (!agentId) return null;

  const base = v.replace(/\/+$/, "");
  return `${base}/api/agents/a2a/${agentId}/.well-known/agent-card.json`;
}

function extractText(task) {
  const parts = task?.status?.message?.parts || [];
  const text = parts
    .filter((p) => p?.kind === "text" && typeof p?.text === "string")
    .map((p) => p.text)
    .join("\n");
  return text || "";
}

// A more "raw-ish" debug string for live updates
function extractAllPartsAsText(task) {
  const parts = task?.status?.message?.parts || [];
  if (!Array.isArray(parts) || parts.length === 0) return "";

  return parts
    .map((p, idx) => {
      if (p?.kind === "text" && typeof p?.text === "string") {
        return p.text;
      }
      // if non-text parts exist, stringify them so you SEE them
      return `(part ${idx}) ${JSON.stringify(p, null, 2)}`;
    })
    .join("\n\n");
}

function safeJsonParse(s) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

// -------------------- in-memory run store --------------------

/**
 * run object shape:
 * {
 *   reqId, taskId, baseUrl,
 *   createdAt, lastPolledAt, completedAt,
 *   pollCount, state,
 *   textLen,
 *   lastReplyText, lastPartsText,
 *   lastRawTask,
 *   lastError
 *   timer
 * }
 */
const runs = new Map(); // reqId -> run

function listRuns(limit = 10) {
  const arr = Array.from(runs.values());
  arr.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  return arr.slice(0, limit).map((r) => ({
    reqId: r.reqId,
    taskId: r.taskId,
    state: r.state,
    createdAt: r.createdAt,
    lastPolledAt: r.lastPolledAt,
    completedAt: r.completedAt,
    pollCount: r.pollCount,
    textLen: r.textLen,
    lastError: r.lastError || null,
  }));
}

function cleanupOldRuns() {
  const now = Date.now();
  for (const [reqId, run] of runs.entries()) {
    if (run.completedAt && now - run.completedAt > RUN_KEEP_MS) {
      if (run.timer) clearInterval(run.timer);
      runs.delete(reqId);
    }
  }
}

setInterval(cleanupOldRuns, 60 * 1000).unref();

// -------------------- agent-card cache --------------------

let agentCache = {
  at: 0,
  cardUrl: null,
  baseUrl: null, // HTTP+JSON base url
};

function requireEnvOrThrow() {
  const cardUrl = resolveAgentCardUrl({ retoolDomain: RETOOL_DOMAIN, agentId: AGENT_ID });
  if (!API_KEY || !cardUrl) {
    const err =
      "Missing RETOOL_A2A_API_KEY or invalid RETOOL_DOMAIN/RETOOL_AGENT_ID. " +
      "Set RETOOL_DOMAIN to agent-card URL OR set RETOOL_DOMAIN to org domain + RETOOL_AGENT_ID.";
    throw new Error(err);
  }
  return { cardUrl };
}

async function getHttpBaseUrl(reqId) {
  const { cardUrl } = requireEnvOrThrow();

  if (agentCache.baseUrl && agentCache.cardUrl === cardUrl && Date.now() - agentCache.at < AGENT_CACHE_MS) {
    return agentCache.baseUrl;
  }

  const headers = {
    "Content-Type": "application/json",
    "X-Api-Key": API_KEY, // casing matters for Retool
  };

  const t0 = Date.now();
  console.log(`[${reqId}] agent-card -> GET ${cardUrl} @ ${nowIso()}`);

  const cardRes = await fetch(cardUrl, { headers });
  const bodyText = await cardRes.text().catch(() => "");

  console.log(
    `[${reqId}] agent-card <- status=${cardRes.status} (${Date.now() - t0}ms), content-type=${cardRes.headers.get(
      "content-type"
    )}`
  );

  if (!cardRes.ok) {
    throw new Error(`agent-card failed: ${cardRes.status} ${bodyText}`);
  }

  const card = safeJsonParse(bodyText) || (await cardRes.json().catch(() => null));
  if (!card) throw new Error("agent-card JSON parse failed.");

  const httpInterface = Array.isArray(card.additionalInterfaces)
    ? card.additionalInterfaces.find((i) => i?.transport === "HTTP+JSON" && typeof i?.url === "string")
    : null;

  const baseUrl = String(httpInterface?.url || "").replace(/\/+$/, "");
  if (!baseUrl) {
    throw new Error("agent-card missing HTTP+JSON interface URL (additionalInterfaces[].transport === 'HTTP+JSON').");
  }

  agentCache = { at: Date.now(), cardUrl, baseUrl };
  console.log(`[${reqId}] baseUrl (HTTP+JSON): ${baseUrl}`);

  return baseUrl;
}

// -------------------- background poller --------------------

function isTerminalState(state) {
  return state === "completed" || state === "failed" || state === "canceled";
}

async function pollRun(run) {
  const reqId = run.reqId;
  const headers = {
    "Content-Type": "application/json",
    "X-Api-Key": API_KEY,
  };

  const url = `${run.baseUrl}/v1/tasks/${run.taskId}`;
  const pollIndex = run.pollCount + 1;
  const t0 = Date.now();

  console.log(`[${reqId}] task:get#${pollIndex} -> GET ${url} @ ${nowIso()}`);

  const tRes = await fetch(url, { headers });
  const bodyText = await tRes.text().catch(() => "");

  console.log(
    `[${reqId}] task:get#${pollIndex} <- status=${tRes.status} (${Date.now() - t0}ms), content-type=${tRes.headers.get(
      "content-type"
    )}`
  );

  if (!tRes.ok) {
    run.lastError = `get task failed: ${tRes.status} ${bodyText}`;
    run.lastPolledAt = Date.now();
    run.pollCount++;
    console.log(`[${reqId}] ERROR: ${run.lastError}`);
    return;
  }

  const task = safeJsonParse(bodyText) || (await tRes.json().catch(() => null));
  if (!task) {
    run.lastError = `get task: JSON parse failed`;
    run.lastPolledAt = Date.now();
    run.pollCount++;
    console.log(`[${reqId}] ERROR: ${run.lastError}`);
    return;
  }

  const state = task?.status?.state || "unknown";

  run.lastRawTask = task;
  run.state = state;
  run.lastReplyText = extractText(task);              // assistant text parts only
  run.lastPartsText = extractAllPartsAsText(task);    // includes non-text parts (stringified)
  run.lastPolledAt = Date.now();
  run.pollCount++;
  run.lastError = null;

  const elapsed = Date.now() - run.createdAt;
  console.log(`[${reqId}] poll ${run.pollCount} state=${state} @ ${elapsed}ms`);

  if (isTerminalState(state)) {
    run.completedAt = Date.now();
    if (run.timer) clearInterval(run.timer);
    run.timer = null;
    console.log(`[${reqId}] DONE state=${state} total=${Date.now() - run.createdAt}ms taskId=${run.taskId}`);
  }
}

// -------------------- routes --------------------

app.get("/health", (req, res) => res.json({ ok: true, now: nowIso() }));

app.get("/runs", (req, res) => {
  const limit = Math.max(1, Math.min(50, Number(req.query.limit || 10)));
  res.json({ runs: listRuns(limit) });
});

app.get("/chat/status", (req, res) => {
  const reqId = String(req.query.reqId || "").trim();
  if (!reqId) return res.status(400).json({ error: "Missing reqId" });

  const run = runs.get(reqId);
  if (!run) return res.status(404).json({ error: `Unknown reqId: ${reqId}` });

  const includeRaw = String(req.query.raw || "1") === "1";

  res.json({
    reqId: run.reqId,
    taskId: run.taskId,
    state: run.state,
    pollEveryMs: POLL_EVERY_MS,
    pollCount: run.pollCount,
    createdAt: run.createdAt,
    lastPolledAt: run.lastPolledAt,
    completedAt: run.completedAt || null,
    reply: run.lastReplyText || "",
    partsText: run.lastPartsText || "",
    raw: includeRaw ? run.lastRawTask : null,
    lastError: run.lastError || null,
    debug: {
      reqId: run.reqId,
      totalMs: Date.now() - run.createdAt,
    },
  });
});

app.post("/chat", async (req, res) => {
  const reqId = `req_${Date.now()}_${crypto.randomBytes(8).toString("hex")}`;

  try {
    const text = String(req.body?.text || "").trim();
    if (!text) return res.status(400).json({ error: "Missing text" });

    console.log(`\n[${reqId}] /chat called @ ${nowIso()} textLen=${text.length}`);
    console.log(`[${reqId}] env:`, {
      RETOOL_DOMAIN: RETOOL_DOMAIN || "(missing)",
      RETOOL_AGENT_ID: AGENT_ID || "(missing)",
      RETOOL_A2A_API_KEY: maskKey(API_KEY),
      cardUrl: resolveAgentCardUrl({ retoolDomain: RETOOL_DOMAIN, agentId: AGENT_ID }) || "(null)",
    });

    const baseUrl = await getHttpBaseUrl(reqId);

    const headers = {
      "Content-Type": "application/json",
      "X-Api-Key": API_KEY,
    };

    const sendBody = {
      message: {
        kind: "message",
        messageId: `msg-${crypto.randomUUID()}`,
        role: "user",
        parts: [{ kind: "text", text }],
      },
    };

    const t0 = Date.now();
    const sendUrl = `${baseUrl}/v1/message:send`;
    console.log(`[${reqId}] message:send -> POST ${sendUrl} @ ${nowIso()}`);

    const sendRes = await fetch(sendUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(sendBody),
    });

    const sendText = await sendRes.text().catch(() => "");
    console.log(
      `[${reqId}] message:send <- status=${sendRes.status} (${Date.now() - t0}ms), content-type=${sendRes.headers.get(
        "content-type"
      )}`
    );

    if (!sendRes.ok) throw new Error(`message:send failed: ${sendRes.status} ${sendText}`);

    const task = safeJsonParse(sendText) || (await sendRes.json().catch(() => null));
    if (!task?.id) throw new Error(`message:send returned no task.id: ${sendText}`);

    const run = {
      reqId,
      taskId: task.id,
      baseUrl,
      createdAt: Date.now(),
      lastPolledAt: null,
      completedAt: null,
      pollCount: 0,
      state: task?.status?.state || "submitted",
      textLen: text.length,
      lastReplyText: "",
      lastPartsText: "",
      lastRawTask: task,
      lastError: null,
      timer: null,
    };

    runs.set(reqId, run);

    console.log(`[${reqId}] task.id=${run.taskId} initial state=${run.state}`);

    // Start background polling every 15s until terminal
    run.timer = setInterval(() => {
      pollRun(run).catch((e) => {
        run.lastError = String(e?.message || e);
        console.log(`[${reqId}] pollRun exception: ${run.lastError}`);
      });
    }, POLL_EVERY_MS);

    // do an immediate poll once (so frontend sees it quickly)
    pollRun(run).catch((e) => {
      run.lastError = String(e?.message || e);
      console.log(`[${reqId}] initial poll exception: ${run.lastError}`);
    });

    // Return immediately — frontend will poll /chat/status
    return res.json({
      reqId,
      taskId: run.taskId,
      state: run.state,
      pollEveryMs: POLL_EVERY_MS,
      createdAt: run.createdAt,
    });
  } catch (e) {
    console.log(`[${reqId}] ERROR: ${String(e?.message || e)}`);
    return res.status(500).json({ error: String(e?.message || e), reqId });
  }
});

console.log("\n[Startup Env Check]");
console.log("PORT:", PORT);
console.log("RETOOL_DOMAIN:", RETOOL_DOMAIN || "(missing)");
console.log("RETOOL_AGENT_ID:", AGENT_ID || "(missing)");
console.log("RETOOL_A2A_API_KEY:", maskKey(API_KEY));
console.log(
  "Resolved agent-card URL:",
  resolveAgentCardUrl({ retoolDomain: RETOOL_DOMAIN, agentId: AGENT_ID }) || "(null)"
);
console.log("--------------------\n");

app.listen(PORT, () => console.log(`Agent server on http://localhost:${PORT}`));
