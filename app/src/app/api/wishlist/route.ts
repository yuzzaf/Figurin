import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/server/helpers/jwt";
import Wishlist from "@/app/server/models/Wishlist";
import { errorHandler } from "@/app/server/helpers/errorHandler";
import { UnauthorizedError, BadRequestError } from "@/app/server/helpers/customError";

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) throw new UnauthorizedError("Unauthorized");
  
  try {
    const payload = verifyToken<{ _id: string }>(token);
    return payload;
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
}

export async function GET() {
  try {
    const user = await getAuthUser();
    const wishlist = await Wishlist.getWishlistByUserId(user._id);
    return NextResponse.json({ data: wishlist });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser();
    const { productId } = await req.json();
    if (!productId) {
      throw new BadRequestError("productId is required");
    }

    const result = await Wishlist.addToWishlist(user._id, productId);
    return NextResponse.json({ message: "Success added to wishlist", data: result });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getAuthUser();
    const { productId } = await req.json();
    if (!productId) {
      throw new BadRequestError("productId is required");
    }

    const result = await Wishlist.removeFromWishlist(user._id, productId);
    return NextResponse.json({ message: "Success removed from wishlist", data: result });
  } catch (error) {
    const { status, message } = errorHandler(error);
    return NextResponse.json({ message }, { status });
  }
}
