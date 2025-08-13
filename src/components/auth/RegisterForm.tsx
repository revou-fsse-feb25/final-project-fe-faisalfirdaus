"use client";

import { useState } from "react";
import CardWrapper from "./CardWrapper";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorData {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const RegisterForm = () => {
  const route = useRouter();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorData>({});
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] =
    useState<boolean>(false);

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

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.confirmPassword.length < 6) {
      newErrors.confirmPassword =
        "Confirm Password must be at least 6 characters";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
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

    const { confirmPassword, ...dataToSubmit } = formData;

    try {
      setIsLoading(true);
      // Simulate a registration request
      setTimeout(() => {
        setIsLoading(false);
        // Simulate successful registration
        // Here you would typically send dataToSubmit to your API
        console.log("Registration successful with data:", dataToSubmit);
        // Redirect or show success message
        route.push("/auth/login");
      }, 2000);
    } catch (error) {
      console.error("Registration error:", error);
      setIsLoading(false);
      setErrors({ email: "An unexpected error occurred. Please try again." });
    }

    // console.log("Form submitted successfully with data:", dataToSubmit);
  };

  return (
    <CardWrapper
      title="Register"
      footerText="Already have an account?"
      backButtonHref="/auth/login"
      backButtonLabel="Login here"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Username field */}
        <div>
          {/* <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label> */}
          <div className="relative">
            {/* <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full rounded-md bg-neutral-700/80 px-4 py-3 text-base text-white placeholder-neutral-300 outline-none ring-1 ring-transparent transition focus:bg-neutral-700 focus:ring-white/20"
              required
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>
        </div>

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
                "w-full rounded-md bg-neutral-700/80 px-4 py-3 text-base text-white placeholder-neutral-300 outline-none ring-1 ring-transparent transition focus:bg-neutral-700 focus:ring-white/20"
              }
              placeholder="Create a strong password"
            />
            <button
              type="button"
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {isShowPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password field with visibility toggle */}
        <div>
          {/* <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm Password:
          </label> */}
          <div className="relative">
            {/* <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            /> */}
            <input
              type={isShowConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full rounded-md bg-neutral-700/80 px-4 py-3 text-base text-white placeholder-neutral-300 outline-none ring-1 ring-transparent transition focus:bg-neutral-700 focus:ring-white/20"
              placeholder="Re-enter your password"
            />
            <button
              type="button"
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {isShowConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        {/* <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          disabled={isLoading}
        >
          Register
        </button> */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-red-600 py-3 text-base font-semibold text-white shadow-md transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isLoading ? "Register…" : "Register"}
        </button>
      </form>
    </CardWrapper>
  );
};

export default RegisterForm;
