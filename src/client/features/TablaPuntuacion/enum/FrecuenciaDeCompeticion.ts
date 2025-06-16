export enum FrecuenciaDeCompeticion {
    NO_COMPITO,
    COMPITO_LIGAS_TORNEOS_CIUDAD,
    COMPITO_LIGAS_TORNEOS_ALREDEDOR,
    COMPITO_LIGAS_TORNEOS_NACIONALES,
}

export const FrecuenciaDeCompeticionLabels: Record<FrecuenciaDeCompeticion, string> = {
    [FrecuenciaDeCompeticion.NO_COMPITO]: "No compito",
    [FrecuenciaDeCompeticion.COMPITO_LIGAS_TORNEOS_CIUDAD]: "Participo en ligas o torneos de mi barrio o ciudad",
    [FrecuenciaDeCompeticion.COMPITO_LIGAS_TORNEOS_ALREDEDOR]: "Participo en torneos de mi alrededor",
    [FrecuenciaDeCompeticion.COMPITO_LIGAS_TORNEOS_NACIONALES]: "Participo en torneos nacionales",
};