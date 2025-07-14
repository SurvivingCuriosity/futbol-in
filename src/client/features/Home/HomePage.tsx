"use client";

import { INotificaciones } from "futbol-in-core/types";
import { UserDTO } from "futbol-in-core/types";
import { Steps } from "intro.js-react";
import { useState } from "react";
import { CompletarCiudad } from "../MiPerfil/CompletarPerfil/steps/CompletarCiudadActual";
import { Header } from "./Header/Header";
import { steps } from "./intro/steps";
import { UserClient } from "@/client/shared/client/UserClient";
import { useSession } from "next-auth/react";
import {
  LStorage,
  LStorageKeys,
} from "@/client/shared/services/LocalStorage/LStorage";
import { ListaCompeticionesHome } from "./CompeticionesHome/ListaCompeticionesHome";
import { CompeticionBaseDTO } from "futbol-in-core/types";
import { HeaderLocation } from "./Header/HeaderLocation";

const HomePage = ({
  user,
  tieneNotificaciones,
  notificaciones,
  competiciones,
}: {
  user: UserDTO | undefined;
  tieneNotificaciones: boolean;
  notificaciones: INotificaciones;
  competiciones: CompeticionBaseDTO[];
}) => {
  const { update } = useSession();

  const [ciudadDone, setCiudadDone] = useState(user?.ciudadActual !== null);

  const stepsEnabled =
    window &&
    window.localStorage &&
    LStorage.getItem(LStorageKeys.TOUR_INICIO_DONE) !== "true";
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
    update();
  };

  const onExit = () => {
    LStorage.setItem(LStorageKeys.TOUR_INICIO_DONE, "true");
    console.log(LStorage.getItem(LStorageKeys.TOUR_INICIO_DONE));
  };

  return (
    <div>
      {user && ciudadDone && (
        <div className={`pt-7 md:pt-0`}>
          <div className="fixed top-0 left-0 w-full md:relative md:pb-3">
            <HeaderLocation user={user} />
          </div>
        </div>
      )}
      <Header
        user={user}
        tieneNotificaciones={tieneNotificaciones}
        notificaciones={notificaciones}
      />
      {!ciudadDone && (
        <div className="flex flex-col gap-2 bg-neutral-900 p-4 rounded-2xl mb-4">
          <p className="text-primary">¿Dónde te encuentras ahora?</p>
          <CompletarCiudad onSubmit={handleUpdateCiudadActual} />
        </div>
      )}

      {competiciones.length > 0 ? (
        <ListaCompeticionesHome competiciones={competiciones} />
      ) : (
        <p className="texto p-10 text-center text-neutral-400">
          Aún no hay nada por aquí 🫣
        </p>
      )}

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
