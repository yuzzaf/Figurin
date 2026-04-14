import LoginForm from "./LoginForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-50 relative overflow-hidden px-4">
      {/* Background glowing blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob animation-delay-2000"></div>
      
      <div className="w-full max-w-md relative z-10">
        <Link href="/public" className="absolute -top-12 left-0 flex items-center gap-2 text-sm text-gray-500 hover:text-orange-600 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent inline-block pb-1">
            Figure.in
          </h1>
          <p className="text-gray-500 mt-2 font-medium">
            Welcome back! Dive into your collection.
          </p>
        </div>

        <LoginForm />
      </div>
    </main>
  );
}
