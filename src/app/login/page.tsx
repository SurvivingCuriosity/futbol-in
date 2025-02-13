import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import Image from "next/image";
import imagen_fondo from "@/assets/img/background.jpg";
const page = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <section 
      className="h-dvh flex items-start justify-center relative overflow-hidden"
      >
      <Image alt="Imagen de fondo" src={imagen_fondo} className="h-full absolute object-bottom left-0 object-cover user-select-none"/>
      <div className="z-1 w-full p-4">
        <LoginForm />
      </div>
    </section>
  );
};

export default page;
