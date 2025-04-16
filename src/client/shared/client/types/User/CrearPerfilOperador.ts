import { OperadorDTO } from "@/server/models/User/OperadorDTO";

export type CrearPerfilOperadorRequest = OperadorDTO;

export interface CrearPerfilOperadorResponse {
    success: boolean;
    idOperador: string;
}