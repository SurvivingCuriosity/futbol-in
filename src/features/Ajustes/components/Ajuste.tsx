import React from "react";

export interface AjusteProps {
  titulo: string;
  descripcion: string;
  children: React.ReactNode;
}

export const Ajuste = (props: AjusteProps) => {
  const { titulo, descripcion, children } = props;
  return (
    <article className="mb-4 last:mb-0">
      <p className="text-neutral-300">{titulo}</p>
      <p className="text-neutral-500 text-xs mb-2">{descripcion}</p>
      {children}
    </article>
  );
};
