import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { groupProductsForCatalog } from "@/lib/productCatalog";
import { isLikelyMongoConnectionFailure } from "@/lib/mongo-url";

/** Storefront catalog: one entry per product line (variants nested). */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: [{ variantSort: "asc" }, { price: "asc" }],
    });
    const groups = groupProductsForCatalog(products);
    return NextResponse.json({ groups });
  } catch (error: unknown) {
    if (isLikelyMongoConnectionFailure(error)) {
      console.warn("[api/products/catalog] Database unreachable:", error);
      return NextResponse.json({ groups: [] });
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
