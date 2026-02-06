import { useNavigate } from "react-router-dom";
import { Stock } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StockTableProps {
  stocks: Stock[];
}

export function StockTable({ stocks }: StockTableProps) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-border/50 hover:bg-transparent">
            <TableHead className="text-muted-foreground font-medium">Ticker</TableHead>
            <TableHead className="text-muted-foreground font-medium">Company</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">Price</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">Change %</TableHead>
            <TableHead className="text-muted-foreground font-medium text-right">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock, index) => (
            <TableRow
              key={stock.ticker}
              className="border-border/30 hover:bg-secondary/50 transition-colors animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => navigate(`/stock/${stock.ticker}`)}
            >
              <TableCell 
                className="ticker-link font-semibold"
              >
                {stock.ticker}
              </TableCell>
              <TableCell className="text-foreground/90">{stock.company}</TableCell>
              <TableCell className="text-right font-mono text-foreground">
                ${stock.price.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <span
                  className={cn(
                    "inline-flex items-center gap-1 px-2 py-1 rounded-md font-medium text-sm",
                    stock.changePercent >= 0
                      ? "bg-positive text-positive"
                      : "bg-negative text-negative"
                  )}
                >
                  {stock.changePercent >= 0 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  {stock.changePercent >= 0 ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%
                </span>
              </TableCell>
              <TableCell className="text-right text-muted-foreground font-mono">
                {stock.volume}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
