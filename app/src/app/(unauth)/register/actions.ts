"use server";

export async function registerAction(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");

  if (!name || !username || !email || !password) {
    return { error: "All fields are required", success: false };
  }

  console.log("REGISTER:", { name, username, email, password });

  return { success: true, error: "" };
}
