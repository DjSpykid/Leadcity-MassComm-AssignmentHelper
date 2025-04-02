// app/auth/signup/page.tsx
"use client";

import { useSignupForm } from "@/lib/useSignupForm";
import { User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const { formData, errors, isLoading, handleChange, handleSubmit } =
    useSignupForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Account
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Join thousands of students getting assignment help
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500`}
                placeholder="John Doe"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500`}
                placeholder="student@university.edu"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="+234 812 345 6789"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-2 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg mt-6 ${
              isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-lg"
            } transition`}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
            {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/user-login" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
