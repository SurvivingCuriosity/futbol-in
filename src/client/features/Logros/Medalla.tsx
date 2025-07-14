import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { borderClass, darkBgClass, levelClass, textColorClass } from "futbol-in-core/constants";

export interface MedallaProps {
  level: number;
  icon: IconDefinition;
  text: string;
  smallText: string;
}

export const Medalla = (props: MedallaProps) => {
  const { level, icon, text, smallText } = props;


  return (
    <div className={`relative h-14 md:border bg-transparent w-full md:p-3 rounded-lg ${borderClass[level]} ${darkBgClass[level]} justify-center flex items-center gap-2 md:gap-4`}>
      <div
        title={text}
        className={`${levelClass[level]} relative border-3 aspect-square size-9 flex items-center justify-center rounded-full p-2 z-2`}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className={`${textColorClass[level]} text-xs hidden md:block`}>{text}</p>
      <p className={`${textColorClass[level]} md:hidden block absolute -top-3`}>{smallText}</p>
    </div>
  );
};
