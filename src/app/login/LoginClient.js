"use client";
import React, { useState, useEffect } from "react";
import { login } from "../services/login";
import Image from "next/image";
import Link from "next/link";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const data = await login(email, password);
      
      if (data.success) {
        console.log("Cookie after login:", document.cookie);
        
        await new Promise(resolve => setTimeout(resolve, 100));
        
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="flex min-h-screen">
      {/* Kiri: Ilustrasi */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <Image
          src="/login-illustration.svg"
          alt="Login Illustration"
          width={400}
          height={400}
          priority
        />
      </div>

      {/* Kanan: Form Login */}
      <div className="w-1/2 flex flex-col items-center justify-center bg-purple-950 text-white px-8">
        <div className="max-w-sm w-full">
          <h1 className="text-4xl font-bold text-center mb-2">BliSS</h1>
          <h2 className="text-2xl font-semibold text-center mb-1">Welcome Back!</h2>
          <p className="text-center text-gray-300 mb-8">
            Please Enter Your Details
          </p>

          <form className="space-y-5" onSubmit={(e) => handleSubmit(e, email, password)}>
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="PASSWORD"
                className="w-full px-4 py-3 rounded-md bg-transparent border border-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
<button
  type="button"
  onClick={togglePassword}
  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-white"
>
  {showPassword ? (
    <FiEyeOff className="h-5 w-5" />
  ) : (
    <FiEye className="h-5 w-5" />
  )}
</button>


            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-white text-purple-900 font-semibold py-3 rounded-md hover:bg-purple-100 transition"
            >
              LOGIN
            </button>

            {/* Forgot Password */}

          </form>
        </div>
      </div>
    </div>
  );
}
