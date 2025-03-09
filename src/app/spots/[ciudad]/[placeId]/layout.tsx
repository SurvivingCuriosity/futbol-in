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
    <>
      <h1 className="text-3xl mb-2 font-extrabold text-primary tracking-tight">
        Futbolines en {ciudadLabel}
      </h1>
      {children}
    </>
  );
};

export default layout;
