import logo_infinity from "@/client/shared/assets/img/logos_futbolines/infinity.png";
import logo_tsunami from "@/client/shared/assets/img/logos_futbolines/tsunami.png";
import logo_presasevo from "@/client/shared/assets/img/logos_futbolines/presas_evo.png";
import madera from "@/client/shared/assets/img/logos_futbolines/madera.svg";
import generico from "@/client/shared/assets/img/logos_futbolines/generico.png";

import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { StaticImageData } from "next/image";

export const ImagenFutbolinLogoMap: Record<TipoFutbolin, StaticImageData> = {
  [TipoFutbolin.TSUNAMI]: logo_tsunami,
  [TipoFutbolin.PRESAS]: logo_presasevo,
  [TipoFutbolin.PRESAS_EVO]: logo_presasevo,
  [TipoFutbolin.DESCONOCIDO]: generico,
  [TipoFutbolin.MADERA]: madera,
  [TipoFutbolin.INFINITY]: logo_infinity,
  [TipoFutbolin.CUALQUIERA]: logo_tsunami,
};
