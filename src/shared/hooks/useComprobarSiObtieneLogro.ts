import { useState } from "react";
import { LOGROS_DISPONIBLES } from "../constants/LogrosDisponibles";
import { TipoLogroEnum } from "../enum/Logros/TipoLogroEnum";
import { ILogro } from "../types/Logros/Logro";

export const useComprobarSiObtieneLogro = (tipoLogro: TipoLogroEnum) => {
  const [nuevoLogro, setNuevoLogro] = useState<{
    logro: ILogro;
    value: number;
  } | null>(null);

  function comprobarSiGanaMedalla(nuevoValor: number) {
    const logro = LOGROS_DISPONIBLES[tipoLogro];

    if (logro.steps.includes(nuevoValor)) {
      setNuevoLogro({ logro, value: nuevoValor });
    } else {
      setNuevoLogro(null);
    }
  }

  return {
    nuevoLogro,
    comprobarSiGanaMedalla,
  };
};
