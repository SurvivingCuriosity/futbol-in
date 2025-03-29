import { Posicion } from "@/core/enum/Posicion/Posicion";
import { AuthProvider } from "@/core/enum/User/AuthProvider";
import { UserRole } from "@/core/enum/User/Role";
import { UserStatus } from "@/core/enum/User/Status";

export interface UserDTO {
  id: string;
  name: string;
  email: string;
  imagen: string;
  status: UserStatus;
  role: UserRole[];
  provider: AuthProvider;
  createdAt?: Date;

  stats: {
    lugaresAgregados: number;
    lugaresRevisados: number;
    lugaresVerificados: number;
  }

  equipos: string[];

  nombre: string|undefined|null;
  telefono: string|undefined|null;
  posicion: Posicion|undefined|null;
}