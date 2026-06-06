import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Headphones, Home as HomeIcon, Watch, Laptop, Smartphone, Gamepad2, Sparkles } from "lucide-react";
import { products, categories, type Category } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TechWorld — Premium Tech Gadgets" },
      { name: "description", content: "Discover transparent earbuds, smart ambient lights, mechanical keyboards and more at TechWorld." },
    ],
  }),
  component: Home,
});

const catIcons: Record<Category, typeof Headphones> = {
  Audio: Headphones,
  "Smart Home": HomeIcon,
  Wearables: Watch,
  Computing: Laptop,
  Mobile: Smartphone,
  Gaming: Gamepad2,
};

function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-medium text-neon">
              <Sparkles className="h-3.5 w-3.5" /> New drop · Fall collection
            </span>
            <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
              The future of <span className="text-neon">everyday tech.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              Hand-curated gadgets engineered for performance and design.
              Transparent earbuds, ambient light bars, AI-powered wearables — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90">
                Shop all gadgets <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#featured" className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/60 px-5 py-3 text-sm font-semibold transition hover:border-primary/60">
                View featured
              </a>
            </div>
          </div>
          <div className="relative hidden md:block">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/30 via-transparent to-transparent blur-2xl" />
            <img
              src="https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=80"
              alt="Featured gadget"
              className="relative w-full rounded-3xl border border-border object-cover shadow-elevated"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold">Shop by category</h2>
            <p className="mt-1 text-sm text-muted-foreground">Find your next obsession.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => {
            const Icon = catIcons[cat];
            return (
              <Link
                key={cat}
                to="/products"
                search={{ category: cat }}
                className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-border bg-card-gradient p-5 transition hover:border-primary/60 hover:shadow-glow"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/15 text-primary transition group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-medium">{cat}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section id="featured" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold">Featured gadgets</h2>
            <p className="mt-1 text-sm text-muted-foreground">Editor-picked tech this week.</p>
          </div>
          <Link to="/products" className="hidden text-sm text-neon hover:underline sm:inline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
