import { Link } from "@tanstack/react-router";
import { ShoppingCart, Zap } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export function Navbar() {
  const open = useCart((s) => s.open);
  const count = useCart((s) => s.items.reduce((a, i) => a + i.qty, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary shadow-glow">
            <Zap className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold tracking-tight">
            Tech<span className="text-neon">World</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link to="/" className="transition-colors hover:text-foreground" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>
            Home
          </Link>
          <Link to="/products" className="transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            Products
          </Link>
          <a href="#categories" className="transition-colors hover:text-foreground">Categories</a>
        </nav>

        <button
          onClick={open}
          className="relative inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-3 py-2 text-sm font-medium transition hover:border-primary/60 hover:text-primary"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="ml-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1.5 text-xs font-semibold text-primary-foreground">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
