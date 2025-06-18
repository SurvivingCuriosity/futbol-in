import React from "react";

export const SeccionPerfil = ({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="grow p-3 bg-neutral-900 rounded-lg">
      {titulo && <p className="text-xl lg:text-2xl lg:p-2 text-primary font-bold">{titulo}</p>}
      <div className="pt-3 md:p-5 md:gap-8">
        {children}
      </div>
    </div>
  );
};
