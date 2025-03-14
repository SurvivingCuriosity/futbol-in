import React from "react";

export const Comentarios = ({ comentarios }: { comentarios: string }) => {
  return (
    comentarios && (
      <p className="bg-neutral-800 p-1 rounded-lg text-sm text-neutral-500 mb-auto">
        Comentarios en plan este futbolin esta super chulo
      </p>
    )
  );
};
