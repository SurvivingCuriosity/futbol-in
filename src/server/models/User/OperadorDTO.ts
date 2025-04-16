import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";

export interface OperadorDTO {
  id:string;
  usuarios: string[];
  bio: string;
  enlaces: string[];
  nombreComercial: string;
  telefonos: Array<{persona:string, numero:string}>;
  ciudad: string;
  futbolines: TipoFutbolin[];
  logo: string;
  fondo: string;
}