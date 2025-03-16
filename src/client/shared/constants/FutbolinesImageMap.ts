import tsunami from '@/client/shared/assets/img/tsunami_zoompng.png'
import presas from '@/client/shared/assets/img/presas.jpg'
import presasevo from '@/client/shared/assets/img/presasevo.jpg'
import generico from '@/client/shared/assets/img/generico.webp'
import infinity from '@/client/shared/assets/img/infinity.jpg'
import madera from '@/client/shared/assets/img/genericomadera.jpg'

import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { StaticImageData } from "next/image";

export const ImagenFutbolinMap: Record<TipoFutbolin, StaticImageData> = {
  [TipoFutbolin.TSUNAMI]: tsunami,
  [TipoFutbolin.PRESAS]: presas,
  [TipoFutbolin.PRESAS_EVO]: presasevo,
  [TipoFutbolin.GENERICO]: generico,
  [TipoFutbolin.GENÉRICO_MADERA]: madera,
  [TipoFutbolin.INFINITY]: infinity,
  [TipoFutbolin.CUALQUIERA]: generico,
};
