import { ZodError } from "zod";
import User from "@/app/server/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const message = await User.register(body);
    return Response.json({ message }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      const issues = error.issues;
      const message = issues.map((issue) => {
        return `${issue.path} - ${issue.message}`;
      });

      const messages = message.join("; ");
      return Response.json({ messages }, { status: 400 });
    } else if (error instanceof Error) {
      return Response.json({ messages: "ISE" }, { status: 500 });
    }
  }
}
