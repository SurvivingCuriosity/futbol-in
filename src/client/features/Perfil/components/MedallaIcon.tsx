import { faCheck, faCrown, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { borderClass, darkBgClass, levelClass } from "futbol-in-core/constants";

export interface MedallaIconProps {
  icon: IconDefinition;
  level: number;
  conseguida: boolean;
  showConseguidaIcon?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const MedallaIcon = (props: MedallaIconProps) => {
  const { size = 'md', conseguida, icon, level, showConseguidaIcon = true } = props;

  const sizeClass:Record<string, string> = {
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-10',
    xl: 'size-16',
  }
  const iconSizeClass:Record<string, string> = {
    sm: 'text-xs',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-2xl',
  }

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
        className={`${sizeClass[size]} ${levelClass[level]} ${level === 0 ? 'border-dashed' : 'border'} border aspect-square size-8 flex items-center justify-center rounded-full z-2`}
      >
        {level > 0 && <FontAwesomeIcon icon={icon} className={`${iconSizeClass[size]}`} />}
        {level > 3 && <FontAwesomeIcon icon={faCrown} className={`${iconSizeClass[size]} absolute -top-2`} />}
      </div>
    </div>
  );
};
