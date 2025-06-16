import {
    faBrain,
  faClock,
  faGamepad,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  FrecuenciaDeCompeticion,
  FrecuenciaDeCompeticionLabels,
} from "./enum/FrecuenciaDeCompeticion";
import {
  FrecuenciaDeJuego,
  FrecuenciaDeJuegoLabels,
} from "./enum/FrecuenciaDeJuego";
import { Habilidad, HabilidadLabels } from "./enum/Habilidad";
import { Conocimiento, ConocimientoLabels } from "./enum/Conocimiento";

export interface DescripcionNivel {
  nivel: number;
  frecuenciaDeJuego: FrecuenciaDeJuego;
  frecuenciaCompeticion: FrecuenciaDeCompeticion;
  conocimiento: Conocimiento;
  habilidad: Habilidad;
  color: string;
  colorNitido: string;
}

export const TablaPuntuacionPage = () => {
  const TABLA_DATA: DescripcionNivel[] = [
    {
      nivel: 1,
      frecuenciaDeJuego: FrecuenciaDeJuego.NUNCA,
      frecuenciaCompeticion: FrecuenciaDeCompeticion.NO_COMPITO,
      color: "bg-sky-900/30",
      colorNitido: "text-sky-500",
      habilidad: 1,
      conocimiento: 1,
    },
    {
      nivel: 2,
      frecuenciaDeJuego: FrecuenciaDeJuego.MUY_POCO,
      frecuenciaCompeticion: FrecuenciaDeCompeticion.NO_COMPITO,
      color: "bg-sky-900/30",
      colorNitido: "text-sky-500",
      habilidad: 2,
      conocimiento: 2,
    },
    {
      nivel: 3,
      frecuenciaDeJuego: FrecuenciaDeJuego.MUY_POCO,
      frecuenciaCompeticion: FrecuenciaDeCompeticion.NO_COMPITO,
      color: "bg-emerald-900/30",
      colorNitido: "text-emerald-500",
      habilidad: 3,
      conocimiento: 3,
    },
    {
      nivel: 4,
      frecuenciaDeJuego: FrecuenciaDeJuego.UNA_VEZ_AL_MES,
      frecuenciaCompeticion: FrecuenciaDeCompeticion.NO_COMPITO,
      color: "bg-emerald-900/30",
      colorNitido: "text-emerald-500",
      habilidad: 4,
      conocimiento: 4,
    },
    {
      nivel: 5,
      frecuenciaDeJuego: FrecuenciaDeJuego.UNA_VEZ_AL_MES,
      frecuenciaCompeticion: FrecuenciaDeCompeticion.NO_COMPITO,
      color: "bg-green-800/30",
      colorNitido: "text-green-500",
      habilidad: 5,
      conocimiento: 5,
    },
    {
      nivel: 6,
      frecuenciaDeJuego: FrecuenciaDeJuego.UNA_VEZ_A_LA_SEMANA,
      frecuenciaCompeticion:
        FrecuenciaDeCompeticion.COMPITO_LIGAS_TORNEOS_CIUDAD,
      color: "bg-yellow-800/30",
      colorNitido: "text-yellow-500",
      habilidad: 6,
      conocimiento: 6,
    },
    {
      nivel: 7,
      frecuenciaDeJuego: FrecuenciaDeJuego.UNA_VEZ_A_LA_SEMANA,
      frecuenciaCompeticion:
        FrecuenciaDeCompeticion.COMPITO_LIGAS_TORNEOS_CIUDAD,
      color: "bg-orange-800/30",
      colorNitido: "text-orange-500",
      habilidad: 7,
      conocimiento: 7,
    },
    {
      nivel: 8,
      frecuenciaDeJuego: FrecuenciaDeJuego.VARIAS_VECES_A_LA_SEMANA,
      frecuenciaCompeticion:
        FrecuenciaDeCompeticion.COMPITO_LIGAS_TORNEOS_ALREDEDOR,
      color: "bg-red-800/30",
      colorNitido: "text-red-500",
      habilidad: 8,
      conocimiento: 8,
    },
    {
      nivel: 9,
      frecuenciaDeJuego: FrecuenciaDeJuego.VARIAS_VECES_A_LA_SEMANA,
      frecuenciaCompeticion:
        FrecuenciaDeCompeticion.COMPITO_LIGAS_TORNEOS_NACIONALES,
      color: "bg-fuchsia-800/30",
      colorNitido: "text-fuchsia-500",
      habilidad: 9,
      conocimiento: 9,
    },
    {
      nivel: 10,
      frecuenciaDeJuego: FrecuenciaDeJuego.CASI_TODOS_LOS_DIAS,
      frecuenciaCompeticion:
        FrecuenciaDeCompeticion.COMPITO_LIGAS_TORNEOS_NACIONALES,
      color: "bg-zinc-950/90",
      colorNitido: "text-zinc-400",
      habilidad: 10,
      conocimiento: 10,
    },
  ];

  return (
    <div>
      <h1 className="text-primary text-3xl font-extrabold">
        Tabla de puntuación futbolín
      </h1>

      <ul className="flex flex-col gap-2 mt-3">
        {TABLA_DATA.map((e, i) => (
          <li key={i} className={`p-2 rounded-xl ${e.color}`}>
            <p className={`text-lg font-black ${e.colorNitido}`}>
              Nivel {e.nivel}
            </p>
            <TablaPuntuacionItem d={e} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const TablaPuntuacionItem = ({ d }: { d: DescripcionNivel }) => {
  return (
    <ul className="mt-2">
      <li className="w-full flex items-start border-b pb-1 border-neutral-50/10 gap-0.5 text-neutral-400 mb-2">
        <FontAwesomeIcon
          className={"w-min mr-1"}
          icon={faClock}
          width={20}
          height={20}
        />
        <p className="text-xs w-4/12">Tiempo jugado</p>
        <p className="ml-2 w-8/12 text-xs text-neutral-300">
          {FrecuenciaDeJuegoLabels[d.frecuenciaDeJuego]}
        </p>
      </li>
      <li className="w-full flex items-start border-b pb-1 border-neutral-50/10 gap-0.5 text-neutral-400 mb-2">
        <FontAwesomeIcon
          className={"w-min mr-1"}
          icon={faBrain}
          width={20}
          height={20}
        />
        <p className="text-xs w-4/12">Conocimientos</p>
        <p className="ml-2 w-8/12 text-xs text-neutral-300">
          {ConocimientoLabels[d.conocimiento]}
        </p>
      </li>
      <li className="w-full flex items-start border-b pb-1 border-neutral-50/10 gap-0.5 text-neutral-400 mb-2">
        <FontAwesomeIcon
          className={"w-min mr-1"}
          icon={faGamepad}
          width={20}
          height={20}
        />
        <p className="text-xs w-4/12">Habilidad</p>
        <p className="ml-2 w-8/12 text-xs text-neutral-300">
          {HabilidadLabels[d.habilidad]}
        </p>
      </li>
      <li className="w-full flex items-start border-b pb-1 border-neutral-50/10 gap-0.5 text-neutral-400 mb-2">
        <FontAwesomeIcon
          className={"w-min mr-1"}
          icon={faTrophy}
          width={20}
          height={20}
        />
        <p className="text-xs w-4/12">Competición</p>
        <p className="ml-2 w-8/12 text-xs text-neutral-300">
          {FrecuenciaDeCompeticionLabels[d.frecuenciaCompeticion]}
        </p>
      </li>
    </ul>
  );
};
