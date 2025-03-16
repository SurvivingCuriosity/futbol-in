import React from "react";
import { IMensaje } from "./TablonMensajes";
import { dateToTimeAgo } from "@/packages/utils/dateToTimeAgo";

export const Mensaje = ({ mensaje }: { mensaje: IMensaje }) => {
  return (
    <div className="flex flex-col gap-1 bg-neutral-900 border border-neutral-800 rounded-lg md:p-4 p-2">
      <span className="flex items-center gap-2">
        <p className="text-neutral-300">{mensaje.usuario}</p>
        <p className="text-neutral-400 text-xs">
          {dateToTimeAgo(mensaje.fecha)}
        </p>
      </span>
      <p className="text-neutral-500 text-xs">{mensaje.mensaje}</p>
    </div>
  );
};
