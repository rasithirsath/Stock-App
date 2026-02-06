export interface Stock {
  ticker: string;
  company: string;
  price: number;
  changePercent: number;
  volume: string;
}

export interface HistoryPoint {
  date: string;
  price: number;
}

const BASE_URL = "https://stock-app-backend-fcw0.onrender.com/api/stocks";

export async function fetchTopStocks(): Promise<Stock[]> {
  const res = await fetch(`${BASE_URL}/top10`);
  if (!res.ok) throw new Error("Failed to fetch stocks");
  return res.json();
}

export async function fetchStockHistory(
  ticker: string,
): Promise<HistoryPoint[]> {
  const res = await fetch(`${BASE_URL}/${ticker}/history`);
  if (!res.ok) throw new Error("Failed to fetch history");

  const prices: number[] = await res.json();

  // Convert numbers → chart points
  const today = new Date();
  return prices.map((price, index) => {
    const date = new Date(today);
    date.setMonth(today.getMonth() - (prices.length - index));
    return {
      date: date.toISOString(),
      price,
    };
  });
}

export async function analyzeStock(
  ticker: string,
): Promise<{ analysis: string }> {
  const res = await fetch(`${BASE_URL}/${ticker}/analyze`, {
    method: "POST",
  });
  if (!res.ok) throw new Error("AI analysis failed");
  return res.json();
}
