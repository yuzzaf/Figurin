import RegisterForm from "./RegisterForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RegisterPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token");
  if (token) redirect("/");

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 relative overflow-hidden px-4 py-12">
      {/* Background glowing blobs */}
      <div className="absolute top-[20%] left-[-5%] w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[10%] w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md relative z-10">
        <Link
          href="/"
          className="absolute -top-12 left-0 flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent inline-block pb-1">
            Figure.in
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Begin your ultimate hobby journey.
          </p>
        </div>

        <RegisterForm />
      </div>
    </main>
  );
}
