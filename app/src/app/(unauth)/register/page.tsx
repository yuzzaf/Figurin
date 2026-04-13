"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-orange-500">Figure.in</h1>
          <p className="text-gray-600 mt-2">Lets Start your Hobby Journey!</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow p-6">
          {/* Divider */}
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="px-3 text-sm text-gray-500">Or</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none" />
            </div>

            <div>
              <label className="text-sm text-gray-600">Username</label>
              <input className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none" />
            </div>
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <div className="relative mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded-md pr-10 focus:ring-2 focus:ring-orange-400 outline-none"
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
          </div>

          {/* Register Button */}
          <button className="w-full mt-6 bg-orange-500 text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition">
            Register
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-orange-500 mt-4">
            Already have an account?{""}
            <a href="/login" className="underline">
              Click here!
            </a>
          </p>

          {/* Social Register */}
          <div className="space-y-3 mt-6">
            <button className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md font-medium hover:bg-blue-700">
              <span className="text-lg font-bold">f</span>
              Register with Facebook
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-800 py-2 rounded-md font-medium hover:bg-gray-200">
              <span>G</span>
              Register with Google
            </button>

            <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md font-medium hover:bg-gray-900">
              <span>X</span>
              Register with X
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
