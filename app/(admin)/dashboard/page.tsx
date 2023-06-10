import LogoutButton from "@/lib/components/auth/LogoutButton";
import UserDisplay from "@/lib/components/auth/UserDisplay";
import React from "react";

interface Props {}

const page = (props: Props) => {
  return (
    <div>
      <UserDisplay />
    </div>
  );
};

export default page;
