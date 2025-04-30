import { OperadorDTO } from "@/server/models/User/OperadorDTO";

export type ActualizarPerfilOperadorRequest = {
    idOperador: string;
    data: Omit<OperadorDTO,'id'>;
}

export interface ActualizarPerfilOperadorResponse {
    success: boolean;
    updatedOperador: OperadorDTO|null;
}