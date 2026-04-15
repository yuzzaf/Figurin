import { NotFoundError } from "@/app/server/helpers/customError";
import Product from "@/app/server/models/Product";

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const product = await Product.getProductById(params.slug);
    return Response.json({ data: product }, { status: 200 });
  } catch {
    return new NotFoundError("Product not found");
  }
}
