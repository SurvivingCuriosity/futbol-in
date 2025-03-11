import { Window } from "@/shared/components/Window/Window";
import { ILogro } from "@/shared/types/Logros/Logro";
import Link from "next/link";

import { getLevel } from "@/shared/services/Logros/GetLevel";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { MedallaIcon } from "../MiPerfil/components/MedallaIcon";

export interface EnhorabuenaNuevaMedallaProps {
  nuevoLogro: {
    logro: ILogro;
    value: number;
  };
}

export const EnhorabuenaNuevaMedalla = (
  props: EnhorabuenaNuevaMedallaProps
) => {
  const { nuevoLogro } = props;
  const router = useRouter();

  if (!nuevoLogro) return null;

  return (
    <Window
      onClose={() => {
        router.push("/");
      }}
    >
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <div className="p-8 z-20 bg-neutral-950 rounded-2xl">
        <h1 className="text-3xl lg:text-5xl font-black">Enhorabuena!</h1>
        <h2 className="mt-4 lg:text-lg text-neutral-500">
          Has conseguido un nuevo logro!
        </h2>
        <div className="scale-125 m-10 mx-auto flex flex-col gap-2 items-center justify-center border w-fit p-4 rounded-xl border-neutral-700 z-20 bg-neutral-900/50">
          <MedallaIcon
            conseguida={true}
            icon={nuevoLogro.logro.icon}
            level={getLevel(nuevoLogro.value, nuevoLogro.logro.steps)}
            showConseguidaIcon={false}
            size="xl"
          />
          <p className="text-lg">{nuevoLogro.logro.nombre}</p>
          <p className="text-neutral-400">
            {nuevoLogro.logro.stepDescription(nuevoLogro.value)}
          </p>
          <Link href={"/perfil"} className="bg-neutral-800 p-2 rounded-lg">
            Ver en mi perfil
          </Link>
        </div>
      </div>
    </Window>
  );
};
