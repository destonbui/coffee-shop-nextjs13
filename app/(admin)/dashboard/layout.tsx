import AdminSidebar from "@/lib/components/navigation/AdminSidebar";
import { getServerSession } from "next-auth";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const session = await getServerSession();

  return (
    <div className="relative flex min-h-screen bg-gray-200">
      {/* Admin sidebar navigation */}
      <AdminSidebar session={session} />
      <div className="mx-4 mt-4 flex-grow overflow-x-hidden">{children}</div>
    </div>
  );
};

export default layout;
