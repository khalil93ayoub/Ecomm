export type ProductMediaBase = {
  alt: string;
  id: string;
  label: string;
  priority?: boolean;
  thumbnail?: string;
  type: "image";
};

export type ProductImageMedia = ProductMediaBase & {
  type: "image";
  src: string;
  height?: number;
  width?: number;
};

export type ProductMediaItem = ProductImageMedia;
