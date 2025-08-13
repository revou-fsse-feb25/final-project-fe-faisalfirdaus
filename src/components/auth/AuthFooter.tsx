import Link from "next/link";
import { Button } from "../ui/button";

interface AuthFooterProps {
  footerText: string;
  label: string;
  href: string;
}

const AuthFooter = ({ label, href, footerText }: AuthFooterProps) => {
  return (
    // <div className="flex justify-center items-center gap-2 mx-auto">
    //   <span className="text-sm text-gray-600">{label}</span>
    //   <Link href={href} className="text-sm text-blue-600 hover:underline">
    //     {href.includes("login") ? "Login" : "Register"}
    //   </Link>
    // </div>
    <div className="w-full border-t border-neutral-700 pt-4">
      <p className="text-center text-base">
        {footerText}{" "}
        <Link href={href} className="font-semibold text-white hover:underline">
          {label}
        </Link>
      </p>
    </div>
  );
};

export default AuthFooter;
