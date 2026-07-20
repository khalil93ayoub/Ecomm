export const routes = {
  home: "/",
  shop: "/shop",
  collections: "/collections",
  collection: (slug: string) => `/collections/${slug}`,
  product: (slug: string) => `/product/${slug}`,
  checkoutSuccess: "/checkout/success",
  checkoutCancel: "/checkout/cancel",
  about: "/about",
  support: "/support",
  contact: "/contact",
  shippingReturns: "/shipping-returns",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export type RouteKey = keyof typeof routes;
