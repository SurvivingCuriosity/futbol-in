import { Colapsable } from "@/packages/components/Colapsable";
import { Progress } from "@/packages/components/Progress";
import { ILogro } from "@/core/types/Logros/Logro";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { MedallaIcon } from "./MedallaIcon";
import { getLevel } from "@/server/services/Logros/GetLevel";
import { getProgress } from "@/server/services/Logros/GetProgress";
import {
  borderClass,
  textColorClass,
} from "@/core/constants/ColoresMedallas";

export interface ProgresoLogroProps {
  logro: ILogro;
  value: number;
}

export const ProgresoLogro = (props: ProgresoLogroProps) => {
  const { logro, value } = props;

  const [open, setIsOpen] = useState(false);

  return (
    <Colapsable
      open={open}
      containerClassName={`flex flex-col border border-neutral-600 rounded-lg p-2 px-4 ${
        borderClass[getLevel(value, logro.steps)]
      }`}
      visibleContent={
        <div className="flex justify-between items-center">
          <span
            className={`absolute ${
              open ? "opacity-0" : "opacity-100"
            } transition-all duration-200`}
          >
            <MedallaIcon
              icon={logro.icon}
              level={getLevel(value, logro.steps)}
              conseguida={value >= logro.steps[0]}
              showConseguidaIcon={false}
            />
          </span>
          <div
            className={`${
              open ? "translate-x-0" : "translate-x-12"
            } transition-transform duration-200`}
          >
            <p
              className={`font-bold ${
                textColorClass[getLevel(value, logro.steps)]
              }`}
            >
              {logro.nombre}
            </p>
            <p className="text-sm font-light text-neutral-400">
              {logro.descripcion} Actual: {value.toString()}
            </p>
          </div>
          <button onClick={() => setIsOpen(!open)}>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`${
                open ? "rotate-180" : ""
              } text-neutral-400 transition-transform duration-200`}
            />
          </button>
        </div>
      }
      extraContent={
        <div className="w-full relative mt-4 p-2">
          <ul className="flex items-center justify-between my-1 mb-3">
            {logro.steps.map((step, index) => (
              <MedallaIcon
                key={step + index}
                conseguida={value >= step}
                level={index + 1}
                icon={logro.icon}
              />
            ))}
          </ul>
          <Progress
            value={getProgress(logro.steps, value)}
            valueDisplay={value.toString()}
            level={getLevel(value, logro.steps)}
          />
        </div>
      }
    />
  );
};
