export type ProductCategory =
  | "craft-kits"
  | "hoops"
  | "blankets"
  | "sweaters"
  | "banners"
  | "custom";

export interface CustomizationOption {
  id: string;
  label: string;
  type: "text" | "select" | "color";
  required: boolean;
  placeholder?: string;
  maxLength?: number;
  priceModifier?: number;
  options?: {
    value: string;
    label: string;
    priceModifier?: number;
  }[];
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  inventory: number;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  category: ProductCategory;
  basePrice: number;
  compareAtPrice?: number;
  images: string[];
  featured: boolean;
  active: boolean;
  customizable: boolean;
  customizationOptions?: CustomizationOption[];
  variants?: ProductVariant[];
  metadata?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}
