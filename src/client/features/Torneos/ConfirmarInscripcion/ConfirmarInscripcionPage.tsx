import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { TarjetaEquipo } from "../../MiPerfil/components/TarjetaEquipo";

export interface ConfirmarInscripcionPage {
  equiposUsuario: EquipoDTO[];
  competicion: CompeticionDTO;
}

export const ConfirmarInscripcionPage = (props: ConfirmarInscripcionPage) => {
  

  return <div>Elige un equipo
    <ul>
      {props.equiposUsuario.map((e) => (
        <TarjetaEquipo equipo={e} key={e.id}/>
      ))}
    </ul>
  </div>;
};
