export type Collection = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  featured?: boolean;
};
