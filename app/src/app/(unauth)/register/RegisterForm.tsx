"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useFormState } from "react-dom";
import { registerAction } from "./actions";

const initialState = {
  error: "",
  success: false,
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useFormState(registerAction, initialState);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <form action={formAction}>
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
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            name="username"
            placeholder="Username"
            className="w-full px-3 py-2 border rounded-md"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
          />

          {/* Password */}
          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md pr-10"
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
