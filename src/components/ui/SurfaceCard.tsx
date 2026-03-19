type SurfaceCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SurfaceCard({ children, className }: SurfaceCardProps) {
  return <div className={["card", className].filter(Boolean).join(" ")}>{children}</div>;
}
