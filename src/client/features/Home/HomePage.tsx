"use client";

import { INotificaciones } from "@/core/types/Notificaciones/INotificaciones";
import { Header } from "./Header/Header";
import { Matchmaking } from "./Matchmaking/Matchmaking";
import { TablonMensajes } from "./TablonMensajes/TablonMensajes";

const HomePage = ({tieneNotificaciones, notificaciones}:{tieneNotificaciones:boolean, notificaciones:INotificaciones}) => {

  return (
    <div>
      <Header tieneNotificaciones={tieneNotificaciones} notificaciones={notificaciones} />
      <div className="h-full w-full flex flex-col md:grid grid-cols-5 grid-rows-5 gap-8 *:h-full md:*:border md:*:p-4 *:border-neutral-800 *:rounded-lg">

        <div className="col-span-3 row-span-3 max-h-[500px]">
          <TablonMensajes />
        </div>
        <div className="col-span-2 row-span-3 col-start-4">
          <Matchmaking />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
