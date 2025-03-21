import { esUsuarioVerificado } from "@/core/helpers/esUsuarioVerificado";
import { UserDTO } from "@/server/models/User/UserDTO";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MarcaVerificado = ({ user }: { user: UserDTO }) => {
  return (
    esUsuarioVerificado(user) && (
      <span className="relative">
        <div className="bg-sky-600 absolute top-0 right-0 size-6 flex items-center justify-center rounded-full border-2 border-white">
          <FontAwesomeIcon icon={faCheck} width={24} height={24} />
        </div>
      </span>
    )
  );
};
