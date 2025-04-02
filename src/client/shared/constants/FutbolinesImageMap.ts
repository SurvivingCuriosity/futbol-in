import tsunami from '@/client/shared/assets/img/futbolines/tsunami_deg.jpg'
import infinity from '@/client/shared/assets/img/futbolines/infinity_deg.jpg'
import madera from '@/client/shared/assets/img/futbolines/madera_deg.jpg'
import presas from '@/client/shared/assets/img/futbolines/presas_evo_deg.jpg'
import presasevo from '@/client/shared/assets/img/futbolines/presas_evo_deg.jpg'
import desconocido from '@/client/shared/assets/img/futbolines/desconocido_deg.jpg'

import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { StaticImageData } from "next/image";

export const ImagenFutbolinMap: Record<TipoFutbolin, StaticImageData> = {
  [TipoFutbolin.TSUNAMI]: tsunami,
  [TipoFutbolin.PRESAS]: presas,
  [TipoFutbolin.PRESAS_EVO]: presasevo,
  [TipoFutbolin.DESCONOCIDO]: desconocido,
  [TipoFutbolin.MADERA]: madera,
  [TipoFutbolin.INFINITY]: infinity,
  [TipoFutbolin.CUALQUIERA]: desconocido,
};
