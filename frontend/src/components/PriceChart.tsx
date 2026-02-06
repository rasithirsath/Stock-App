import { HistoryPoint } from "@/lib/api";
import { CardContainer } from "@/components/CardContainer";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface PriceChartProps {
  history: HistoryPoint[];
  ticker: string;
}

export function PriceChart({ history, ticker }: PriceChartProps) {
  const isPositive = history.length >= 2 && history[history.length - 1].price >= history[0].price;
  const color = isPositive ? "hsl(142, 76%, 45%)" : "hsl(0, 84%, 60%)";

  return (
    <CardContainer title="Price History" subtitle="30-day price movement">
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={history} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`gradient-${ticker}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getMonth() + 1}/${date.getDate()}`;
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 65%)", fontSize: 12 }}
              domain={["dataMin - 5", "dataMax + 5"]}
              tickFormatter={(value) => `$${value.toFixed(0)}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 11%)",
                border: "1px solid hsl(217, 33%, 20%)",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              }}
              labelStyle={{ color: "hsl(210, 40%, 98%)" }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={color}
              strokeWidth={2}
              fill={`url(#gradient-${ticker})`}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </CardContainer>
  );
}
