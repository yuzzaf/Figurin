"use server";

import { redirect } from "next/navigation";

export default async function registerAction(
  prevState: any,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const resp = await fetch("http://localhost:3000/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      username,
      email,
      password,
    }),
  });

  if (!resp.ok) {
    const data = await resp.json();
    return { error: data.messages };
  }

  redirect("/login");
}
