import {
  faGun,
  faHandPeace,
  faQuestion,
  faShieldHalved,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Posicion } from "futbol-in-core/enum";

export const ChipPosicionJugador = ({
  posicion,
  className,
  hideLabel=false
}: {
  posicion: Posicion | null | undefined;
  className?: string;
  hideLabel?: boolean;
}) => {
  const colorMap: Record<Posicion, string> = {
    [Posicion.DELANTERO]: "text-red-400 bg-red-500/20",
    [Posicion.PORTERO]: "text-blue-400 bg-blue-500/20",
    [Posicion.POLIVALENTE]: "text-green-400 bg-green-500/20",
    [Posicion.NOT_SET]: "text-neutral-400 bg-neutral-500/20",
  };

  const iconMap: Record<Posicion, IconDefinition> = {
    [Posicion.DELANTERO]: faGun,
    [Posicion.PORTERO]: faShieldHalved,
    [Posicion.POLIVALENTE]: faHandPeace,
    [Posicion.NOT_SET]: faQuestion,
  };
  if (posicion === Posicion.NOT_SET || !posicion) return null;

  return (
    <div
      className={`text-xs ${colorMap[posicion]} h-5 w-fit p-0.5 flex items-center gap-1 px-2 rounded-2xl ${className}`}
    >
      <FontAwesomeIcon icon={iconMap[posicion]} />
      {!hideLabel && <p>{posicion}</p>}
    </div>
  );
};
