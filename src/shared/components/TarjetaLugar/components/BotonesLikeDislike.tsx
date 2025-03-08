import { SpotsClient } from "@/shared/client/SpotsClient";
import { UserRole } from "@/shared/enum/User/Role";
import { useGetLoggedInUserClient } from "@/shared/hooks/useGetLoggedInUserClient";
import { SpotDTO } from "@/shared/models/Spot/SpotDTO";
import { UserDTO } from "@/shared/models/User/UserDTO";
import {
  faCheckCircle,
  faFaceFrown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BotonesLikeDislike = ({ spot, onChangeSpotCallback }: { spot: SpotDTO, onChangeSpotCallback: (newSpot: SpotDTO) => void }) => {
  const user = useGetLoggedInUserClient();

  const handleClickVotar = async (type: "up" | "down") => {
    const updatedSpot = await SpotsClient.votarSpot({
      spotId: spot.id,
      vote: type,
    })
    onChangeSpotCallback(updatedSpot.spot);
  };

  const handleClickVerificar = async (type: "up" | "down") => {
    const updatedSpot = await SpotsClient.verificarSpot({
      spotId: spot.id,
      vote: type,
    })
    onChangeSpotCallback(updatedSpot.spot);
  };

  if (user?.role === UserRole.VERIFICADO) {
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
