import { faCheck, faPlus, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { ILogro } from "../types/Logros/Logro";
import { TipoLogroEnum } from "../enum/Logros/TipoLogroEnum";

type Logro = ILogro & { id: number };

export const LOGROS_DISPONIBLES: Record<TipoLogroEnum, Logro> = {
  [TipoLogroEnum.AGREGAR_SPOTS]: {
    id: 1,
    nombre: "Explorador",
    descripcion: "Añade nuevos spots.",
    icon: faPlus,
    steps: [5, 10, 25, 50, 100],
    stepDescription: (n: number) => `Añade ${n} futbolines`,
  },
  [TipoLogroEnum.VOTAR_SPOTS]: {
    id: 2,
    nombre: "Comentarista",
    descripcion: "Vota positiva o negativamente los spots de otros usuarios.",
    icon: faThumbsUp,
    steps: [5, 10, 25, 50, 100],
    stepDescription: (n: number) => `Valora ${n} futbolines`,
  },
  [TipoLogroEnum.ADDED_SPOTS_VERIFICADOS]: {
    id: 3,
    nombre: "De fiar",
    descripcion: "Tus contribuciones son aprobadas por usuarios verificados.",
    icon: faCheck,
    steps: [5, 10, 25, 50, 100],
    stepDescription: (n: number) => `Consigue ${n} aprobados`,
  },
};
