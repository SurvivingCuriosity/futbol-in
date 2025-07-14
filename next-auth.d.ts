import { AuthProvider, UserRole, UserStatus } from "futbol-in-core/enum";
import { UserDTO } from "futbol-in-core/types";
import { DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";



/**
 * Para modificar/añadir campos en la interfaz "User" de NextAuth
 */
declare module "next-auth" {
  // Añadimos los campos que queremos que existan en "session.user"
  interface Session {
    user?: UserDTO;
  }

  /**
   * Si quieres que "user" (cuando se usa en la callback `jwt` o donde se reciba)
   * también tenga estos campos, amplía DefaultUser o redefine la interfaz 'User'.
   */
  interface User extends DefaultUser {
    id: string;
    role: UserRole[];
    provider: AuthProvider;
    status?: UserStatus;
    imagen?: string;
    ciudadActual: string;
  }
}

/**
 * Para modificar/añadir campos en la interfaz "JWT" de NextAuth
 */
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    role?: UserRole[];
    status?: UserStatus;
    provider?: AuthProvider;
    imagen?: string;
    ciudadActual?: string;
    // Más campos si quieres
  }
}
