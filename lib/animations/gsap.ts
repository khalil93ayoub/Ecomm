export async function loadGsap() {
  const { gsap } = await import("gsap");

  return gsap;
}
