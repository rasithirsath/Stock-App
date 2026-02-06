import { Link } from "react-router-dom";
import { LineChart, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
            <LineChart className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold gradient-text">RealTicker</h1>
            <p className="text-xs text-muted-foreground">AI Stock Insights</p>
          </div>
        </Link>
      </div>
    </header>
  );
}
