import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchStockHistory, HistoryPoint } from "@/lib/api";
import { CardContainer } from "@/components/CardContainer";
import { PriceChart } from "@/components/PriceChart";
import { AIInsightCard } from "@/components/AIInsightCard";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StockDetail() {
  const { ticker } = useParams();

  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const loadHistory = useCallback(async () => {
    if (!ticker) return;

    setLoadingHistory(true);
    setHistoryError(null);

    try {
      const data = await fetchStockHistory(ticker);
      setHistory(data);
    } catch {
      setHistoryError("Failed to load price history.");
    } finally {
      setLoadingHistory(false);
    }
  }, [ticker]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  if (!ticker) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorState message="Invalid stock ticker" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Link to="/">
        <Button
          variant="ghost"
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>

      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Stock Analysis: <span className="gradient-text">{ticker}</span>
        </h1>
        <p className="text-muted-foreground">
          Detailed analysis and AI-powered insights for {ticker}
        </p>
      </div>

      {/* Price History */}
      <div>
        {loadingHistory && (
          <CardContainer title="Price History">
            <LoadingState message="Loading price history..." />
          </CardContainer>
        )}

        {historyError && (
          <CardContainer title="Price History">
            <ErrorState message={historyError} onRetry={loadHistory} />
          </CardContainer>
        )}

        {!loadingHistory && !historyError && history.length > 0 && (
          <PriceChart history={history} ticker={ticker} />
        )}
      </div>

      {/* AI Insight */}
      <AIInsightCard ticker={ticker} />

      {/* Disclaimer */}
      <CardContainer className="bg-secondary/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-medium text-foreground">Disclaimer</h4>
            <p className="text-sm text-muted-foreground">
              This platform provides AI-generated analysis for educational
              purposes only. It should not be considered financial advice.
            </p>
          </div>
        </div>
      </CardContainer>
    </div>
  );
}
