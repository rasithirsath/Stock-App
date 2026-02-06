import { useState } from "react";
import { analyzeStock } from "@/lib/api";
import { CardContainer } from "@/components/CardContainer";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/LoadingState";
import { ErrorState } from "@/components/ErrorState";
import { Sparkles } from "lucide-react";

interface Props {
  ticker: string;
}

export function AIInsightCard({ ticker }: Props) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAnalysis = async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await analyzeStock(ticker);
      setAnalysis(result.analysis);
    } catch {
      setError("Failed to generate AI analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardContainer
      title="AI Investment Insight"
      subtitle="Smart analysis based on historical trend"
      glow
    >
      <div className="space-y-4">
        {!analysis && !loading && (
          <Button onClick={runAnalysis} className="gap-2">
            <Sparkles className="w-4 h-4" />
            Analyze with AI
          </Button>
        )}

        {loading && <LoadingState message="AI is analyzing stock trend..." />}

        {error && <ErrorState message={error} onRetry={runAnalysis} />}

        {analysis && (
          <div className="bg-secondary/20 p-5 rounded-xl border border-border/40 space-y-3">
            {analysis
              .replace(/\*\*/g, "") // remove bold **
              .replace(/\*/g, "") // remove *
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map((line, i) => (
                <p
                  key={i}
                  className="text-base md:text-lg text-foreground font-medium"
                >
                  {line.trim()}
                </p>
              ))}

            <p className="text-sm text-muted-foreground mt-4">
              This is AI-generated analysis and not financial advice.
            </p>
          </div>
        )}
      </div>
    </CardContainer>
  );
}
