"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    return { error: data.message || "Login failed" };
  }

  const setCookieHeader = res.headers.get("set-cookie");
  if (setCookieHeader) {
    const match = setCookieHeader.match(/access_token=([^;]+)/);
    if (match) {
      const cookieStore = await cookies();
      cookieStore.set("access_token", match[1]);
    }
  }

  redirect("/public");
}
