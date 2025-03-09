import { faCheck, faPlus, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { ILogro } from "../types/Logros/Logro";

export const LOGROS_DISPONIBLES: Array<ILogro & { id: number }> = [
  {
    id: 1,
    nombre: "Explorador",
    descripcion: "Añade nuevos spots.",
    icon: faPlus,
    steps: [5, 10, 25, 50, 100],
    stepDescription: (n: number) => `Añade ${n} futbolines`,
  },
  {
    id: 2,
    nombre: "Comentarista",
    descripcion: "Vota positiva o negativamente los spots de otros usuarios.",
    icon: faThumbsUp,
    steps: [5, 10, 25, 50, 100],
    stepDescription: (n: number) => `Valora ${n} futbolines`,
  },
  {
    id: 3,
    nombre: "De fiar",
    descripcion: "Tus contribuciones son aprobadas por usuarios verificados.",
    icon: faCheck,
    steps: [5, 10, 25, 50, 100],
    stepDescription: (n: number) => `Consigue ${n} aprobados`,
  },
];
