import { OperadorDTO } from "futbol-in-core/types";

export type CrearPerfilOperadorRequest = Omit<OperadorDTO,'id'>;

export interface CrearPerfilOperadorResponse {
    success: boolean;
    idOperador: string;
}