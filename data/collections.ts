import type { Collection } from "@/types/collection";

export const collections: Collection[] = [
  {
    id: "watches",
    slug: "watches",
    name: "Watches",
    description: "Selected timepieces with a premium daily feel.",
    image: {
      src: "/images/collections/watches.jpg",
      alt: "NOVARA watch collection",
    },
    featured: true,
  },
  {
    id: "tech",
    slug: "tech",
    name: "Tech",
    description: "Compact everyday technology selected for useful routines.",
    image: {
      src: "/images/collections/tech.jpg",
      alt: "NOVARA tech collection",
    },
    featured: true,
  },
  {
    id: "car-accessories",
    slug: "car-accessories",
    name: "Car Accessories",
    description: "Practical tools for cleaner, easier driving.",
    image: {
      src: "/images/collections/car-accessories.jpg",
      alt: "NOVARA car accessories collection",
    },
    featured: true,
  },
  {
    id: "chargers",
    slug: "chargers",
    name: "Chargers",
    description: "Reliable charging essentials for home, travel, and work.",
    image: {
      src: "/images/collections/chargers.jpg",
      alt: "NOVARA charger collection",
    },
    featured: true,
  },
];
