"use client";

import { signIn } from "next-auth/react";

interface Props {}

const LoginButton = (props: Props) => {
  return (
    <button
      onClick={() => {
        signIn();
      }}
    >
      Sign in
    </button>
  );
};

export default LoginButton;
