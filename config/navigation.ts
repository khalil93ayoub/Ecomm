import { routes } from "@/config/routes";

export const primaryNavigation = [
  { label: "Home", href: routes.home },
  { label: "Shop", href: routes.shop },
  { label: "Collections", href: routes.collections },
  { label: "About", href: routes.about },
  { label: "Support", href: routes.support },
] as const;

export const footerNavigation = [
  { label: "Contact", href: routes.contact },
  { label: "Shipping & Returns", href: routes.shippingReturns },
  { label: "Privacy", href: routes.privacy },
  { label: "Terms", href: routes.terms },
] as const;
