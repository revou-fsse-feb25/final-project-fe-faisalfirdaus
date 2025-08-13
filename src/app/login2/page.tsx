"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// shadcn/ui components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FormData {
  email: string;
  password: string;
}
interface ErrorData {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorData>({});
  const [isLoading, setIsloading] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const route = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): ErrorData => {
    const newErrors: ErrorData = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsloading(true);
    signIn("credentials", { ...formData, redirect: false })
      .then((response) => {
        setIsloading(false);
        if (response?.error) setErrors({ email: response.error });
        else route.push("/");
      })
      .catch(() => {
        setIsloading(false);
        setErrors({ email: "An unexpected error occurred. Please try again." });
      });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1517602302552-471fe67acf66?q=80&w=1600&auto=format&fit=crop')",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Centered container */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center px-4 sm:px-6">
        <Card className="w-full max-w-md border-0 bg-black/70 text-white shadow-2xl backdrop-blur-md">
          <CardHeader className="px-8 pt-8 pb-4">
            <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          </CardHeader>

          <CardContent className="px-8 pb-2">
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email input */}
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email or phone number"
                  className="w-full rounded-md bg-neutral-700/80 px-4 py-3 text-base text-white placeholder-neutral-300 outline-none ring-1 ring-transparent transition focus:bg-neutral-700 focus:ring-white/20"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Password input */}
              <div className="relative">
                <input
                  type={isShowPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full rounded-md bg-neutral-700/80 px-4 py-3 pr-11 text-base text-white placeholder-neutral-300 outline-none ring-1 ring-transparent transition focus:bg-neutral-700 focus:ring-white/20"
                />
                <button
                  type="button"
                  onClick={() => setIsShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-white"
                >
                  {isShowPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              {/* Sign In button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md bg-red-600 py-3 text-base font-semibold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isLoading ? "Signing In…" : "Sign In"}
              </Button>

              {/* Remember me / Need help */}
              <div className="flex items-center justify-between text-sm text-neutral-300">
                <label className="inline-flex items-center gap-2">
                  <Checkbox
                    defaultChecked
                    className="data-[state=checked]:bg-neutral-400"
                  />
                  <span>Remember me</span>
                </label>
                <button type="button" className="hover:underline">
                  Need help?
                </button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="px-8 pb-8 pt-4 text-neutral-300">
            <div className="w-full">
              <p className="text-base">
                New to Netflix?{" "}
                <Link
                  href="/auth/register"
                  className="font-semibold text-white hover:underline"
                >
                  Sign up now.
                </Link>
              </p>
              <p className="mt-4 text-sm text-neutral-400">
                This page is protected by Google reCAPTCHA to ensure you&apos;re
                not a bot.{" "}
                <button type="button" className="text-blue-400 hover:underline">
                  Learn more.
                </button>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
