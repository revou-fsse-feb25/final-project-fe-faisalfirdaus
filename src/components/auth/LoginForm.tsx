"use client";

import CardWrapper from "./CardWrapper";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
// import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// shadcn/ui
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

const LoginForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<ErrorData>({});
  const [isLoading, setIsloading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const route = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    // Update the form data state with the input value
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error for the field being changed
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = (): ErrorData => {
    const newErrors: ErrorData = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const newErrors: ErrorData = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsloading(true);

    try {
      // Simulate a login request
      setTimeout(() => {
        setIsloading(false);
        // Simulate successful login
        route.push("/");
      }, 2000);
    } catch (error) {
      console.error("Login error:", error);
      setIsloading(false);
      setErrors({ email: "An unexpected error occurred. Please try again." });
    }

    // try {
    //   signIn("credentials", {
    //     ...formData,
    //     redirect: false,
    //   }).then((response) => {
    //     setIsloading(false);
    //     if (response?.error) {
    //       setErrors({ email: response.error });
    //     } else {
    //       route.push("/");
    //     }
    //   });
    // } catch (error) {
    //   console.error("Login error:", error);
    //   setIsloading(false);
    //   setErrors({ email: "An unexpected error occurred. Please try again." });
    // }
  };

  return (
    <CardWrapper
      title="Login"
      footerText="Don't have an account?"
      backButtonHref="/auth/register"
      backButtonLabel="Register here"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* {Email Field} */}
        <div>
          {/* <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label> */}
          <div className="relative">
            {/* <Mail
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md bg-neutral-700/80 px-4 py-3 text-base text-white placeholder-neutral-300 outline-none ring-1 ring-transparent transition focus:bg-neutral-700 focus:ring-white/20"
              required
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
        </div>

        {/* Password field with visibility toggle */}
        <div>
          {/* <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label> */}
          <div>
            <div className="relative">
              {/* <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
              <input
                type={isShowPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={
                  "w-full rounded-md bg-neutral-700/80 px-4 py-3 pr-11 text-base text-white placeholder-neutral-300 outline-none ring-1 ring-transparent transition focus:bg-neutral-700 focus:ring-white/20"
                }
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setIsShowPassword(!isShowPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-white"
              >
                {isShowPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        {/* <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          disabled={isLoading}
        >
          Login
        </button> */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-red-600 py-3 text-base font-semibold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isLoading ? "Loging In…" : "Log In"}
        </button>

        {/* Options row */}
        <div className="flex items-center justify-between text-sm text-neutral-300">
          <label className="inline-flex items-center gap-2">
            <Checkbox className="data-[state=checked]:bg-neutral-400" />
            <span>Remember me</span>
          </label>
          <button type="button" className="hover:underline">
            Need help?
          </button>
        </div>
      </form>
    </CardWrapper>
  );
};

export default LoginForm;
