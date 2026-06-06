import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { z } from "zod";
import { products, categories, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

const searchSchema = z.object({
  category: z.enum(["Audio", "Smart Home", "Wearables", "Computing", "Mobile", "Gaming"]).optional(),
});

export const Route = createFileRoute("/products")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "All Products — TechWorld" },
      { name: "description", content: "Browse 50+ premium tech gadgets with category, price, and search filters." },
    ],
  }),
  component: ProductsPage,
});

const priceRanges = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 – $300", min: 100, max: 300 },
  { label: "$300 – $700", min: 300, max: 700 },
  { label: "$700 – $1500", min: 700, max: 1500 },
  { label: "$1500+", min: 1500, max: Infinity },
];

function ProductsPage() {
  const { category: initialCat } = Route.useSearch();
  const [selectedCats, setSelectedCats] = useState<Set<Category>>(
    new Set(initialCat ? [initialCat] : []),
  );
  const [selectedRange, setSelectedRange] = useState<number | null>(null);
  const [query, setQuery] = useState("");

  const toggleCat = (c: Category) => {
    setSelectedCats((prev) => {
      const next = new Set(prev);
      next.has(c) ? next.delete(c) : next.add(c);
      return next;
    });
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (selectedCats.size && !selectedCats.has(p.category)) return false;
      if (selectedRange !== null) {
        const r = priceRanges[selectedRange];
        if (p.price < r.min || p.price > r.max) return false;
      }
      if (query.trim()) {
        const q = query.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [selectedCats, selectedRange, query]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <h1 className="font-display text-4xl font-semibold">All Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">{filtered.length} gadgets available</p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar filters */}
        <aside className="space-y-6 lg:sticky lg:top-20 lg:self-start">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search gadgets…"
              className="w-full rounded-lg border border-border bg-input py-2.5 pl-9 pr-3 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          <div className="rounded-xl border border-border bg-card-gradient p-4">
            <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Categories</h3>
            <ul className="space-y-2">
              {categories.map((c) => (
                <li key={c}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedCats.has(c)}
                      onChange={() => toggleCat(c)}
                      className="h-4 w-4 accent-[var(--primary)]"
                    />
                    {c}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card-gradient p-4">
            <h3 className="mb-3 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">Price</h3>
            <ul className="space-y-2">
              {priceRanges.map((r, i) => (
                <li key={r.label}>
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedRange === i}
                      onChange={() => setSelectedRange(i)}
                      className="h-4 w-4 accent-[var(--primary)]"
                    />
                    {r.label}
                  </label>
                </li>
              ))}
            </ul>
            {(selectedRange !== null || selectedCats.size > 0 || query) && (
              <button
                onClick={() => { setSelectedRange(null); setSelectedCats(new Set()); setQuery(""); }}
                className="mt-3 w-full rounded-md border border-border py-1.5 text-xs text-muted-foreground hover:border-primary/60 hover:text-foreground"
              >
                Clear filters
              </button>
            )}
          </div>
        </aside>

        {/* Grid */}
        <section>
          {filtered.length === 0 ? (
            <div className="grid h-64 place-items-center rounded-2xl border border-dashed border-border text-sm text-muted-foreground">
              No products match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
