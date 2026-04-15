"use client";

import { useState } from "react";
import { Eye, EyeOff, User, Mail, Sparkles, Hash } from "lucide-react";
import { useActionState } from "react";
import registerAction from "./actions";
import Link from "next/link";

const initialState = {
  error: "",
  success: false,
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8">
      <form action={formAction} className="space-y-4">
        {/* Row for Name and Username */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
              Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={16} className="text-gray-400" />
              </div>
              <input
                name="name"
                placeholder="John Doe"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash size={16} className="text-gray-400" />
              </div>
              <input
                name="username"
                placeholder="johndoe"
                className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={16} className="text-gray-400" />
            </div>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {state?.error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium border border-red-100">
            {state.error}
          </div>
        )}

        <button className="w-full mt-2 flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-rose-500/30 hover:shadow-orange-500/50 hover:-translate-y-0.5 transition-all duration-200">
          <Sparkles size={18} /> Create Account
        </button>
      </form>

      <div className="mt-8 text-center bg-gray-50 -mx-8 -mb-8 p-6 rounded-b-3xl border-t border-gray-100">
        <p className="text-sm text-gray-500">
          Already a collector?{" "}
          <Link
            href="/login"
            className="font-bold text-orange-500 hover:text-orange-600 transition-colors"
          >
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
}
