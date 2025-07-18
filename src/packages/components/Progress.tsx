import { bgClass, darkBgClass } from "futbol-in-core/constants";

export interface ProgressProps {
  value: number;
  valueDisplay?: string;
  level: number;
}

export const Progress = (props: ProgressProps) => {
  const { value, valueDisplay, level } = props;

  return (
    <div
      className={`bg-neutral-800 ${darkBgClass[level]} w-full h-4 rounded-lg`}
    >
      <div
        style={{ width: `${value}%` }}
        className={`rounded-lg ${bgClass[level]} h-full relative min-w-4`}
      >
        <p className="text-right text-black pr-1 pt-0.5 text-xs font-bold h-full flex items-center justify-end">
          {valueDisplay}
        </p>
      </div>
    </div>
  );
};
