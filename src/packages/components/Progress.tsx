import React from "react";

export interface ProgressProps {
  value: number;
}

export const Progress = (props: ProgressProps) => {
  const { value } = props;

  return (
    <div className="w-full h-3 rounded-lg bg-neutral-700">
      <div
        style={{ width: `${value}%` }}
        className="rounded-lg bg-primary h-full"
      ></div>
    </div>
  );
};
