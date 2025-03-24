import { ModalidadJuego } from "@/core/enum/Competicion/ModalidadJuego"

export interface DescripcionModalidadJuego {
    titulo: string,
    descripcion:string[]
}

export const MODALIDADES_JUEGO: Record<ModalidadJuego, DescripcionModalidadJuego> = {
    [ModalidadJuego.PARADO]: {
        titulo: "Parado",
        descripcion: [
            "Se permite parar la bola con los delanteros, pisarla, realizar cambios o movimientos en forma de 'L'.",
        ],
    },
    [ModalidadJuego.MOVIMIENTO]: {
        titulo: "Movimiento",
        descripcion: [
            "No se permite parar la bola con los delanteros.",
            "El disparo a puerta con los delanteros tiene que ser al primer toque y sin arrastrar la bola."
        ],
    },
    [ModalidadJuego.COMBINADO]: {
        titulo: "Combinado",
        descripcion: [
            "Se permite realizar una jugada con los delanteros sin parar la bola, es decir, se debe realizar el cambio o movimiento en forma de 'L' según recibe la bola la delantera.",
        ],
    },
}