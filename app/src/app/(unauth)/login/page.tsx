"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-md">
        {/* Logo & Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">Figure.in</h1>
          <p className="text-gray-600 mt-2">
            Explore your Hobby with Figurein!
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow p-6">
          {/* Username */}
          <div className="mb-4">
            <label className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              placeholder=""
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="text-sm text-gray-600">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-md pr-10 focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-4">
            <a href="#" className="text-sm text-orange-500 hover:underline">
              Forgot Your Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition">
            Sign In
          </button>

          {/* Divider */}
          <p className="text-center text-sm text-gray-500 my-4">
            Or sign in with the following methods
          </p>

          {/* Social Login */}
          <div className="space-y-3">
            {/* Facebook */}
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700">
              <span className="font-bold text-lg">f</span>
              Sign In with Facebook
            </button>

            {/* Google */}
            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-200">
              <span>G</span>
              Sign In with Google
            </button>

            {/* X */}
            <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900">
              <span>X</span>
              Sign In with X
            </button>
          </div>

          {/* Register */}
          <p className="text-center text-sm text-orange-500 mt-4">
            Dont have an account?{" "}
            <a href="#" className="underline">
              Click here!
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
