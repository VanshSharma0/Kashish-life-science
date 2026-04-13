export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  type: string;
  quantity?: string | null;
  dosage?: string | null;
  benefits?: string[];
  composition?: string | null;
  variantGroupId?: string | null;
  catalogTitle?: string | null;
  variantSort?: number | null;
}

/** Legacy static list (unused); catalog comes from MongoDB via `prisma/seed.ts`. */
export const products: ProductType[] = [];
