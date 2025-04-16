import React from "react";

export const SelectLoader = ({ value }: { value: string }) => {
  return (
    <div className="w-full px-4 py-2 text-base h-10 border border-neutral-700 rounded-xl focus:outline-primary cursor-text">
      {value}
    </div>
  );
};
