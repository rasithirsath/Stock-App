import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardContainerProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

export function CardContainer({
  title,
  subtitle,
  children,
  className,
  glow = false,
}: CardContainerProps) {
  return (
    <div
      className={cn(
        "glass-card p-6 rounded-xl border border-border/40 bg-card",
        glow && "card-glow",
        className,
      )}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          )}
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
