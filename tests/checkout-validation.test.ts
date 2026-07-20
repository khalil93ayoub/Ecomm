import assert from "node:assert/strict";
import test from "node:test";

import { products } from "../data/products";
import { isProductInStock } from "../lib/products/helpers";
import {
  canPurchaseWithPaymentLink,
  getProductPaymentLink,
  isValidStripePaymentLink,
} from "../lib/products/payment-links";

test("configured product checkout links are real Stripe Payment Links", () => {
  const configuredLinks = products
    .map((product) => product.stripePaymentLink)
    .filter((link): link is string => Boolean(link));

  assert.ok(configuredLinks.length > 0);

  for (const link of configuredLinks) {
    assert.ok(isValidStripePaymentLink(link), `Invalid Stripe Payment Link: ${link}`);
  }
});

test("no product uses a placeholder Stripe Payment Link", () => {
  for (const product of products) {
    assert.ok(!product.stripePaymentLink?.includes("YOUR_STRIPE_LINK"), product.name);
  }
});

test("buyable products resolve directly to their Payment Link", () => {
  const buyableProducts = products.filter(canPurchaseWithPaymentLink);

  assert.deepEqual(
    buyableProducts.map((product) => product.id).sort(),
    ["cable", "magnetic-charger", "vacuum"],
  );

  for (const product of buyableProducts) {
    assert.equal(getProductPaymentLink(product), product.stripePaymentLink);
  }
});

test("products without a valid Payment Link are not treated as buyable", () => {
  const unavailableForPaymentLink = products
    .filter((product) => isProductInStock(product) && !getProductPaymentLink(product))
    .map((product) => product.id);

  assert.deepEqual(unavailableForPaymentLink, ["privateer"]);
});
