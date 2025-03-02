import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface MedallaProps {
  level: number;
  icon: IconDefinition;
  text: string;
}

export const Medalla = (props: MedallaProps) => {
  const { level, icon, text } = props;

  const colorClass: Record<number, string> = {
    1: "bg-orange-600",
    2: "bg-neutral-400",
    3: "bg-amber-400",
    4: "bg-sky-400",
    5: "bg-purple-500",
  };

  const levelClass: Record<number, string> = {
    1: "inset-shadow-amber-500 shadow-orange-600 text-orange-600 bg-orange-600/20",
    2: "inset-shadow-neutral-200 shadow-neutral-600 text-neutral-400 bg-neutral-400/20",
    3: "inset-shadow-yellow-300 shadow-amber-600 text-amber-400 bg-amber-400/20",
    4: "inset-shadow-sky-400 shadow-blue-600 text-sky-400 bg-sky-400/20 shadow-xl",
    5: "inset-shadow-pink-400 shadow-purple-600 text-purple-500 bg-purple-500/20 shadow-xl",
  };


  return (
    <div className={`h-16 relative`}>
      <div
        title={text}
        className={`${levelClass[level]} border-3 aspect-square size-10 flex items-center justify-center rounded-full p-2 z-2`}
      >
        <FontAwesomeIcon icon={icon} />
        <div
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 50%, 0 100%)",
          }}
          className={`absolute top-7/12 w-5 h-4 z-1 ${colorClass[level]}`}
        ></div>
      </div>
    </div>
  );
};
