import { SpotsClient } from "@/client/shared/client/SpotsClient";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { esUsuarioVerificado } from "@/core/helpers/esUsuarioVerificado";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { UserDTO } from "@/server/models/User/UserDTO";
import {
  faCheckCircle,
  faFaceFrown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BotonesLikeDislike = ({ spot, onChangeSpotCallback, agregadoPorUsuario }: { spot: SpotDTO, onChangeSpotCallback: (newSpot: SpotDTO) => void, agregadoPorUsuario: boolean }) => {
  const user = useGetLoggedInUserClient();

  const handleClickVotar = async (type: "up" | "down") => {
    const votarSpotResponse = await SpotsClient.votarSpot({
      spotId: spot.id,
      vote: type,
    })
    onChangeSpotCallback(votarSpotResponse.spot);
  };

  const handleClickVerificar = async (type: "up" | "down") => {
    const verificarSpotResponse = await SpotsClient.verificarSpot({
      spotId: spot.id,
      vote: type,
    })
    onChangeSpotCallback(verificarSpotResponse.spot);
  };

  if(!user){
    return <p className="text-xs text-neutral-600">Inicia sesión para valorar este lugar</p>
  }

  if(agregadoPorUsuario){
    return <p className="text-xs text-neutral-600">Spot agregado por ti</p>
  }

  if (esUsuarioVerificado(user)) {
    if (!spot.verificado) {
      return (
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => handleClickVerificar("up")}
            className="cursor-pointer border w-full rounded-lg p-2 hover:bg-sky-500/20 bg-sky-500/5 border-sky-500 text-sky-500"
          >
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Verificar
          </button>
          <button
            onClick={() => handleClickVerificar("down")}
            className="cursor-pointer border w-full rounded-lg p-2 hover:bg-neutral-500/20 bg-neutral-500/5 border-neutral-400 text-neutral-400"
          >
            <FontAwesomeIcon icon={faFaceFrown} className="mr-2" />
            Rechazar
          </button>
        </div>
      );
    } else return null
  }

  if (spot.votes.up.includes((user as UserDTO)?.id)) {
    return (
      <p className="text-xs text-green-600">
        Indicaste que el lugar es correcto
      </p>
    );
  }

  if (spot.votes.down.includes((user as UserDTO)?.id)) {
    return (
      <p className="text-xs text-red-500">
        Indicaste que el lugar no es correcto
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <button
        onClick={() => handleClickVotar("up")}
        className="cursor-pointer border w-full rounded-lg p-2 hover:bg-green-500/20 bg-green-500/5 border-green-500 text-green-500"
      >
        <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
        {`Está ahí (${spot.votes.up.length})`}
      </button>
      <button
        onClick={() => handleClickVotar("down")}
        className="cursor-pointer border w-full rounded-lg p-2 hover:bg-neutral-500/20 bg-neutral-500/5 border-neutral-400 text-neutral-400"
      >
        <FontAwesomeIcon icon={faFaceFrown} className="mr-2" />
        {`Ya no está (${spot.votes.down.length})`}
      </button>
    </div>
  );
};
