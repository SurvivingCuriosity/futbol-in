import { LOGROS_DISPONIBLES } from "@/core/constants/LogrosDisponibles";
import { TipoLogroEnum } from "@/core/enum/Logros/TipoLogroEnum";
import { ILogro } from "@/core/types/Logros/Logro";
import { useState } from "react";

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
