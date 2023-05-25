"use client";

import { signOut } from "next-auth/react";

interface Props {}

const LogoutButton = (props: Props) => {
  return (
    <button
      onClick={() => {
        signOut();
      }}
    >
      Sign out
    </button>
  );
};

export default LogoutButton;
