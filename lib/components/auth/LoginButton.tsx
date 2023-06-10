"use client";

import { signIn } from "next-auth/react";
import GitHubIcon from "@mui/icons-material/GitHub";

interface Props {}

const LoginButton = (props: Props) => {
  return (
    <button
      onClick={() => {
        signIn("github", { callbackUrl: "/dashboard" });
      }}
      className="flex items-center gap-2 rounded-full bg-theme-green-main/10 px-6 py-2 font-arimo text-black shadow transition duration-300 ease-in-out hover:bg-theme-green-main/20"
    >
      <GitHubIcon />
      Sign in with Github
    </button>
  );
};

export default LoginButton;
