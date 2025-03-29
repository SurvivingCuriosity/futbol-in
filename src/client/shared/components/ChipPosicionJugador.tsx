import { Posicion } from "@/core/enum/Posicion/Posicion";
import {
  faGun,
  faHandPeace,
  faShieldHalved,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PosicionConValue = Exclude<Posicion, Posicion.NOT_SET>;

export const ChipPosicionJugador = ({ posicion }: { posicion: PosicionConValue }) => {
  const colorMap: Record<PosicionConValue, string> = {
    [Posicion.DELANTERO]: "text-red-400 bg-red-500/20",
    [Posicion.PORTERO]: "text-blue-400 bg-blue-500/20",
    [Posicion.POLIVALENTE]: "text-green-400 bg-green-500/20",
  };

  const iconMap: Record<PosicionConValue, IconDefinition> = {
    [Posicion.DELANTERO]: faGun,
    [Posicion.PORTERO]: faShieldHalved,
    [Posicion.POLIVALENTE]: faHandPeace,
  };

  return (
    <div
      className={`text-xs ${colorMap[posicion]}  w-fit p-0.5 flex items-center gap-1 px-2 rounded-2xl`}
    >
      <FontAwesomeIcon icon={iconMap[posicion]} />
      {posicion}
    </div>
  );
};
