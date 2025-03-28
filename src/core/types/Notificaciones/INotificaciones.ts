import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";

export interface INotificaciones {
    equiposPendientes: Array<EquipoDTO>;
}