"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginAction } from "./actions";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <form action={loginAction}>
        {/* Username */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Username</label>
          <input
            name="username"
            className="w-full mt-1 px-3 py-2 border rounded-md"
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="text-sm text-gray-600">Password</label>
          <div className="relative mt-1">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
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

        {/* Forgot */}
        <div className="text-right mb-4">
          <a className="text-sm text-orange-500">Forgot Password?</a>
        </div>

        {/* Submit */}
        <button className="w-full bg-orange-500 text-white py-2 rounded-md">
          Sign In
        </button>
      </form>

      {/* Divider */}
      <p className="text-center text-sm text-gray-500 my-4">
        Or sign in with the following methods
      </p>

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

      {/* Register */}
      <p className="text-center text-sm text-orange-500 mt-4">
        Dont have an account? <a href="/register">Click here!</a>
      </p>
    </div>
  );
}
