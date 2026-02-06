# 📊 RealTicker — AI-Powered Stock Insight Dashboard

## 🚀 Overview

**RealTicker** is a full-stack AI-powered stock analysis platform that combines real-time-style market data visualization with AI-generated investment insights.

The application allows users to:

* View top performing stocks
* Visualize 6-month historical price trends
* Generate AI-based trend interpretation
* Receive simplified investment insights

This project demonstrates full-stack development, API integration, prompt engineering, and AI-powered reasoning.

---

# 🧠 Core Features

## 📌 1. Market Dashboard

* Displays Top 10 stocks
* Shows price, change percentage, and volume
* Clickable rows for detailed analysis
* Clean, modern UI

API Used:

```
GET /api/stocks/top10
```

---

## 📈 2. Price History Visualization

* 6-month historical price data
* Interactive area chart
* Auto-colored trend (green/red)
* Tooltip with formatted pricing

API Used:

```
GET /api/stocks/{ticker}/history
```

---

## 🤖 3. AI Investment Insight (Core Feature)

Users can generate AI-based stock analysis.

Backend:

* Collects historical data
* Builds structured financial prompt
* Sends prompt to HuggingFace LLM
* Returns structured investment insight

API Used:

```
POST /api/stocks/{ticker}/analyze
```

AI returns:

* Trend (Upward / Downward / Sideways)
* Risk Level (Low / Medium / High)
* Suggested Action

⚠ This is interpretative analysis, not price prediction.

---

# 🏗️ System Architecture

```
Frontend (React)
        ↓
FastAPI Backend
        ↓
HuggingFace LLM API
```

### Flow

1. User requests stock data
2. Frontend calls FastAPI
3. Backend fetches mock data
4. Backend optionally calls AI model
5. Response sent back to frontend
6. UI renders visualization or insight

---

# 🛠 Tech Stack

## Frontend

* React
* TypeScript
* React Router
* Recharts (Data Visualization)
* ShadCN UI Components

## Backend

* FastAPI
* Python
* REST API architecture
* CORS middleware

## AI Integration

* HuggingFace Inference Router
* LLM-based financial trend interpretation
* Prompt engineering

---

# 📂 Project Structure

## Backend

```
backend/
│
├── main.py
├── routes/
│   ├── stocks.py
│   └── ai.py
├── data/
│   └── mock_stocks.py
└── .env
```

## Frontend

```
frontend/
│
├── src/
│   ├── pages/
│   ├── components/
│   ├── lib/api.ts
│   └── App.tsx
```

---

# ⚙️ Installation & Setup

## 1️⃣ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

Create `.env` file:

```
HF_API_KEY=your_huggingface_api_key
```

Run server:

```bash
uvicorn main:app --reload --port 8001
```

Backend runs at:

```
http://127.0.0.1:8001
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173 (or 8080 depending on config)
```

---

# 📊 Mock Data

The project currently uses mock stock data for demonstration purposes.

Each stock includes:

* ticker
* company
* price
* changePercent
* volume

History includes:

* 6 monthly closing prices

---

# 🧠 How AI Analysis Works

1. Backend receives stock ticker
2. Fetches 6-month price history
3. Generates structured financial prompt
4. Sends prompt to LLM
5. LLM analyzes pattern and generates explanation

The AI performs:

* Trend detection
* Volatility interpretation
* Risk estimation
* Investment suggestion

This is interpretative reasoning, not forecasting.

---

# 🎯 Key Learning Outcomes

* Full-stack application development
* REST API design
* CORS handling
* Prompt engineering
* AI integration with backend
* Type-safe frontend architecture
* Data transformation for visualization
* Debugging frontend/backend mismatches

---

# 🚀 Future Improvements

* Real-time stock API integration
* Mathematical trend detection (slope, volatility metrics)
* Hybrid AI + algorithmic indicators
* User authentication
* Portfolio tracking
* Deployment (Docker + Cloud)

---

# ⚠ Disclaimer

This application is built for educational and demonstration purposes only.
AI-generated insights should not be considered financial advice.

---

# 👨‍💻 Author

Built as part of a technical assessment demonstrating full-stack development and AI integration capabilities.

