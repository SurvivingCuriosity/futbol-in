

import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";

export const ImagenFutbolinLogoMap: Record<TipoFutbolin, string> = {
  [TipoFutbolin.TSUNAMI]: '/logos/tsunami.png',
  [TipoFutbolin.PRESAS]: '/logos/presas.png',
  [TipoFutbolin.PRESAS_EVO]: '/logos/presas_evo.png',
  [TipoFutbolin.DESCONOCIDO]: '/logos/desconocido.png',
  [TipoFutbolin.MADERA]: '/logos/madera.png',
  [TipoFutbolin.INFINITY]: '/logos/infinity.png',
  [TipoFutbolin.CUALQUIERA]: '/logos/desconocido.png',
};