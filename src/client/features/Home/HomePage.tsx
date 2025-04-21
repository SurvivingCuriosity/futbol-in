"use client";

import { INotificaciones } from "@/core/types/Notificaciones/INotificaciones";
import { UserDTO } from "@/server/models/User/UserDTO";
import { Steps } from "intro.js-react";
import { useState } from "react";
import { CompletarCiudad } from "../MiPerfil/CompletarPerfil/steps/CompletarCiudadActual";
import { Header } from "./Header/Header";
import { steps } from "./intro/steps";
import { UserClient } from "@/client/shared/client/UserClient";
import { useSession } from "next-auth/react";
import { LStorage, LStorageKeys } from "@/client/shared/services/LocalStorage/LStorage";

const HomePage = ({
  user,
  tieneNotificaciones,
  notificaciones,
}: {
  user: UserDTO | undefined;
  tieneNotificaciones: boolean;
  notificaciones: INotificaciones;
}) => {
  const { update } = useSession();

  const [ciudadDone, setCiudadDone] = useState(user?.ciudadActual !== null);

  const stepsEnabled = window && window.localStorage && LStorage.getItem(LStorageKeys.TOUR_INICIO_DONE) !== "true";
  const initialStep = 0;

  const handleUpdateCiudadActual = async (nuevaCiudad: string | null) => {
    const res = await UserClient.updateUser({
      ...user,
      ciudadActual: nuevaCiudad,
      ciudad: nuevaCiudad,
    });
    if (res.success) {
      setCiudadDone(true);
    }
    update()
  };

  const onExit = () => {
    LStorage.setItem(LStorageKeys.TOUR_INICIO_DONE, "true");
    console.log(LStorage.getItem(LStorageKeys.TOUR_INICIO_DONE))
  };

  return (
    <div>
      <Header
        user={user}
        tieneNotificaciones={tieneNotificaciones}
        notificaciones={notificaciones}
      />
      {!ciudadDone && (
        <div className="flex flex-col gap-2">
          <p className="text-primary">Completa tu ciudad</p>
          <CompletarCiudad onSubmit={handleUpdateCiudadActual} />
        </div>
      )}
      <p className="texto p-10 text-center text-neutral-400">
        Aún no hay nada por aquí 🫣
      </p>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={onExit}
        options={{
          nextLabel: "Siguiente",
          prevLabel: "Atrás",
        }}
      />
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
