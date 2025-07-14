import { OperadorDTO } from "futbol-in-core/types";

export type GetPerfilOperadorRequest = string

export interface GetPerfilOperadorResponse {
    success: boolean;
    operador: OperadorDTO;
}