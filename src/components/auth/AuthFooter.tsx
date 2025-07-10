import Link from "next/link";
import { Button } from "../ui/button";

interface AuthFooterProps {
  label: string;
  href: string;
}

const AuthFooter = ({ label, href }: AuthFooterProps) => {
  return (
    <div className="flex justify-center items-center gap-2 mx-auto">
      <span className="text-sm text-gray-600">{label}</span>
      <Link href={href} className="text-sm text-blue-600 hover:underline">
        {href.includes("login") ? "Login" : "Register"}
      </Link>
    </div>
  );
};

export default AuthFooter;
