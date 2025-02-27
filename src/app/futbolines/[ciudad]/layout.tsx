import { TopNavSearchLayout } from "@/shared/components/Layouts/TopNavSearchLayout";
import React from "react";

interface CityLayoutProps {
  params: Promise<{
    ciudad: string;
    placeId: string;
  }>;
  children: React.ReactNode;
}

const layout = async (props: CityLayoutProps) => {
  const { children, params } = props;

  const { ciudad } = await params;

  const ciudadLabel = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);

  return (
    <TopNavSearchLayout>
      <h1 className="text-2xl font-extrabold text-primary tracking-tight">
        Futbolines en {ciudadLabel}
      </h1>
      {children}
    </TopNavSearchLayout>
  );
};

export default layout;
