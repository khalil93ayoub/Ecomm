import type { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "breil",
    slug: "breil-bow-shot-chronograph",
    name: "Breil Bow Shot Chronograph",
    shortDescription: "Gold-tone sport chronograph with a black dial and polished presence.",
    description:
      "A bold gold-tone chronograph with stainless steel construction, a black dial, and sport-luxury styling for everyday wear.",
    priceCents: 11000,
    currency: "EUR",
    primaryCollectionSlug: "watches",
    collectionSlugs: ["watches"],
    stockStatus: "out_of_stock",
    images: [
      {
        role: "hero",
        src: "/images/products/breil-bow-shot-chronograph/hero.jpg",
        alt: "Breil Bow Shot Chronograph hero image",
      },
      {
        role: "front",
        src: "/images/products/breil-bow-shot-chronograph/front.jpg",
        alt: "Breil Bow Shot Chronograph front view",
      },
      {
        role: "side",
        src: "/images/products/breil-bow-shot-chronograph/side.jpg",
        alt: "Breil Bow Shot Chronograph side view",
      },
      {
        role: "detail",
        src: "/images/products/breil-bow-shot-chronograph/detail.jpg",
        alt: "Breil Bow Shot Chronograph detail view",
      },
      {
        role: "lifestyle",
        src: "/images/products/breil-bow-shot-chronograph/lifestyle.jpg",
        alt: "Breil Bow Shot Chronograph lifestyle view",
      },
      {
        role: "thumbnail",
        src: "/images/products/breil-bow-shot-chronograph/thumbnail.jpg",
        alt: "Breil Bow Shot Chronograph thumbnail",
      },
    ],
    benefits: [
      {
        title: "Chronograph precision",
        description: "Quartz timing for reliable everyday use.",
      },
      {
        title: "Gold-tone steel",
        description: "Polished stainless steel with a premium finish.",
      },
      {
        title: "100M water resistance",
        description: "Designed for daily durability and regular wear.",
      },
      {
        title: "Italian design identity",
        description: "Sport styling with refined visual details.",
      },
    ],
    specifications: [
      { label: "Movement", value: "Quartz chronograph" },
      { label: "Case size", value: "43mm" },
      { label: "Case material", value: "IP gold-tone stainless steel" },
      { label: "Dial", value: "Black chronograph" },
      { label: "Water resistance", value: "100M" },
      { label: "Included", value: "Watch, watch box, user manual" },
    ],
    shippingReturnsSummary:
      "Free shipping over 50 EUR. Returns accepted within 30 days when the item is unused and returned with its original packaging.",
    stripePaymentLink: "https://buy.stripe.com/8x2eVd5M8b5M5LtgWbcIE03",
    variants: [
      {
        id: "breil-default",
        productId: "breil",
        name: "Gold steel / black dial",
        sku: "NOV-WAT-BREIL-GOLD",
        priceCents: 11000,
        currency: "EUR",
        stockQuantity: 0,
      },
    ],
    status: "active",
    featured: false,
    relatedProductSlugs: [
      "fossil-privateer-chronograph",
      "magnetic-wireless-charger",
      "240w-fast-charging-cable",
    ],
  },
  {
    id: "privateer",
    slug: "fossil-privateer-chronograph",
    name: "Fossil Privateer Chronograph",
    shortDescription: "Two-tone stainless steel chronograph with a black sunray dial.",
    description:
      "A polished Fossil chronograph with a stainless steel case, two-tone bracelet, and a strong everyday profile.",
    priceCents: 9500,
    currency: "EUR",
    primaryCollectionSlug: "watches",
    collectionSlugs: ["watches"],
    stockStatus: "low_stock",
    images: [
      {
        role: "hero",
        src: "/images/products/fossil-privateer-chronograph/hero.jpg",
        alt: "Fossil Privateer Chronograph hero image",
      },
      {
        role: "front",
        src: "/images/products/fossil-privateer-chronograph/front.jpg",
        alt: "Fossil Privateer Chronograph front view",
      },
      {
        role: "side",
        src: "/images/products/fossil-privateer-chronograph/side.jpg",
        alt: "Fossil Privateer Chronograph side view",
      },
      {
        role: "detail",
        src: "/images/products/fossil-privateer-chronograph/detail.jpg",
        alt: "Fossil Privateer Chronograph detail view",
      },
      {
        role: "lifestyle",
        src: "/images/products/fossil-privateer-chronograph/lifestyle.jpg",
        alt: "Fossil Privateer Chronograph lifestyle view",
      },
      {
        role: "thumbnail",
        src: "/images/products/fossil-privateer-chronograph/thumbnail.jpg",
        alt: "Fossil Privateer Chronograph thumbnail",
      },
    ],
    benefits: [
      {
        title: "Quartz chronograph",
        description: "Reliable timing for daily use.",
      },
      {
        title: "Two-tone steel",
        description: "Gold and silver stainless steel finish.",
      },
      {
        title: "5 ATM water resistance",
        description: "Built for splashes and daily exposure.",
      },
      {
        title: "Black sunray dial",
        description: "A sport-luxury look with depth and contrast.",
      },
    ],
    specifications: [
      { label: "Movement", value: "Quartz chronograph" },
      { label: "Case size", value: "45mm" },
      { label: "Case material", value: "Stainless steel" },
      { label: "Dial", value: "Black sunray" },
      { label: "Water resistance", value: "5 ATM" },
      { label: "Included", value: "Watch, watch box, user manual" },
    ],
    shippingReturnsSummary:
      "Free shipping over 50 EUR. Returns accepted within 30 days when the item is unused and returned with its original packaging.",
    variants: [
      {
        id: "privateer-default",
        productId: "privateer",
        name: "Two-tone steel / black dial",
        sku: "NOV-WAT-FOSSIL-PRIVATEER",
        priceCents: 9500,
        currency: "EUR",
        stockQuantity: 1,
      },
    ],
    status: "active",
    featured: true,
    relatedProductSlugs: [
      "breil-bow-shot-chronograph",
      "magnetic-wireless-charger",
      "240w-fast-charging-cable",
    ],
  },
  {
    id: "vacuum",
    slug: "wireless-car-vacuum",
    name: "Wireless High-Power Car Vacuum Cleaner",
    shortDescription: "Cordless wet and dry cleaning for car, office, and home.",
    description:
      "A compact handheld vacuum designed for quick cleaning in tight spaces, with strong suction, washable filtration, and USB charging.",
    priceCents: 2499,
    currency: "EUR",
    primaryCollectionSlug: "car-accessories",
    collectionSlugs: ["car-accessories"],
    stockStatus: "in_stock",
    images: [
      {
        role: "hero",
        src: "/images/products/wireless-car-vacuum/hero.jpg",
        alt: "Wireless high-power car vacuum hero image",
      },
      {
        role: "front",
        src: "/images/products/wireless-car-vacuum/front.jpg",
        alt: "Wireless high-power car vacuum front view",
      },
      {
        role: "side",
        src: "/images/products/wireless-car-vacuum/side.jpg",
        alt: "Wireless high-power car vacuum side view",
      },
      {
        role: "detail",
        src: "/images/products/wireless-car-vacuum/detail.jpg",
        alt: "Wireless high-power car vacuum detail view",
      },
      {
        role: "thumbnail",
        src: "/images/products/wireless-car-vacuum/thumbnail.jpg",
        alt: "Wireless high-power car vacuum thumbnail",
      },
    ],
    benefits: [
      {
        title: "High-power suction",
        description: "Built for quick everyday cleaning.",
      },
      {
        title: "Wet and dry use",
        description: "Handles dust, crumbs, and small spills.",
      },
      {
        title: "Portable design",
        description: "Easy to store in the car or at home.",
      },
      {
        title: "Reusable filter",
        description: "Washable HEPA filter for repeated use.",
      },
    ],
    specifications: [
      { label: "Charging time", value: "About 2 hours" },
      { label: "Power", value: "120W" },
      { label: "Use", value: "Wet and dry" },
      { label: "Filter", value: "Washable HEPA filter" },
      { label: "Design", value: "Cordless handheld vacuum" },
      { label: "Included", value: "Vacuum, nozzle accessories, USB charging cable, washable HEPA filter" },
    ],
    shippingReturnsSummary:
      "Free shipping over 50 EUR. Returns accepted within 30 days when the item is unused and returned with its accessories.",
    stripePaymentLink: "https://buy.stripe.com/8x2bJ13E0ehYb5N6hxcIE00",
    variants: [
      {
        id: "vacuum-default",
        productId: "vacuum",
        name: "Black",
        sku: "NOV-CAR-VACUUM-BLK",
        priceCents: 2499,
        currency: "EUR",
        stockQuantity: 12,
      },
    ],
    status: "active",
    featured: true,
    relatedProductSlugs: [
      "magnetic-wireless-charger",
      "240w-fast-charging-cable",
      "fossil-privateer-chronograph",
    ],
  },
  {
    id: "magnetic-charger",
    slug: "magnetic-wireless-charger",
    name: "3-in-1 Magnetic Wireless Charger",
    shortDescription: "Foldable magnetic charging station for phone, watch, and earbuds.",
    description:
      "A compact magnetic charging station that keeps daily devices organized in one place while staying easy to pack for travel.",
    priceCents: 1999,
    currency: "EUR",
    primaryCollectionSlug: "tech",
    collectionSlugs: ["tech", "chargers"],
    stockStatus: "in_stock",
    images: [
      {
        role: "hero",
        src: "/images/products/magnetic-wireless-charger/hero.jpg",
        alt: "3-in-1 magnetic wireless charger hero image",
      },
      {
        role: "front",
        src: "/images/products/magnetic-wireless-charger/front.jpg",
        alt: "3-in-1 magnetic wireless charger front view",
      },
      {
        role: "side",
        src: "/images/products/magnetic-wireless-charger/side.jpg",
        alt: "3-in-1 magnetic wireless charger side view",
      },
      {
        role: "detail",
        src: "/images/products/magnetic-wireless-charger/detail.jpg",
        alt: "3-in-1 magnetic wireless charger detail view",
      },
      {
        role: "thumbnail",
        src: "/images/products/magnetic-wireless-charger/thumbnail.jpg",
        alt: "3-in-1 magnetic wireless charger thumbnail",
      },
    ],
    benefits: [
      {
        title: "3-in-1 charging",
        description: "Charge phone, watch, and earbuds together.",
      },
      {
        title: "Magnetic alignment",
        description: "Easy placement for compatible devices.",
      },
      {
        title: "Foldable design",
        description: "Built for desks, travel, and bedside use.",
      },
      {
        title: "USB-C input",
        description: "Simple modern cable connection.",
      },
    ],
    specifications: [
      { label: "Charging power", value: "Up to 15W" },
      { label: "Compatibility", value: "Phone, watch, earbuds" },
      { label: "Design", value: "Foldable dock" },
      { label: "Material", value: "ABS and aluminum alloy" },
      { label: "Port", value: "USB-C" },
      { label: "Included", value: "Magnetic charging station, USB-C cable, user guide" },
    ],
    shippingReturnsSummary:
      "Free shipping over 50 EUR. Returns accepted within 30 days when the item is unused and returned with its cable.",
    stripePaymentLink: "https://buy.stripe.com/28E3cv4I45Ls8XF0XdcIE01",
    variants: [
      {
        id: "magnetic-charger-default",
        productId: "magnetic-charger",
        name: "White travel fold",
        sku: "NOV-TEC-MAG-CHARGER",
        priceCents: 1999,
        currency: "EUR",
        stockQuantity: 8,
      },
    ],
    status: "active",
    featured: true,
    relatedProductSlugs: [
      "240w-fast-charging-cable",
      "wireless-car-vacuum",
      "fossil-privateer-chronograph",
    ],
  },
  {
    id: "cable",
    slug: "240w-fast-charging-cable",
    name: "240W Fast Charging Cable",
    shortDescription: "Braided USB-C cable with fast charging support and LED power display.",
    description:
      "A durable everyday charging cable for users who want speed, strength, and a visible charging power indicator.",
    priceCents: 899,
    currency: "EUR",
    primaryCollectionSlug: "chargers",
    collectionSlugs: ["tech", "chargers"],
    stockStatus: "in_stock",
    images: [
      {
        role: "hero",
        src: "/images/products/240w-fast-charging-cable/hero.jpg",
        alt: "240W fast charging cable hero image",
      },
      {
        role: "front",
        src: "/images/products/240w-fast-charging-cable/front.jpg",
        alt: "240W fast charging cable front view",
      },
      {
        role: "side",
        src: "/images/products/240w-fast-charging-cable/side.jpg",
        alt: "240W fast charging cable side view",
      },
      {
        role: "detail",
        src: "/images/products/240w-fast-charging-cable/detail.jpg",
        alt: "240W fast charging cable detail view",
      },
      {
        role: "thumbnail",
        src: "/images/products/240w-fast-charging-cable/thumbnail.jpg",
        alt: "240W fast charging cable thumbnail",
      },
    ],
    benefits: [
      {
        title: "240W charging",
        description: "Built for compatible high-power devices.",
      },
      {
        title: "LED display",
        description: "Shows charging power in real time.",
      },
      {
        title: "Braided build",
        description: "Durable finish for daily use.",
      },
      {
        title: "Wide compatibility",
        description: "Works with phones, tablets, laptops, and more.",
      },
    ],
    specifications: [
      { label: "Power", value: "Up to 240W" },
      { label: "Connector", value: "USB-C" },
      { label: "Build", value: "Braided cable" },
      { label: "Display", value: "LED power indicator" },
      { label: "Use", value: "Charging and data transfer" },
      { label: "Included", value: "240W charging cable" },
    ],
    shippingReturnsSummary:
      "Free shipping over 50 EUR. Returns accepted within 30 days when the item is unused and returned in its original packaging.",
    stripePaymentLink: "https://buy.stripe.com/6oU4gzgqM1vc0r95dtcIE02",
    variants: [
      {
        id: "cable-default",
        productId: "cable",
        name: "Black USB-C",
        sku: "NOV-TEC-CABLE-240W",
        priceCents: 899,
        currency: "EUR",
        stockQuantity: 15,
      },
    ],
    status: "active",
    featured: true,
    relatedProductSlugs: [
      "magnetic-wireless-charger",
      "wireless-car-vacuum",
      "fossil-privateer-chronograph",
    ],
  },
];
