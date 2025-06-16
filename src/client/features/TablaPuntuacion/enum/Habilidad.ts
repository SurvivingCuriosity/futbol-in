export type Habilidad = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export const HabilidadLabels: Record<Habilidad, string> = {
    1: "Tengo dificultad para golpear la pelota con el muñeco.",
    2: "Golpeo la bola sin controlar hacia dónde.",
    3: "Golpeo la bola apuntando en una dirección específica, aunque a veces falle",
    4: "Soy capaz de pasar la bola de un jugador a otro antes de disparar.",
    5: "Soy capaz de disparar y realizar pases entre jugadores a una velocidad decente.",
    6: "Realizo cambios de jugador y elásticas para disparar.",
    7: "Puedo jugar como delantero o de portero. Soy capaz de mover la bola de la mano izquierda a la derecha (portero-defensas o medios-delanteros).",
    8: "Buen control de la bola con ambas manos. Capaz de pasarla entre líneas y de realizar la mayoría de jugadas a una velocidad decente.",
    9: "Excelente control de la bola con ambas manos, falla a veces.",
    10: "Control total de la bola, baja frecuencia de fallos.",
};