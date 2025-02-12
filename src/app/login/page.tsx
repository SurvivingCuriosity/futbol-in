import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";

const page = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="w-[800px]">
        <LoginForm />
      </div>
    </section>
  );
};

export default page;
