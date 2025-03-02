import { NavLayout } from "@/shared/components/Layouts/NavLayout";
import { getServerSession } from "next-auth";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession();
  return <NavLayout loggedIn={!!session}>{children}</NavLayout>;
};

export default layout;
