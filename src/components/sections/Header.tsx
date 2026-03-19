import { Button } from "@/components/ui/Button";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#about-doctor", label: "About Doctor" },
  { href: "#trust", label: "Trust" },
  { href: "#book-visit", label: "Book Visit" }
];

export function Header() {
  return (
    <header
      style={{
        backdropFilter: "blur(18px)",
        background: "rgba(249, 251, 253, 0.78)",
        borderBottom: "1px solid rgba(216, 228, 240, 0.75)",
        position: "sticky",
        top: 0,
        zIndex: 20
      }}
    >
      <div
        className="container"
        style={{
          alignItems: "center",
          display: "flex",
          gap: "1.2rem",
          justifyContent: "space-between",
          minHeight: "5rem"
        }}
      >
        <a href="#top" style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
          <strong style={{ fontFamily: "Georgia, serif", fontSize: "1.2rem" }}>Dr. Elena Maris</strong>
          <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Private Health Check Clinic</span>
        </a>

        <nav
          aria-label="Primary navigation"
          style={{ alignItems: "center", display: "flex", flexWrap: "wrap", gap: "1.3rem", justifyContent: "end" }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              className="nav-link"
              href={item.href}
              style={{ color: "var(--text-muted)", fontWeight: 600 }}
            >
              {item.label}
            </a>
          ))}
          <Button className="header-cta" href="#book-visit">
            Book Health Check
          </Button>
        </nav>
      </div>
    </header>
  );
}
