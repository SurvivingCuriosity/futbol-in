import { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

import { UserRole } from "@/shared/enum/User/Role";
import { UserStatus } from "@/shared/enum/User/Status";
import { AuthProvider } from "@/shared/enum/User/AuthProvider";

/**
 * Para modificar/añadir campos en la interfaz "User" de NextAuth
 */
declare module "next-auth" {
  // Añadimos los campos que queremos que existan en "session.user"
  interface Session {
    user?: {
      id: string;
      name: string;
      email: string;
      imagen?: string;
      role?: UserRole;
      status?: UserStatus;
      provider?: AuthProvider;
    };
  }

  /**
   * Si quieres que "user" (cuando se usa en la callback `jwt` o donde se reciba)
   * también tenga estos campos, amplía DefaultUser o redefine la interfaz 'User'.
   */
  interface User extends DefaultUser {
    id: string;
    role: UserRole;
    status: UserStatus;
    provider: AuthProvider;
    imagen?: string;
    // Más campos si quieres
  }
}

/**
 * Para modificar/añadir campos en la interfaz "JWT" de NextAuth
 */
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: UserRole;
    status?: UserStatus;
    provider?: AuthProvider;
    imagen?: string;
    // Más campos si quieres
  }
}
