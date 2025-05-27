export enum TipoFutbolin {
    TSUNAMI = "Tsunami",
    INFINITY = "Infinity",
    PRESAS = "Presas",
    PRESAS_EVO = "Presas Evo",
    DESCONOCIDO = "Desconocido",
    MADERA = "De madera",
    REM = "Rem",
    TECNO = "Tecno",
    CUALQUIERA = "Cualquiera",
}

export const TipoFutbolinNombre: Record<TipoFutbolin, string> = {
    [TipoFutbolin.TSUNAMI]: "Tsunami",
    [TipoFutbolin.INFINITY]: "Infinity",
    [TipoFutbolin.PRESAS]: "Presas 2000",
    [TipoFutbolin.PRESAS_EVO]: "Presas Evo",
    [TipoFutbolin.DESCONOCIDO]: "Desconocido",
    [TipoFutbolin.MADERA]: "De madera",
    [TipoFutbolin.REM]: "Rem",
    [TipoFutbolin.TECNO]: "Tecno",
    [TipoFutbolin.CUALQUIERA]: "Cualquiera",
}   