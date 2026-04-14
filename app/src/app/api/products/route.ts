import Product from "@/app/server/models/Product";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "10");
  const search = url.searchParams.get("search") || undefined;
  const filter = url.searchParams.get("filter") || undefined;
  const sort = url.searchParams.get("sortType") || undefined;

  const products = await Product.getAllProducts(
    page,
    limit,
    search,
    filter,
    sort,
  );
  return Response.json({ data: products, page, limit });
}
