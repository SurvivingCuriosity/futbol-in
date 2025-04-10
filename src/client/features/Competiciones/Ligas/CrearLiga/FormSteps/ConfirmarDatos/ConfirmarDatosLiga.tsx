import { LigasClient } from "@/client/shared/client/LigasClient";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { useContext, useMemo } from "react";
import { toast } from "react-toastify";
import { CrearLigaContext } from "../../context/CrearLigaContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol, faGamepad } from "@fortawesome/free-solid-svg-icons";

export const ConfirmarDatosLiga = () => {
  const router = useRouter();
  const { getCompeticionCrear } = useContext(CrearLigaContext);

  const competicionEnCreacion = useMemo(
    () => getCompeticionCrear(),
    [getCompeticionCrear]
  );

  const handleCrearCompeticion = async () => {
    if (competicionEnCreacion === undefined) return;
    const res = await LigasClient.crearLiga(competicionEnCreacion);
    if (res.success) {
      toast.success("Liga creada!");
      router.replace("/competitivo/ligas");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-2xl font-bold text-neutral-300">
        {competicionEnCreacion.nombre}
      </p>
      <p className="text-neutral-300">{competicionEnCreacion.descripcion}</p>

      <div className="flex items-center gap-1 bg-neutral-800 w-fit p-1 text-xs rounded-md text-neutral-400 border border-neutral-600">
        <FontAwesomeIcon icon={faGamepad} />
        Modalidad de juego:
        <p className="">{competicionEnCreacion.modalidadDeJuego}</p>
      </div>

      <div className="flex items-center gap-1 bg-neutral-800 w-fit p-1 text-xs rounded-md text-neutral-400 border border-neutral-600">
        <FontAwesomeIcon icon={faFutbol} />
        Futbolín:
        <p className="">{competicionEnCreacion.tipoDeFutbolin}</p>
      </div>

      <Button label="Crear competicion" onClick={handleCrearCompeticion} />
    </div>
  );
};
