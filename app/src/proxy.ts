import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "./app/server/helpers/errorHandler";
import { UnauthorizedError } from "./app/server/helpers/customError";
import { verifyToken } from "./app/server/helpers/jwt";
import { ObjectId } from "mongodb";
import User from "./app/server/models/User";

export default async function proxy(request: NextRequest) {
  try {
    const uri = request.nextUrl.pathname;
    const protectedRoutes = ["/api/wishlist"];

    if (uri.startsWith("/api")) {
      if (protectedRoutes.includes(uri)) {
        const cookieStore = await cookies();
        const token = cookieStore.get("access_token");

        if (!token) throw new UnauthorizedError("invalid token");

        const payload = verifyToken<{ _id: ObjectId; email: string }>(
          token.value,
        );

        const user = await User.getUserById(payload._id.toString());
        if (!user) throw new UnauthorizedError("Invalid token");

        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-id", user._id.toString());
        requestHeaders.set("x-user-email", user.email);

        const response = NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        });

        return response;
      }
    }
  } catch (err: unknown) {
    const { status, message } = errorHandler(err);
    return NextResponse.json({ message }, { status });
  }
}
