import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface MedallaProps {
  level: number;
  icon: IconDefinition;
  text: string;
  smallText: string;
}

export const Medalla = (props: MedallaProps) => {
  const { level, icon, text, smallText } = props;

  const textColorClass: Record<number, string> = {
    1: "text-orange-600",
    2: "text-neutral-400",
    3: "text-amber-400",
    4: "text-sky-400",
    5: "text-purple-500",
  };

  const darkBgClass: Record<number, string> = {
    1: "md:bg-orange-600/10",
    2: "md:bg-neutral-400/10",
    3: "md:bg-amber-400/10",
    4: "md:bg-sky-400/10",
    5: "md:bg-purple-500/10",
  };

  const borderClass: Record<number, string> = {
    1: "border-orange-600",
    2: "border-neutral-400",
    3: "border-amber-400",
    4: "border-sky-400",
    5: "border-purple-500",
  };

  const levelClass: Record<number, string> = {
    1: "shadow-orange-600 text-orange-600 bg-orange-600/20",
    2: "shadow-neutral-600 text-neutral-400 bg-neutral-400/20",
    3: "shadow-amber-600 text-amber-400 bg-amber-400/20",
    4: "shadow-blue-600 text-sky-400 bg-sky-400/20 shadow-lg",
    5: "shadow-purple-600 text-purple-500 bg-purple-500/20 shadow-lg",
  };


  return (
    <div className={`relative h-16 md:border bg-transparent w-full md:p-3 rounded-lg ${borderClass[level]} ${darkBgClass[level]} justify-center flex items-center gap-2 md:gap-4`}>
      <div
        title={text}
        className={`${levelClass[level]} relative border-3 aspect-square size-10 flex items-center justify-center rounded-full p-2 z-2`}
      >
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className={`${textColorClass[level]} text-xs hidden md:block`}>{text}</p>
      <p className={`${textColorClass[level]} md:hidden block absolute -top-3`}>{smallText}</p>
    </div>
  );
};
