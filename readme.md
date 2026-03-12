# 🚀 AI Intent-Based Router Service

An intelligent, multi-agent request router built with **Node.js**, **Express**, and **Groq (Llama 3.3 70B)**.

This service acts as a **traffic controller for AI queries**. It classifies the user's intent and routes the request to specialized expert personas to generate **high-quality, context-aware responses**.

---

# 🏗️ System Architecture

The application follows a **Two-Stage AI Pipeline** to ensure accurate routing and expert-level responses.

## 1️⃣ Classification Layer

A lightweight LLM call analyzes the user query and classifies it into one of four intents:

* `code`
* `data`
* `writing`
* `career`

The classifier returns a **structured JSON response** with a **confidence score**.

## 2️⃣ Expert Layer

After classification, the router selects an **expert persona** using system prompts.

Examples:

* **Senior Software Engineer** → for coding problems
* **Data Analyst** → for data related questions
* **Professional Writer** → for writing assistance
* **Career Advisor** → for career guidance

Each persona generates a **specialized response** tailored to the user's request.

## 🛡️ Safety Valve

If the classifier detects **low confidence** or **unclear intent**, the system triggers a **guardrail response** asking the user to clarify their request.

## 📊 Observability

Every routing decision and generated response is logged into a file:

```
route_log.jsonl
```

This allows easy **auditing, debugging, and monitoring** of the AI router.

---

# 📋 Prerequisites

Make sure the following tools are installed on your machine.

* **Docker & Docker Desktop** (Includes Docker Compose)
* **Node.js v18+** (Only required for running the test script)
* **Groq API Key**

You can generate a Groq API key from:

```
https://console.groq.com
```

---

# 🚀 Getting Started

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/sai1432-ss/LLM_PromptRouter
cd LLM_PromptRouter
```

---

## 2️⃣ Configure Environment Variables

Create a `.env` file in the root directory.

```bash
touch .env
```

Add your Groq API key inside the file.

```env
GROQ_API_KEY=gsk_your_actual_key_here
PORT=3000
```

---

## 3️⃣ Build and Run with Docker

The application is fully containerized.
Use Docker Compose to build and run the service.

```bash
docker-compose up --build
```

Once started, the server will run at:

```
http://localhost:3000
```

The Docker container uses **volume mapping** so that `route_log.jsonl` is synced with your local directory.

---

# 🧪 Testing the Router

To verify the system functionality, run the automated **15-point test suite**.

Open a **new terminal window** while the Docker container is running.

```bash
node test_router.js
```

---

# ✅ Validation Suite Includes

### Accuracy

Tests classification of complex queries related to:

* Code
* Data
* Career guidance

### Robustness

Ensures the router can handle **typos and messy input**.

Example:

```
fxi thsi bug
```

### Ambiguity Handling

Tests if the router asks for clarification when the query is vague.

Example:

```
hey
```

### Conflict Handling

Handles inputs containing **multiple overlapping intents**.

Example:

```
Write a Python script to analyze my resume for job skills.
```

---

# 🪵 Observability

All system interactions are stored in **JSON Lines format (.jsonl)**.

File location:

```
route_log.jsonl
```

Each log entry follows this structure:

```json
{
  "time": "ISO timestamp",
  "intent": "classified label",
  "confidence": "0.0 - 1.0",
  "user_message": "original user query",
  "final_response": "generated expert response"
}
```

This log helps with:

* Debugging
* Monitoring AI behavior
* Auditing routing decisions

---


### File Descriptions

| File                 | Description                            |
| -------------------- | -------------------------------------- |
| `index.js`           | Express server and logging logic       |
| `classifier.js`      | Intent detection module                |
| `router.js`          | Dispatches requests to expert personas |
| `prompts.js`         | System prompts for each expert         |
| `test_router.js`     | Automated 15-point validation suite    |
| `Dockerfile`         | Container image configuration          |
| `docker-compose.yml` | Service orchestration                  |
| `.env.example`       | Environment variable template          |

---

# 🧠 Tech Stack

* **Node.js**
* **Express.js**
* **Groq API**
* **Llama 3.3 70B**
* **Docker**
* **Docker Compose**

---

# 💡 Author

Built with ❤️ to demonstrate **AI-powered intelligent request routing systems**.
