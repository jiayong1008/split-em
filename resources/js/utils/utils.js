export const wowAnimation = async () => {
  if (typeof window === "undefined") return;
  try {
    // Try legacy package name first
    const mod = await import("wow.js").catch(() => import("wowjs"));
    const WOW = mod?.default || mod?.WOW;
    if (typeof WOW === "function") {
      new WOW({ live: false }).init();
    }
  } catch (_e) {
    // Silently no-op if library isn't present
  }
};
