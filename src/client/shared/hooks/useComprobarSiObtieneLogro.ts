import { TipoLogroEnum } from "futbol-in-core/enum";
import { Logro, LOGROS_DISPONIBLES } from "futbol-in-core/constants";
import { useState } from "react";

export const useComprobarSiObtieneLogro = (tipoLogro: TipoLogroEnum) => {
  const [nuevoLogro, setNuevoLogro] = useState<{
    logro: Logro;
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
