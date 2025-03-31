import imagen_fondo from "@/client/shared/assets/img/background.jpg";
import { UserStatus } from "@/core/enum/User/Status";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  const user = session?.user;

  if (user && user?.status === UserStatus.DONE) {
    redirect("/");
  }

  if (user && user?.status === UserStatus.MUST_CREATE_USERNAME) {
    redirect("/register/init-username");
  }

  return (
    <div className="fixed top-16 left-0 w-full h-dvh">
      <section className="h-full w-full flex items-start justify-center relative">
        <Image
          alt="Imagen de fondo"
          src={imagen_fondo}
          className="h-full absolute object-bottom left-0 object-cover user-select-none"
          placeholder="blur"
          fill
        />
        <div className="mt-12 bg-neutral-950/80 backdrop-blur-xs rounded-lg p-4 w-full max-w-[500px] mx-auto border border-neutral-800">
          {children}
        </div>
      </section>
    </div>
  );
};

export default layout;
