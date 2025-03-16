import React from "react";

export const Comentarios = ({ comentarios }: { comentarios: string }) => {

  console.log(comentarios)

  return (
    comentarios && (
      <p className="bg-neutral-800 p-1 rounded-lg text-sm text-neutral-500 mb-2">
        {comentarios}
      </p>
    )
  );
};
