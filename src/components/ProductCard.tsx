import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card-gradient transition hover:border-primary/60 hover:shadow-elevated">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="space-y-2 p-4">
        <p className="text-xs uppercase tracking-wider text-neon">{product.category}</p>
        <h3 className="line-clamp-1 font-display text-base font-semibold">{product.name}</h3>
        <p className="line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
        <div className="flex items-center justify-between pt-2">
          <span className="font-display text-lg font-semibold">${product.price.toLocaleString()}</span>
          <button
            onClick={() => add(product)}
            className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </button>
        </div>
      </div>
    </article>
  );
}
