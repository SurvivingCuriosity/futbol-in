import { z } from "zod";

export const initAccountSchema = z
  .object({
    username: z
      .string()
      .nonempty({ message: "Introduce un nombre de usuario" })
      .min(3, { message: "El nombre de usuario debe tener al menos 3 caracteres" }),
    password: z
      .string()
      .nonempty({ message: "Introduce una contraseña" })
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
    // Override del mensaje "Required" usando required_error:
    confirmPassword: z
      .string({ required_error: "Confirma tu contraseña" })
      .nonempty({ message: "Confirma tu contraseña" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // Apunta el error al campo confirmPassword
  });

export type InitAccountInput = z.infer<typeof initAccountSchema>;
