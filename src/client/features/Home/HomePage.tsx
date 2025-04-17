"use client";

import { INotificaciones } from "@/core/types/Notificaciones/INotificaciones";
import { UserDTO } from "@/server/models/User/UserDTO";
import { Header } from "./Header/Header";

const HomePage = ({user, tieneNotificaciones, notificaciones}:{user:UserDTO|undefined,tieneNotificaciones:boolean, notificaciones:INotificaciones}) => {

  return (
    <div>
      <Header user={user} tieneNotificaciones={tieneNotificaciones} notificaciones={notificaciones} />
      <p className="p-10 text-center text-neutral-400">Aún no hay nada por aquí</p>
      {/* <div className="h-full w-full flex flex-col md:grid grid-cols-5 grid-rows-5 gap-8 *:h-full md:*:border md:*:p-4 *:border-neutral-800 *:rounded-lg">

        <div className="col-span-3 row-span-3 max-h-[500px]">
          <TablonMensajes />
        </div>
        <div className="col-span-2 row-span-3 col-start-4">
          <Matchmaking />
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
