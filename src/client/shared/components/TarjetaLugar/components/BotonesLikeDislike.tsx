import { SpotsClient } from "@/client/shared/client/SpotsClient";
import { useGetLoggedInUserClient } from "@/client/shared/hooks/useGetLoggedInUserClient";
import { esUsuarioVerificado } from "futbol-in-core/helpers";
import { SpotDTO } from "futbol-in-core/types";
import { UserDTO } from "futbol-in-core/types";
import {
  faCheckCircle,
  faFaceFrown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TarjetaMensaje } from "../../TarjetaMensaje";

export const BotonesLikeDislike = ({
  spot,
  onChangeSpotCallback,
  agregadoPorUsuario,
}: {
  spot: SpotDTO;
  onChangeSpotCallback: (newSpot: SpotDTO) => void;
  agregadoPorUsuario: boolean;
}) => {
  const user = useGetLoggedInUserClient();
  
  const loHaVotadoPositivamente = spot.votes.up.includes((user as UserDTO)?.id);
  const loHaVotadoNegativamente = spot.votes.down.includes(
    (user as UserDTO)?.id
  );
  const loHaVerificadoPositivamente =
    spot.verificado &&
    spot.verificado.idUser === user?.id &&
    spot.verificado.correcto;
  const loHaVerificadoNegativamente =
    spot.verificado &&
    spot.verificado.idUser === user?.id &&
    spot.verificado.correcto === false;

  const handleClickVotar = async (type: "up" | "down") => {
    const votarSpotResponse = await SpotsClient.votarSpot({
      spotId: spot.id,
      vote: type,
    });
    onChangeSpotCallback(votarSpotResponse.spot);
  };

  const handleClickVerificar = async (type: "up" | "down") => {
    const verificarSpotResponse = await SpotsClient.verificarSpot({
      spotId: spot.id,
      vote: type,
    });
    onChangeSpotCallback(verificarSpotResponse.spot);
  };

  const handleClickDeshacerVoto = async (type: "up" | "down") => {
    const votarSpotResponse = await SpotsClient.deshacerVoto({
      spotId: spot.id,
      vote: type,
    });
    onChangeSpotCallback(votarSpotResponse.spot);
  };

  const handleClickDeshacerVerificacion = async (type: "up" | "down") => {
    const votarSpotResponse = await SpotsClient.deshacerVerificarSpot({
      spotId: spot.id,
      vote: type,
    });
    onChangeSpotCallback(votarSpotResponse.spot);
  };

  if (!user) {
    return (
      <p className="mb-2 text-xs text-neutral-600">
        Inicia sesión para valorar este lugar
      </p>
    );
  }

  if (agregadoPorUsuario) {
    return <p className="text-xs text-neutral-600 my-2">Spot agregado por ti</p>;
  }

  if (esUsuarioVerificado(user)) {
    if (!spot.verificado) {
      return (
        <div className="mb-2 flex items-center gap-2 text-sm">
          <button
            onClick={() => handleClickVerificar("up")}
            className="cursor-pointer border w-full rounded-lg p-2 hover:bg-sky-500/20 bg-sky-900/50 border-sky-500 text-sky-500"
          >
            <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
            Verificar
          </button>
          <button
            onClick={() => handleClickVerificar("down")}
            className="cursor-pointer border w-full rounded-lg p-2 hover:bg-neutral-500/20 bg-neutral-800/80 border-neutral-300 text-neutral-300"
          >
            <FontAwesomeIcon icon={faFaceFrown} className="mr-2" />
            Rechazar
          </button>
        </div>
      );
    } else {
      if (loHaVerificadoPositivamente) {
        return (
          <div className="mb-2 flex items-center gap-2 mt-4">
            <p className="text-sm text-sky-600">Has verificado este futbolín</p>
            <button
              onClick={() => handleClickDeshacerVerificacion("up")}
              className="text-sm text-neutral-500 underline"
            >
              Deshacer
            </button>
          </div>
        );
      }

      if (loHaVerificadoNegativamente) {
        return (
          <div className="mb-2 flex items-center gap-2 mt-4">
            <p className="text-sm text-red-500">
              Indicaste que el lugar no es correcto
            </p>
            <button
              onClick={() => handleClickDeshacerVerificacion("down")}
              className="text-sm text-neutral-500 underline"
            >
              Deshacer
            </button>
          </div>
        );
      }
    }
  }

  if (loHaVotadoPositivamente) {
    return (
      <div className="mb-2 flex items-center gap-2 mt-4">
        <p className="text-sm text-green-600">
          Indicaste que el lugar es correcto
        </p>
        <button
          onClick={() => handleClickDeshacerVoto("up")}
          className="text-sm text-neutral-500 underline"
        >
          Deshacer
        </button>
      </div>
    );
  }

  if (loHaVotadoNegativamente) {
    return (
      <div className="mb-2 flex items-center gap-2 mt-4">
        <p className="text-sm text-red-500">
          Indicaste que el lugar no es correcto
        </p>
        <button
          onClick={() => handleClickDeshacerVoto("down")}
          className="text-sm text-neutral-500 underline"
        >
          Deshacer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <TarjetaMensaje
        variant="info"
        text="Estas votaciones sirven para indicarle al resto de los usuarios que el futbolín se encuentra donde dice o si por el contrario ya ha sido retirado."
      />

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
    </div>
  );
};
