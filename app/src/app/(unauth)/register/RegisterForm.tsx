"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useActionState } from "react";
import { registerAction } from "./actions";

const initialState = {
  error: "",
  success: false,
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useActionState(registerAction, initialState);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <form action={formAction}>
        {/* Social */}
        <div className="space-y-3">
          <button className="w-full bg-blue-600 text-white py-2 rounded-md">
            Sign In with Facebook
          </button>
          <button className="w-full bg-gray-100 py-2 rounded-md">
            Sign In with Google
          </button>
          <button className="w-full bg-black text-white py-2 rounded-md">
            Sign In with X
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="px-3 text-sm text-gray-500">Or</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            className="w-full px-3 py-2 border rounded-md text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <input
            name="username"
            placeholder="Username"
            className="w-full px-3 py-2 border rounded-md text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-orange-400 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Error */}
        {state?.error && (
          <p className="text-red-500 text-sm mt-3">{state.error}</p>
        )}

        {/* Button */}
        <button className="w-full mt-6 bg-orange-500 text-white py-2 rounded-md">
          Register
        </button>
      </form>

      {/* Login Redirect */}
      <p className="text-center text-sm text-orange-500 mt-4">
        Already have an account?{" "}
        <a href="/login" className="underline">
          Click here!
        </a>
      </p>
    </div>
  );
}
