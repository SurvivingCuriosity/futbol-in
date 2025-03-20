import tsunami from '@/client/shared/assets/img/futbolines/tsunami.jpg'
import presas from '@/client/shared/assets/img/futbolines/presas.jpg'
import infinity from '@/client/shared/assets/img/futbolines/infinity.jpg'
import madera from '@/client/shared/assets/img/futbolines/madera.jpg'
import presasevo from '@/client/shared/assets/img/presasevo.jpg'
import desconocido from '@/client/shared/assets/img/futbolines/desconocido.avif'

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
