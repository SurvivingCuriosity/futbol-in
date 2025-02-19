import imagen_fondo from "@/assets/img/background.jpg";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { RegisterForm } from "./RegisterForm";
const page = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <section 
      className="h-dvh flex items-start justify-center relative overflow-scroll"
      >
      <Image alt="Imagen de fondo" src={imagen_fondo} className="h-full absolute object-bottom left-0 object-cover user-select-none"/>
      <div className="z-1 w-full p-4">
        
        <RegisterForm />
      </div>
    </section>
  );
};

export default page;
