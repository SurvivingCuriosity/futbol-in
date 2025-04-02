import { z } from "zod";

export const crearEmailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "El correo es obligatorio" })
    .email({ message: "El correo introducido no es válido" }),
});

export type CrearEmailInput = z.infer<typeof crearEmailSchema>;
