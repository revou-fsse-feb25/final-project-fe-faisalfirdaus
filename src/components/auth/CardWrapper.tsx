"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AuthFooter from "./AuthFooter";

interface CardWrapperProps {
  title: string;
  footerText: string;
  backButtonHref: string;
  backButtonLabel: string;
  children: React.ReactNode;
}

const CardWrapper = ({
  title,
  footerText,
  backButtonHref,
  backButtonLabel,
  children,
}: CardWrapperProps) => {
  return (
    <Card className="w-full max-w-md border-0 bg-black/70 text-white shadow-2xl backdrop-blur-md gap-4">
      <CardHeader className="px-8 pt-4 pb-4">
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-8 pb-4">{children}</CardContent>
      <CardFooter className="px-8 pb-2 pt-4 text-neutral-300">
        <AuthFooter
          href={backButtonHref}
          label={backButtonLabel}
          footerText={footerText}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
