import { useEffect, useState } from "react";
import { fetchTopStocks, Stock } from "@/lib/api";
import { CardContainer } from "@/components/CardContainer";
import { StockTable } from "@/components/StockTable";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { TrendingUp, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStocks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchTopStocks();
      setStocks(data);
    } catch (err) {
      setError("Failed to load stocks. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStocks();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary mb-4">
          <TrendingUp className="w-4 h-4" />
          <span>Real-time Market Intelligence</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">
          RealTicker <span className="gradient-text">AI Stock Insights</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get AI-powered investment analysis for top stocks. Make informed decisions with real-time data and intelligent insights.
        </p>
      </div>

      {/* Market Overview Card */}
      <CardContainer 
        title="Market Overview" 
        subtitle="Top performing stocks selected based on market capitalization and trading volume"
      >
        <div className="flex items-center gap-3 text-muted-foreground">
          <BarChart3 className="w-5 h-5 text-primary" />
          <p className="text-sm">
            Click on any ticker to view detailed analysis and AI-powered investment insights.
          </p>
        </div>
      </CardContainer>

      {/* Top 10 Stocks Table */}
      <CardContainer title="Top 10 Stocks" glow>
        {isLoading && <LoadingState message="Loading market data..." />}
        {error && <ErrorState message={error} onRetry={loadStocks} />}
        {!isLoading && !error && <StockTable stocks={stocks} />}
      </CardContainer>
    </div>
  );
}
