import { errorHandler } from "@/app/server/helpers/errorHandler";
import User from "@/app/server/models/User";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = await User.login(body.email, body.password);

    const cookieStore = await cookies();

    cookieStore.set({
      name: "access_token",
      value: token,
    });

    return Response.json({ message: "Login berhasil" }, { status: 200 });
  } catch (err: unknown) {
    const { status, message } = errorHandler(err);
    return Response.json({ message }, { status });
  }
}
