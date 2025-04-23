import {
  faArrowDown,
  faArrowUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IndicadorCobertura = ({
  upVotes,
  downVotes,
}: {
  upVotes: number;
  downVotes: number;
}) => {

  return (
    <div className="w-fit flex items-center gap-2 border border-neutral-800 rounded-lg p-1 text-neutral-600">
      <div
        className={`rounded text-xs flex gap-1 items-center text-green-500 p-1`}
      >
        <p>{upVotes}</p>
        <FontAwesomeIcon icon={faArrowUp} className="w-2" />
      </div>
      <div
        className={`rounded text-xs flex gap-1 items-center text-red-500 p-1`}
      >
        <p>{downVotes}</p>
        <FontAwesomeIcon icon={faArrowDown} className="w-2" />
      </div>
    </div>
  );
};
