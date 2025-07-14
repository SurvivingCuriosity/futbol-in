

import { TipoFutbolin } from "futbol-in-core/enum";

export const ImagenFutbolinLogoMap: Record<TipoFutbolin, string> = {
  [TipoFutbolin.TSUNAMI]: '/logos/tsunami.png',
  [TipoFutbolin.PRESAS]: '/logos/presas.png',
  [TipoFutbolin.PRESAS_EVO]: '/logos/presas_evo.png',
  [TipoFutbolin.DESCONOCIDO]: '/logos/desconocido.png',
  [TipoFutbolin.MADERA]: '/logos/madera.png',
  [TipoFutbolin.INFINITY]: '/logos/infinity.png',
  [TipoFutbolin.TECNO]: '/logos/tecno.png',
  [TipoFutbolin.REM]: '/logos/rem.webp',
  [TipoFutbolin.CUALQUIERA]: '/logos/desconocido.png',
};