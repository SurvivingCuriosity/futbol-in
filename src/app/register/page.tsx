import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { RegisterForm } from "./RegisterForm";

const page = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-[800px]">
        <RegisterForm />
      </div>
    </section>
  );
};

export default page;
