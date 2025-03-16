import { dateToTimeAgo } from "@/packages/utils/dateToTimeAgo";
import {
  faCertificate,
  faCheck,
  faThumbsDown
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MarcaVerificado = ({
  fecha,
  correcto,
}: {
  fecha: Date;
  correcto: boolean;
}) => {
  const mensaje = dateToTimeAgo(fecha);

  const textColor = correcto ? "text-green-500" : "text-red-500";
  const icon = correcto ? faCheck : faThumbsDown;

  return (
    <div className="z-5 flex items-center gap-1 mt-4">
      <div className="relative text-2xl size-6">
        <FontAwesomeIcon
          icon={faCertificate}
          className={`absolute top-0 left-0 ${textColor}`}
        />
        <FontAwesomeIcon
          icon={icon}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-white scale-50"
        />
      </div>
      <p className={`text-xs ${textColor}`}>Verificado {mensaje}</p>
    </div>
  );
};
