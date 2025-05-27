import tsunami_deg from '@/client/shared/assets/img/futbolines/tsunami_deg.jpg'
import infinity_deg from '@/client/shared/assets/img/futbolines/infinity_deg.jpg'
import madera_deg from '@/client/shared/assets/img/futbolines/madera_deg.jpg'
import presas_deg from '@/client/shared/assets/img/futbolines/presas_evo_deg.jpg'
import presasevo_deg from '@/client/shared/assets/img/futbolines/presas_evo_deg.jpg'
import desconocido_deg from '@/client/shared/assets/img/futbolines/desconocido_deg.jpg'

import tsunami from '@/client/shared/assets/img/futbolines/tsunami.jpg'
import infinity from '@/client/shared/assets/img/futbolines/infinity.jpg'
import madera from '@/client/shared/assets/img/futbolines/madera.jpg'
import presas from '@/client/shared/assets/img/futbolines/presas_evo.jpg'
import presasevo from '@/client/shared/assets/img/futbolines/presas_evo.jpg'
import desconocido from '@/client/shared/assets/img/futbolines/desconocido.avif'

import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { StaticImageData } from "next/image";

export const ImagenFutbolinMap: Record<TipoFutbolin, StaticImageData> = {
  [TipoFutbolin.TSUNAMI]: tsunami_deg,
  [TipoFutbolin.PRESAS]: presas_deg,
  [TipoFutbolin.PRESAS_EVO]: presasevo_deg,
  [TipoFutbolin.DESCONOCIDO]: desconocido_deg,
  [TipoFutbolin.MADERA]: madera_deg,
  [TipoFutbolin.INFINITY]: infinity_deg,
  [TipoFutbolin.CUALQUIERA]: desconocido_deg,
  [TipoFutbolin.TECNO]: desconocido_deg,
  [TipoFutbolin.REM]: desconocido_deg,
};


export const ImagenFutbolinMapNoDeg: Record<TipoFutbolin, StaticImageData> = {
  [TipoFutbolin.TSUNAMI]: tsunami,
  [TipoFutbolin.PRESAS]: presas,
  [TipoFutbolin.PRESAS_EVO]: presasevo,
  [TipoFutbolin.DESCONOCIDO]: desconocido,
  [TipoFutbolin.MADERA]: madera,
  [TipoFutbolin.INFINITY]: infinity,
  [TipoFutbolin.CUALQUIERA]: desconocido,
  [TipoFutbolin.TECNO]: desconocido,
  [TipoFutbolin.REM]: desconocido,
};
