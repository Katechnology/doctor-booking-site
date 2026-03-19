import Link from "next/link";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

function getClassName(variant: "primary" | "secondary", className?: string) {
  return ["button", variant === "primary" ? "button-primary" : "button-secondary", className]
    .filter(Boolean)
    .join(" ");
}

export function Button({
  href,
  variant = "primary",
  type = "button",
  disabled,
  className,
  children,
  onClick
}: ButtonProps) {
  const resolvedClassName = getClassName(variant, className);

  if (href) {
    return (
      <Link className={resolvedClassName} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={resolvedClassName} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
