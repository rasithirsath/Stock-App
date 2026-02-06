import os
import requests
from fastapi import APIRouter
from data.mock_stocks import history
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/api/stocks", tags=["AI"])

HF_API_KEY = os.getenv("HF_API_KEY")

API_URL = "https://router.huggingface.co/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {HF_API_KEY}",
    "Content-Type": "application/json"
}


def generate_prompt(price_data):
    return f"""
You are a financial analysis assistant.

Analyze the following 6 months stock price data:

{price_data}

Provide:
- Trend (Upward/Downward/Sideways)
- Risk Level (Low/Medium/High)
- Suggested Action for a beginner investor
Keep it short and clear.
"""


@router.post("/{ticker}/analyze")
def analyze_stock(ticker: str):
    prices = history.get(ticker)

    if not prices:
        return {"error": "Stock not found"}

    prompt = generate_prompt(prices)

    payload = {
        "model": "zai-org/GLM-4.7-Flash:novita",
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }

    response = requests.post(API_URL, headers=headers, json=payload)
    result = response.json()

    # print("HF RESPONSE:", result)

    if "choices" not in result:
        return {"error": result}

    ai_text = result["choices"][0]["message"]["content"]

    return {
        "analysis": ai_text,
        "disclaimer": "This is AI-generated analysis and not financial advice."
    }
