import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/order-confirmation")({
  head: () => ({ meta: [{ title: "Order Confirmed — TechWorld" }] }),
  component: OrderConfirmationPage,
});

function OrderConfirmationPage() {
  const navigate = useNavigate();
  return (
    <main className="mx-auto grid min-h-[80vh] max-w-2xl place-items-center px-4">
      <div className="text-center">
        <div className="relative mx-auto grid h-32 w-32 place-items-center animate-pop">
          <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ring" />
          <span className="absolute inset-2 rounded-full bg-emerald-500/40 animate-ring [animation-delay:0.4s]" />
          <span className="relative grid h-28 w-28 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-elevated">
            <svg viewBox="0 0 52 52" className="h-16 w-16">
              <path
                d="M14 27 L23 36 L40 18"
                fill="none"
                stroke="white"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="60"
                strokeDashoffset="60"
                className="animate-tick"
              />
            </svg>
          </span>
        </div>

        <h1 className="mt-10 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          ORDER SUCCESSFUL
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
          Thanks for shopping with TechWorld. A confirmation email is on its way with your tracking details.
        </p>

        <button
          onClick={() => navigate({ to: "/" })}
          className="mt-10 inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:opacity-90"
        >
          Continue Shopping
        </button>
      </div>
    </main>
  );
}
