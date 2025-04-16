import { OperadorDTO } from "@/server/models/User/OperadorDTO";

export type CrearPerfilOperadorRequest = Omit<OperadorDTO,'id'>;

export interface CrearPerfilOperadorResponse {
    success: boolean;
    idOperador: string;
}