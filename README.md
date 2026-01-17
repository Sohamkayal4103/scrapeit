
# Scrapeit — Luma Events Agent (Powered by Retool)

Scrapeit is a Retool-powered agent that scrapes Luma events, extracts sponsor signals, pulls sponsor GitHub context, and uses Claude to recommend **which events I should attend** (and what I can realistically build) based on **my skillset + sponsor fit + availability**.

---

## Why I built this

Luma is packed with amazing events and hackathons, but it’s easy to get stuck in a loop of:
- “This looks cool…”
- “But what would I build?”
- “Do I even have time that day?”
- “Are the sponsors relevant to my strengths?”

Scrapeit turns that chaos into a decision: **attend / skip**, with clear reasoning.

---

## What Scrapeit does

1. **Scrapes Luma event listings** (ex: `https://lu.ma/sf`)
2. **Extracts key event details**
   - title, date/time, location
   - links + descriptions
   - **sponsors**
3. **Scrapes sponsors’ GitHub pages**
   - repositories, topics, SDK hints, typical integrations
4. **Uses Claude** to generate:
   - event summaries
   - sponsor + track alignment
   - recommendations: ✅ attend / ⚠️ attend-if / ❌ skip
   - realistic project ideas I can build for that sponsor ecosystem
5. **Availability-aware filtering**
   - checks my schedule (or time windows I provide)
   - flags conflicts and suggests the best events I can actually attend

---

## Sponsors / Integrations

Scrapeit integrates three sponsor ecosystems:

- **Retool** — Agent orchestration + tools (A2A protocol)
- **Claude** — Analysis + recommendation generation  
  - **Sonnet 3.5** for deeper reasoning / ranking
  - **Haiku** for fast extraction + summaries
- **Auth0** — Authentication and user access control

> Retool is the “brainstem” of the system: it coordinates scraping tools, calls models, and produces a structured final answer.

---

## Architecture (Retool-first)

### High-level flow

```text
React UI  →  Node/Express gateway  →  Retool Agent (A2A)
                                ↘
                                 Claude (Sonnet 3.5 / Haiku)
```

### What Retool is doing (the important part)

Scrapeit is built around a **Retool Agent** that exposes a single A2A interface to the backend.

Inside Retool, the agent is designed as a tool-orchestrator:

* **Tool: Get Luma Content**

  * fetches the Luma listing page (ex: `/sf`)
  * extracts event links + metadata

* **Tool: Get Event Details**

  * visits individual event pages
  * extracts structured details (time, description, sponsors)

* **Tool: Get Portfolio / Sponsor GitHub Content**

  * pulls sponsor GitHub pages / orgs
  * extracts repo names, topics, tech signals

* **Claude reasoning step**

  * Haiku: quick digest + structured extraction
  * Sonnet 3.5: ranking + recommendation logic (attend/skip + “what to build”)

* **Policy logic**

  * maps sponsors → suggested project types
  * checks availability constraints
  * returns final answer in chat-ready format

### Why Retool Agents made this easy

Retool gave me:

* a clean way to **compose tools**
* a single API surface (**A2A**) to call from my backend
* a structured task model (`message:send → task polling`)
* debugging visibility during iteration

Instead of building my own agent framework, I could focus on:
**tools + workflow + decision quality**.

---

## How the backend talks to Retool (A2A)

The backend uses Retool’s A2A endpoints:

1. Fetch agent-card:

   * `/.well-known/agent-card.json`
2. Use the HTTP+JSON interface URL from `additionalInterfaces`
3. Send message:

   * `POST /v1/message:send`
4. Poll task:

   * `GET /v1/tasks/:taskId`

This makes the backend a thin gateway:

* keeps API keys server-side
* exposes `/chat` to the frontend
* polls until completion
* returns `reply + raw task output` for debugging

---

## Local Setup

### 1) Backend

Create `agent/.env`:

```bash
PORT=4000
RETOOL_DOMAIN="https://skayal2.retool.com/api/agents/a2a/056a0ea3-76ae-42ff-9409-a3c968ea55a6/.well-known/agent-card.json"
RETOOL_AGENT_ID="056a0ea3-76ae-42ff-9409-a3c968ea55a6"
RETOOL_A2A_API_KEY="retool_wk_XXXXXXXXXXXXXXXXXXXXXXXX"
```

Install + run:

```bash
npm install
node index.js
```

Backend will run at:

```text
http://localhost:4000/chat
```

### 2) Frontend

Create `.env`:

```bash
VITE_AGENT_API_BASE="http://localhost:4000"
```

Run:

```bash
npm install
npm run dev
```

---

## Example prompts

Try these in the UI:

* `Show me events today on https://lu.ma/sf`
* `List hackathons on https://lu.ma/sf`
* `Find AI / GenAI events this weekend on https://lu.ma/sf`
* `Recommend the best event I should attend next week and why`

---

## Debugging notes

Some requests take 60–120 seconds depending on:

* how many event pages are scraped
* sponsor GitHub depth
* Claude reasoning complexity

For development, Scrapeit returns:

* `reply` (final text response)
* `raw` (full task payload: status/message/parts)
* `debug` (reqId, total runtime, polling stats)

This makes it easy to see whether the pipeline is stuck at:

* agent-card fetch
* message send
* task polling
* tool execution inside Retool
* model generation inside Claude

---

## What’s next

* Google Calendar integration (true availability)
* Smarter sponsor → project idea mapping
* Saved user profile + skill vectors for better recommendations
* Notifications for high-fit hackathons/events

---

## Credits

Built with:

* **Retool Agents + A2A**
* **Claude Sonnet 3.5 + Haiku**
* **Auth0**
* React + Node/Express
