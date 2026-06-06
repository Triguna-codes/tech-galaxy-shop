import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock } from "lucide-react";
import { useCart } from "@/lib/cart-store";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — TechWorld" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const sub = subtotal();
  const shipping = sub > 0 ? (sub > 500 ? 0 : 15) : 0;
  const tax = +(sub * 0.08).toFixed(2);
  const total = sub + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Valid email required";
    if (!form.address.trim()) next.address = "Address is required";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    clear();
    navigate({ to: "/order-confirmation" });
  };

  if (items.length === 0) {
    return (
      <main className="mx-auto grid min-h-[60vh] max-w-2xl place-items-center px-4">
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">Add some gadgets before checking out.</p>
          <Link to="/products" className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90">
            Browse products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-semibold">Checkout</h1>
      <p className="mt-1 text-sm text-muted-foreground">Complete your order securely.</p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Left: Shipping form */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card-gradient p-6 sm:p-8">
          <h2 className="font-display text-xl font-semibold">Shipping Details</h2>
          <p className="mt-1 text-sm text-muted-foreground">Where should we deliver your order?</p>

          <div className="mt-6 space-y-5">
            <Field label="Full name" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                placeholder="Ada Lovelace"
                maxLength={100}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                placeholder="you@example.com"
                maxLength={255}
              />
            </Field>
            <Field label="Location / Address" error={errors.address}>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="input min-h-[100px] resize-none"
                placeholder="221B Baker Street, London"
                maxLength={500}
              />
            </Field>
          </div>

          <button
            type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-4 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
          >
            <Lock className="h-4 w-4" /> Place Order · ${total.toLocaleString()}
          </button>

          <style>{`
            .input {
              width: 100%;
              background: var(--input);
              border: 1px solid var(--border);
              border-radius: 0.5rem;
              padding: 0.65rem 0.85rem;
              font-size: 0.875rem;
              color: var(--foreground);
              transition: border-color 0.15s;
            }
            .input:focus { outline: none; border-color: var(--primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 25%, transparent); }
            .input::placeholder { color: var(--muted-foreground); }
          `}</style>
        </form>

        {/* Right: Order summary */}
        <aside className="rounded-2xl border border-border bg-card-gradient p-6 sm:p-8 lg:sticky lg:top-20 lg:self-start">
          <h2 className="font-display text-xl font-semibold">Order Summary</h2>

          <ul className="mt-5 max-h-72 space-y-3 overflow-y-auto pr-1">
            {items.map(({ product, qty }) => (
              <li key={product.id} className="flex gap-3 text-sm">
                <img src={product.image} alt={product.name} className="h-14 w-14 flex-shrink-0 rounded-md object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {qty}</p>
                </div>
                <span className="font-medium">${(product.price * qty).toLocaleString()}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
            <Row label="Subtotal" value={`$${sub.toLocaleString()}`} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping}`} />
            <Row label="Estimated tax" value={`$${tax.toLocaleString()}`} />
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            <span className="font-display text-base font-semibold">Total</span>
            <span className="font-display text-2xl font-semibold text-neon">${total.toLocaleString()}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  );
}
