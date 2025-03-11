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
      <div style={{transitionDelay:'500ms'}} className="p-8 z-20 bg-neutral-950 rounded-2xl animate-puff-in border border-neutral-800">
        <h1 className="text-3xl lg:text-5xl font-black">Enhorabuena!</h1>
        <h2 className="lg:text-lg text-neutral-500">
          Has conseguido un nuevo logro!
        </h2>
        <div className="scale-125 m-10 mx-auto flex flex-col items-center justify-center w-fit p-4 rounded-xl z-20">
          <MedallaIcon
            conseguida={true}
            icon={nuevoLogro.logro.icon}
            level={getLevel(nuevoLogro.value, nuevoLogro.logro.steps)}
            showConseguidaIcon={false}
            size="xl"
          />
          <p className="text-lg uppercase font-black mt-2">{nuevoLogro.logro.nombre}</p>
          <p className="text-neutral-400 text-sm">
            {nuevoLogro.logro.stepDescription(nuevoLogro.value)}
          </p>
          <Link href={"/perfil"} className="bg-neutral-800 p-2 px-4 rounded-lg mt-4 text-sm">
            Ver en mi perfil
          </Link>
        </div>
      </div>
    </Window>
  );
};
