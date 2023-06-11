import { getServerSession } from "next-auth";
import React from "react";

interface Props {}

const Dashboard = async (props: Props) => {
  const session = await getServerSession();
  return (
    <>
      <h1>Hello, {session?.user.name}</h1>
    </>
  );
};

export default Dashboard;
