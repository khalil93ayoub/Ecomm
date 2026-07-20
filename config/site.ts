import { routes } from "@/config/routes";

export const siteConfig = {
  name: "NOVARA",
  description: "Premium essentials for everyday movement.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  currency: "EUR",
  defaultRoute: routes.home,
} as const;
