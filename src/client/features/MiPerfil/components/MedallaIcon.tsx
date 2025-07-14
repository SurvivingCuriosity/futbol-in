import { faCheck, faQuestion, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { bgClass, borderClass, darkBgClass, levelClass } from "futbol-in-core/constants";

export interface MedallaIconProps {
  icon: IconDefinition;
  level: number;
  conseguida: boolean;
  showConseguidaIcon?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export const MedallaIcon = (props: MedallaIconProps) => {
  const {
    size = "md",
    conseguida,
    icon,
    level,
    showConseguidaIcon = true,
  } = props;

  const sizeClass: Record<string, string> = {
    sm: "size-6",
    md: "size-8",
    lg: "size-10",
    xl: "size-16",
  };
  const iconSizeClass: Record<string, string> = {
    sm: "text-xs",
    md: "text-xs",
    lg: "text-lg",
    xl: "text-2xl",
  };

  return (
    <div className="relative">
      {conseguida && showConseguidaIcon && (
        <FontAwesomeIcon
          icon={faCheck}
          className="p-0.5 absolute -top-1 -right-1 text-xs rounded-full bg-green-400 text-neutral-700 z-9 border size-3"
        />
      )}
      <div
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
        className={`z-1 h-9 w-8 ${bgClass[level] || 'bg-neutral-700'} flex items-center justify-center`}
      >
        <div
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
          className={`${conseguida ? "" : "grayscale-100"}  ${
            borderClass[level] || 'border-neutral-900'
          } ${
            darkBgClass[level] || 'bg-neutral-900'
          } justify-center flex items-center z-2 relative h-7 w-6`}
        >
          <div
            className={`${sizeClass[size]} ${levelClass[level]} ${
              level === 0 ? "border-dashed" : "border"
            } border aspect-square size-8 flex items-center justify-center z-2`}
          >
            {level > 0 && (
              <FontAwesomeIcon
                icon={icon || faQuestion}
                className={`${iconSizeClass[size]}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
