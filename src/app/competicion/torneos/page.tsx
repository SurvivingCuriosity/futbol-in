import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import React from "react";

const page = () => {
  return (
    <GoBackLayout href="/competicion">
      <div className="w-full h-full flex flex-col items-center justify-center p-20 text-center">
        <p className="text-lg">Ups... esta parte aún no está terminada</p>
        <p className="text-xs text-neutral-500">
          Podrás apuntarte a torneos, ver tus resultados y los de otros
          jugadores
        </p>
      </div>
    </GoBackLayout>
  );
};

export default page;
