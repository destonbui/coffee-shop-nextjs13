import logo from "@/public/phuclong-logo-main.png";

import Image from "next/image";
import LoginButton from "@/lib/components/auth/LoginButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

interface Props {}

const SignIn = async (props: Props) => {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="relative flex h-screen flex-col items-center justify-center gap-4">
        {/* Mobile login */}
        <Image
          className="h-20 w-auto"
          src={logo}
          alt="Phúc Long Coffee & Tea"
          height={200}
          width={150}
          placeholder="blur"
        />
        <h1 className=" font-baloo text-lg font-bold uppercase text-theme-green-main">
          Admin Login
        </h1>
        <LoginButton />
      </div>
    );
  } else {
    redirect("/dashboard");
  }
};

export default SignIn;
