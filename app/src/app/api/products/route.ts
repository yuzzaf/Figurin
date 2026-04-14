import Product from "@/app/server/models/Product";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");

  const products = await Product.getAllProducts(page, limit);
  return Response.json({ data: products, page, limit });
}
