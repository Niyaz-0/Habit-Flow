import { SignIn } from "@clerk/nextjs";
import React from "react";

function SignInPage() {
  const defaultColor = "#5151e6"//"#d90429";
  const gradientColor = `linear-gradient(to bottom, ${defaultColor}, #5151e6)`;
  return (
    <div
      style={{ background: gradientColor }}
      className="flex justify-center items-center flex-col gap-10 w-full h-screen"
    >
      <SignIn />
    </div>
  );
}

export default SignInPage;
