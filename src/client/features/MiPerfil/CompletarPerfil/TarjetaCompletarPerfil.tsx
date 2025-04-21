import React from "react";

export const TarjetaCompletarPerfil = ({
  titulo,
  children,
}: {
  titulo?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-neutral-900 w-11/12 max-w-[500px] p-3 border border-primary shrink-0 snap-center flex flex-col justify-between gap-2 rounded-lg overflow-hidden">
      <p className="text-sm text-primary">{titulo}</p>
      {children}
    </div>
  );
};
