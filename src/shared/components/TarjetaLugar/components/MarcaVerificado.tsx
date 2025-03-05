import { faCertificate, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MarcaVerificado = () => {
  return (
    <div className="absolute -top-1 left-0 z-5 flex items-center gap-1">
      <div className="relative text-2xl size-6">
        <FontAwesomeIcon
          icon={faCertificate}
          className="absolute top-0 left-0 text-sky-500"
        />
        <FontAwesomeIcon
          icon={faCheck}
          className="absolute top-0 left-0 text-white scale-50 ml-0.5"
        />
      </div>
      <p className="text-xs text-sky-500">Verificado hace 7 días</p>
    </div>
  );
};
