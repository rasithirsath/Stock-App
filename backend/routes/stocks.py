from fastapi import APIRouter
from data.mock_stocks import stocks, history

router = APIRouter(prefix="/api/stocks", tags=["Stocks"])

@router.get("/top10")
def get_top_stocks():
    return stocks
@router.get("/{ticker}/history")
def get_stock_history(ticker: str):
    return history.get(ticker, [])
