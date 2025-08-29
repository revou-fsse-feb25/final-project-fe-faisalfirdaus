"use client";

import CardWrapper from "./CardWrapper";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
// ⬇️ match the navbar’s provider path & API shape
import { useAuth } from "@/providers/AuthProviders";
import { toast } from "sonner";
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

  // ⬇️ useAuth now provides login(email, password)
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: ErrorData = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsloading(true);
    try {
      // ⬇️ call the simple login signature
      await login(formData.email, formData.password);

      toast.success("Logged in successfully");
      route.push("/");
    } catch (err: any) {
      const message =
        err?.message ||
        err?.response?.data?.message ||
        "Invalid email or password";
      setErrors({ email: message });
      toast.error(message);
    } finally {
      setIsloading(false);
    }
  };

  return (
    <CardWrapper
      title="Login"
      footerText="Don't have an account?"
      backButtonHref="/auth/register"
      backButtonLabel="Register here"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <div className="relative">
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

        {/* Password with visibility toggle */}
        <div>
          <div>
            <div className="relative">
              <input
                type={isShowPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-md bg-neutral-700/80 px-4 py-3 pr-11 text-base text-white placeholder-neutral-300 outline-none ring-1 ring-transparent transition focus:bg-neutral-700 focus:ring-white/20"
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

        {/* Submit */}
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
