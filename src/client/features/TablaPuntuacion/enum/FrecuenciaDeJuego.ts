export enum FrecuenciaDeJuego {
    NUNCA ,
    MUY_POCO,
    UNA_VEZ_AL_MES,
    UNA_VEZ_A_LA_SEMANA,
    VARIAS_VECES_A_LA_SEMANA,
    CASI_TODOS_LOS_DIAS,
}

export const FrecuenciaDeJuegoLabels: Record<FrecuenciaDeJuego, string> = {
    [FrecuenciaDeJuego.NUNCA]: "Nunca he jugado al futbolín",
    [FrecuenciaDeJuego.MUY_POCO]: "He jugado muy poco",
    [FrecuenciaDeJuego.UNA_VEZ_AL_MES]: "Juego aprox. una vez al mes",
    [FrecuenciaDeJuego.UNA_VEZ_A_LA_SEMANA]: "Juego aprox. una vez a la semana",
    [FrecuenciaDeJuego.VARIAS_VECES_A_LA_SEMANA]: "Juego varias veces a la semana",
    [FrecuenciaDeJuego.CASI_TODOS_LOS_DIAS]: "Juego Casi todos los días",
};