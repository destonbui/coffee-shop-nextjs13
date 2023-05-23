"use client";

import { useSession } from "next-auth/react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

interface Props {}

const UserDisplay = (props: Props) => {
  const { data: session } = useSession();

  console.log(session);

  return (
    <div>
      {session ? (
        <>
          <h3 className="h5">Hello, {session?.user?.name}</h3>
          <LogoutButton />
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default UserDisplay;
