import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/app/server/helpers/jwt";
import Wishlist from "@/app/server/models/Wishlist";

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  if (!token) return null;
  
  try {
    const payload = verifyToken<{ _id: string }>(token);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const wishlist = await Wishlist.getWishlistByUserId(user._id);
    return NextResponse.json({ data: wishlist });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ message: "productId is required" }, { status: 400 });
    }

    const result = await Wishlist.addToWishlist(user._id, productId);
    return NextResponse.json({ message: "Success added to wishlist", data: result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { productId } = await req.json();
    if (!productId) {
      return NextResponse.json({ message: "productId is required" }, { status: 400 });
    }

    const result = await Wishlist.removeFromWishlist(user._id, productId);
    return NextResponse.json({ message: "Success removed from wishlist", data: result });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
