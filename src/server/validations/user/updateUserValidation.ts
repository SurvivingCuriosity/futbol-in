import { AuthProvider, Posicion, UserRole, UserStatus } from "futbol-in-core/enum";
import { z } from "zod";

export const updateUserSchema = z.object({
  // Campos básicos de usuario
  name: z.string().optional(),
  email: z.string().email().optional(),
  imagen: z.string().optional(),
  // Campos de estado, roles y proveedor (si se permiten actualizar)
  status: z.nativeEnum(UserStatus).optional(),
  role: z.array(z.nativeEnum(UserRole)).optional(),
  provider: z.nativeEnum(AuthProvider).optional(),
  // Datos adicionales del perfil
  nombre: z.string().nullable().optional(),
  telefono: z.string().nullable().optional(),
  posicion: z.nativeEnum(Posicion).nullable().optional(),
  // Si se permite actualizar estadísticas (aunque normalmente se gestionan internamente)
  stats: z
    .object({
      addedFutbolines: z.number().optional(),
      votedFutbolines: z.number().optional(),
      verifiedFutbolines: z.number().optional(),
    })
    .optional(),
  // Equipos asociados (Array de strings con los ObjectId)
  equipos: z.array(z.string()).optional(),
});
