import { OperadorDTO } from "futbol-in-core/types";

export type ActualizarPerfilOperadorRequest = {
    idOperador: string;
    data: Omit<OperadorDTO,'id'>;
}

export interface ActualizarPerfilOperadorResponse {
    success: boolean;
    updatedOperador: OperadorDTO|null;
}