import {
  faArrowDown,
  faArrowUp,
  faEquals,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IndicadorCobertura = ({
  upVotes,
  downVotes,
}: {
  upVotes: number;
  downVotes: number;
}) => {
  const diferencia = upVotes - downVotes;

  const textColor =
    diferencia === 0
      ? "text-amber-400"
      : diferencia > 0
      ? "text-green-300"
      : "text-red-400";

  const icon =
    diferencia === 0 ? faEquals : diferencia > 0 ? faArrowUp : faArrowDown;

  return (
    <div
      className={`top-1 right-1 z-3 bg-black rounded text-xs flex gap-1 items-center ${textColor} p-1`}
    >
      <p>{diferencia}</p>
      <FontAwesomeIcon icon={icon} className="w-2"/>
    </div>
  );
};
