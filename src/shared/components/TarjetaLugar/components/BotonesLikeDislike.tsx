import { UserRole } from "@/shared/enum/User/Role";
import { useGetLoggedInUserClient } from "@/shared/hooks/useGetLoggedInUserClient";
import { LugarDTO } from "@/shared/models/Lugar/LugarDTO";
import { UserDTO } from "@/shared/models/User/UserDTO";
import {
  faCheckCircle,
  faFaceFrown,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BotonesLikeDislike = ({ lugar }: { lugar: LugarDTO }) => {
  const user = useGetLoggedInUserClient();

  const handleClickVotar = async (type: "up" | "down") => {
    await fetch("/api/votar-lugar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lugarId: lugar.id, vote: type }),
    });
  };

  const handleClickVerificar = async (type: "up" | "down") => {
    await fetch("/api/verificar-lugar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lugarId: lugar.id, vote: type }),
    });
  };

  if (user?.role === UserRole.VERIFICADO) {
    if (!lugar.verificado) {
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

  if (lugar.votes.up.includes((user as UserDTO)?.id)) {
    return (
      <p className="text-xs text-green-600">
        Indicaste que el lugar es correcto
      </p>
    );
  }

  if (lugar.votes.down.includes((user as UserDTO)?.id)) {
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
        {`Está ahí (${lugar.votes.up.length})`}
      </button>
      <button
        onClick={() => handleClickVotar("down")}
        className="cursor-pointer border w-full rounded-lg p-2 hover:bg-red-500/20 bg-red-500/5 border-red-500 text-red-500"
      >
        <FontAwesomeIcon icon={faFaceFrown} className="mr-2" />
        {`Ya no está (${lugar.votes.down.length})`}
      </button>
    </div>
  );
};
