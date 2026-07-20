export async function loadLenis() {
  const { default: Lenis } = await import("lenis");

  return Lenis;
}
