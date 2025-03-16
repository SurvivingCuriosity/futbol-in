import logo_infinity from "@/client/shared/assets/img/logos_futbolines/infinity.png";
import logo_tsunami from "@/client/shared/assets/img/logos_futbolines/tsunami.png";
import madera from "@/client/shared/assets/img/logos_futbolines/madera.svg";
import generico from "@/client/shared/assets/img/logos_futbolines/generico.png";

import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { StaticImageData } from "next/image";

export const ImagenFutbolinLogoMap: Record<TipoFutbolin, StaticImageData> = {
  [TipoFutbolin.TSUNAMI]: logo_tsunami,
  [TipoFutbolin.PRESAS]: logo_tsunami,
  [TipoFutbolin.PRESAS_EVO]: logo_tsunami,
  [TipoFutbolin.GENERICO]: generico,
  [TipoFutbolin.GENÉRICO_MADERA]: madera,
  [TipoFutbolin.INFINITY]: logo_infinity,
  [TipoFutbolin.CUALQUIERA]: logo_tsunami,
};
