import {
  borderClass,
  darkBgClass,
  levelClass,
} from "@/shared/constants/ColoresMedallas";
import { faCheck, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface MedallaIconProps {
  icon: IconDefinition;
  level: number;
  conseguida: boolean;
  showConseguidaIcon?: boolean;
}

export const MedallaIcon = (props: MedallaIconProps) => {
  const { conseguida, icon, level, showConseguidaIcon = true } = props;

  return (
    <div
      className={`${
        conseguida ? "" : "grayscale-100"
      } relative bg-transparent w-fit rounded-lg ${borderClass[level]} ${
        darkBgClass[level]
      } justify-center flex items-center`}
    >
      {conseguida && showConseguidaIcon && (
        <FontAwesomeIcon
          icon={faCheck}
          className="p-0.5 absolute -top-1 -right-1 text-xs bg-green-400 text-neutral-700 z-3 border rounded-full size-3"
        />
      )}

      <div
        className={`${levelClass[level]} ${level === 0 ? 'border-dashed' : 'border'} border aspect-square size-8 flex items-center justify-center rounded-full z-2`}
      >
        {level > 0 && <FontAwesomeIcon icon={icon} className="text-xs" />}
      </div>
    </div>
  );
};
