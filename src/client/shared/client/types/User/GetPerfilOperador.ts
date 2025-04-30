import { OperadorDTO } from "@/server/models/User/OperadorDTO";

export type GetPerfilOperadorRequest = string

export interface GetPerfilOperadorResponse {
    success: boolean;
    operador: OperadorDTO;
}