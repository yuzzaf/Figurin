import Product from "@/app/server/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tags = await Product.getTags();
    return NextResponse.json({ data: tags });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
