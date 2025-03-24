import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion"

export interface DescripcionCompeticion {
    titulo: string,
    descripcion:string[]
}

export const TIPOS_COMPETICION: Record<TipoCompeticion, DescripcionCompeticion> = {
    [TipoCompeticion.LIGA]: {
        titulo: "Liga",
        descripcion: [
            "Funcionamiento igual al de La Liga de fútbol.",
            "Se realizarán enfrentamientos entre todas las parejas apuntadas.",
            "Se ganarán puntos al ganar enfrentamientos.",
            "Tras jugarse todas las combinaciones de parejas, con ida y vuelta, ganará la pareja con más puntos."
        ],
    },
    [TipoCompeticion.TORNEO]: {
        titulo: "Torneo",
        descripcion: [
            "Funcionamiento igual al del mundial de futbol sin la fase de grupos",
            "Se generará un cuadro de rondas en función de la cantidad de parejas apuntadas.",
            "Si ganas un enfrentamiento pasas a la siguiente ronda",
        ],
    },
    [TipoCompeticion.TORNEO_CON_CLASIFICATORIA]: {
        titulo: "Torneo con clasificatoria",
        descripcion: [
            "Funcionamiento igual al del mundial de futbol con fase de grupos",
            "Se generarán grupos de parejas para jugar una liguilla y determinar quien pasa al torneo.",
            "Se generará un cuadro de rondas.",
            "Si ganas un enfrentamiento pasas a la siguiente ronda",
        ],
    },
}