import { esUsuarioVerificado } from "futbol-in-core/helpers";
import { UserDTO } from "futbol-in-core/types";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MarcaVerificado = ({ user }: { user: UserDTO }) => {
  return (
    esUsuarioVerificado(user) && (
        <div className="bg-sky-600 absolute top-0 left-0 size-6 flex items-center justify-center rounded-full border-2 border-white">
          <FontAwesomeIcon icon={faCheck} width={24} height={24} />
        </div>
    )
  );
};
