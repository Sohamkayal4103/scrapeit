import React, { useEffect, useMemo, useRef, useState } from "react";

const API_BASE = String(import.meta.env.VITE_AGENT_API_BASE || "").replace(/\/$/, "");
const CHAT_URL = API_BASE ? `${API_BASE}/chat` : "/chat";
const RUNS_URL = API_BASE ? `${API_BASE}/runs` : "/runs";
const STATUS_URL = API_BASE ? `${API_BASE}/chat/status` : "/chat/status";

const POLL_EVERY_MS = 15000; // frontend polls backend every 15 seconds (as requested)

const initialAssistantMessage = {
  id: "m0",
  role: "assistant",
  content:
    "Ask me about Luma events. Try: “Show me today’s events”, “AI events this weekend”, or “Summarize the PixVerse hackathon event details.”",
  createdAt: Date.now(),
};

function makeId() {
  return `m_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={isUser ? "w-full flex justify-end" : "w-full flex justify-start"}>
      <div
        className={
          isUser
            ? "max-w-[90%] md:max-w-[70%] rounded-2xl px-4 py-3 bg-green-600 text-white shadow"
            : "max-w-[90%] md:max-w-[70%] rounded-2xl px-4 py-3 bg-[#111827] border border-white/10 text-gray-100 shadow"
        }
        style={{ whiteSpace: "pre-wrap" }}
      >
        {content}
      </div>
    </div>
  );
}

function isTerminal(state) {
  return state === "completed" || state === "failed" || state === "canceled";
}

async function startRun(text) {
  const t0 = Date.now();
  console.log("[FE] startRun ->", { CHAT_URL, textLen: text.length });

  const res = await fetch(CHAT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await res.json().catch(() => ({}));
  console.log("[FE] startRun <-", { ok: res.ok, status: res.status, ms: Date.now() - t0, data });

  if (!res.ok) throw new Error(data?.error || `startRun failed (${res.status})`);
  if (!data?.reqId) throw new Error("Backend did not return reqId");

  return data; // { reqId, taskId, state, pollEveryMs, createdAt }
}

async function fetchStatus(reqId) {
  const t0 = Date.now();
  const url = `${STATUS_URL}?reqId=${encodeURIComponent(reqId)}&raw=1`;
  console.log("[FE] fetchStatus ->", url);

  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));

  console.log("[FE] fetchStatus <-", {
    ok: res.ok,
    status: res.status,
    ms: Date.now() - t0,
    state: data?.state,
    pollCount: data?.pollCount,
    lastError: data?.lastError || null,
  });

  if (!res.ok) throw new Error(data?.error || `status failed (${res.status})`);
  return data;
}

async function fetchLastRunReqId() {
  const url = `${RUNS_URL}?limit=1`;
  const res = await fetch(url);
  const data = await res.json().catch(() => ({}));
  const last = Array.isArray(data?.runs) && data.runs.length ? data.runs[0] : null;
  return last?.reqId || null;
}

function formatRunContent(status) {
  const {
    reqId,
    taskId,
    state,
    pollCount,
    createdAt,
    lastPolledAt,
    completedAt,
    reply,
    partsText,
    raw,
    lastError,
    debug,
  } = status || {};

  // Show EVERYTHING (no truncation)
  return [
    `reqId=${reqId}`,
    taskId ? `taskId=${taskId}` : null,
    `state=${state}`,
    pollCount != null ? `pollCount=${pollCount}` : null,
    createdAt ? `createdAt=${new Date(createdAt).toISOString?.() || createdAt}` : null,
    lastPolledAt ? `lastPolledAt=${new Date(lastPolledAt).toISOString?.() || lastPolledAt}` : null,
    completedAt ? `completedAt=${new Date(completedAt).toISOString?.() || completedAt}` : null,
    debug?.totalMs != null ? `totalMs=${debug.totalMs}` : null,
    lastError ? `lastError=${lastError}` : null,
    "",
    "---",
    "(partsText: live message parts)",
    partsText || "(empty)",
    "",
    "---",
    "(reply: extracted text-only)",
    reply || "(empty)",
    "",
    "---",
    "(raw: full task JSON)",
    raw ? JSON.stringify(raw, null, 2) : "(raw missing)",
  ]
    .filter(Boolean)
    .join("\n");
}

function KnowMore() {
  const [messages, setMessages] = useState([initialAssistantMessage]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);

  // Keep pollers so we can stop them cleanly
  const pollersRef = useRef(new Map()); // reqId -> intervalId

  const suggestions = useMemo(
    () => [
      "Show me events today on https://lu.ma/sf",
      "Find AI / GenAI events this weekend on https://lu.ma/sf",
      "List hackathons on https://lu.ma/sf",
      "Show me founder / startup events tomorrow on https://lu.ma/sf",
      "Give me a digest of security events this week on https://lu.ma/sf",
    ],
    []
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // On mount: dynamically render LAST RUN from backend (no static hardcode)
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        console.log("[FE] env:", {
          VITE_AGENT_API_BASE: import.meta.env.VITE_AGENT_API_BASE,
          API_BASE,
          CHAT_URL,
          RUNS_URL,
          STATUS_URL,
        });

        const lastReqId = await fetchLastRunReqId();
        if (!alive || !lastReqId) return;

        const msgId = `m_last_${lastReqId}`;
        setMessages((prev) => [
          ...prev,
          {
            id: msgId,
            role: "assistant",
            content: `Loading last run… reqId=${lastReqId}`,
            createdAt: Date.now(),
          },
        ]);

        startPollingStatus(lastReqId, msgId);
      } catch (e) {
        console.log("[FE] last run load error:", String(e?.message || e));
      }
    })();

    return () => {
      alive = false;
      // clear all pollers on unmount
      for (const [, intervalId] of pollersRef.current.entries()) clearInterval(intervalId);
      pollersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function updateMessageContent(messageId, newContent) {
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, content: newContent } : m))
    );
  }

  async function tickStatus(reqId, messageId) {
    try {
      const status = await fetchStatus(reqId);
      updateMessageContent(messageId, formatRunContent(status));

      if (isTerminal(status?.state)) {
        const intervalId = pollersRef.current.get(reqId);
        if (intervalId) clearInterval(intervalId);
        pollersRef.current.delete(reqId);
        console.log("[FE] terminal state reached, stop polling:", { reqId, state: status?.state });
        setIsTyping(false);
      }
    } catch (e) {
      updateMessageContent(
        messageId,
        `⚠️ status poll error for reqId=${reqId}\n${String(e?.message || e)}`
      );
    }
  }

  function startPollingStatus(reqId, messageId) {
    // avoid duplicate pollers for same reqId
    if (pollersRef.current.has(reqId)) return;

    console.log("[FE] startPollingStatus:", { reqId, everyMs: POLL_EVERY_MS });

    // immediate tick
    tickStatus(reqId, messageId);

    const intervalId = setInterval(() => {
      tickStatus(reqId, messageId);
    }, POLL_EVERY_MS);

    pollersRef.current.set(reqId, intervalId);
  }

  async function sendMessage(text) {
    const trimmed = String(text || "").trim();
    if (!trimmed) return;

    const userMessage = {
      id: makeId(),
      role: "user",
      content: trimmed,
      createdAt: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Create a placeholder assistant message NOW; we will update it dynamically.
    const placeholderId = makeId();
    setMessages((prev) => [
      ...prev,
      {
        id: placeholderId,
        role: "assistant",
        content: "Starting run…",
        createdAt: Date.now(),
      },
    ]);

    try {
      const started = await startRun(trimmed); // returns reqId
      const reqId = started.reqId;

      updateMessageContent(
        placeholderId,
        `Run started.\nreqId=${reqId}\nstate=${started.state}\n\nPolling backend every 15s…`
      );

      // Poll backend for this reqId every 15s until done
      startPollingStatus(reqId, placeholderId);
    } catch (e) {
      updateMessageContent(
        placeholderId,
        `⚠️ Error starting run\n${String(e?.message || e)}\n\nCheck:\n- backend running at ${CHAT_URL}\n- VITE_AGENT_API_BASE="${String(import.meta.env.VITE_AGENT_API_BASE || "")}"`
      );
      setIsTyping(false);
    }
  }

  return (
    <div name="KnowMore" className="max-w-screen-2xl container mx-auto px-4 md:px-20 pt-24 pb-28">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold">Luma Events Assistant</h1>
          <p className="text-gray-300 mt-2 max-w-3xl">
            Frontend polls backend every 15s. Backend polls Retool every 15s. No timeouts.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Endpoint: <span className="text-gray-300">{CHAT_URL}</span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Env: <span className="text-gray-300">{String(import.meta.env.VITE_AGENT_API_BASE || "(empty)")}</span>
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0b1220] overflow-hidden shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/10 bg-[#0f172a]">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-green-600 flex items-center justify-center font-semibold">
              L
            </div>
            <div>
              <div className="font-semibold leading-tight">Luma Q&A</div>
              <div className="text-xs text-gray-400">Fetch events • Filter • Summarize</div>
            </div>
          </div>
          <div className="text-xs text-gray-400 hidden sm:block">
            Press <span className="text-gray-200">Enter</span> to send,{" "}
            <span className="text-gray-200">Shift+Enter</span> for newline
          </div>
        </div>

        {/* Messages */}
        <div className="px-4 md:px-6 py-5 h-[60vh] md:h-[65vh] overflow-y-auto bg-[#0b1220]">
          <div className="flex flex-col gap-3">
            {messages.map((m) => (
              <MessageBubble key={m.id} role={m.role} content={m.content} />
            ))}

            {isTyping && (
              <div className="w-full flex justify-start">
                <div className="max-w-[90%] md:max-w-[70%] rounded-2xl px-4 py-3 bg-[#111827] border border-white/10 text-gray-100 shadow">
                  <span className="text-gray-400">Thinking… (polling every 15s)</span>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* Suggestions */}
        <div className="px-4 md:px-6 py-3 border-t border-white/10 bg-[#0f172a]">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => sendMessage(s)}
                className="text-xs md:text-sm px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Composer */}
        <div className="px-4 md:px-6 py-4 border-t border-white/10 bg-[#0b1220]">
          <div className="flex items-end gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder="Ask about Luma events…"
              rows={1}
              className="w-full resize-none rounded-xl px-4 py-3 bg-[#0f172a] border border-white/10 outline-none focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 text-gray-100"
            />
            <button
              type="button"
              onClick={() => sendMessage(input)}
              className="shrink-0 rounded-xl bg-green-600 hover:bg-green-500 transition text-white font-semibold px-4 py-3"
            >
              Send
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">Backend keeps API keys safe and polls Retool.</div>
        </div>
      </div>
    </div>
  );
}

export default KnowMore;
