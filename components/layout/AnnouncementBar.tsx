export function AnnouncementBar() {
  return (
    <div className="bg-novara-black px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
      <div className="mx-auto flex w-full max-w-[var(--container-wide)] flex-wrap items-center justify-center gap-x-8 gap-y-2 text-center">
        <span>Free shipping over 50 EUR</span>
        <span className="hidden text-white/35 sm:inline">/</span>
        <span>Secure Stripe checkout</span>
        <span className="hidden text-white/35 sm:inline">/</span>
        <span>30-day returns</span>
      </div>
    </div>
  );
}
