import { ZodError } from "zod";
import User from "@/app/server/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = await User.register;
  } catch (error) {}
}
