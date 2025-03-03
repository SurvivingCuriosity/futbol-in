import { NavLayout } from "@/shared/components/Layouts/NavLayout";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  return <NavLayout loggedIn={true}>{children}</NavLayout>;
};

export default layout;
