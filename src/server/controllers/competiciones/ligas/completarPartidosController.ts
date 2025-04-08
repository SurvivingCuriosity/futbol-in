import { CompletarPartidosRequest, CompletarPartidosResponse } from "@/client/shared/client/types/Competiciones/Enfrentamientos/CompletarPartidosRequest";
import { EnfrentamientosService } from "@/server/services/Competiciones/Enfrentamientos/EnfrentamientosService";
import { completarPartidosSchema } from "@/server/validations/competiciones/ligas/completarPartidosValidation";
import { validateLoggedInUser } from "@/server/validations/shared/validateLoggedInUser";

export async function completarPartidosController(
  data: CompletarPartidosRequest
): Promise<CompletarPartidosResponse> {
  // Validar usuario que realiza la peticion
  await validateLoggedInUser();
  
  // Validar request
  const validatedData = completarPartidosSchema.parse(data);

  // Crear la
  await EnfrentamientosService.completarPartidos(validatedData);

  // Respuesta
  const response: CompletarPartidosResponse = {
    success: true,
  };
  return response;
}
