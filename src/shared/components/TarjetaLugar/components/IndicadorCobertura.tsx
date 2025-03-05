import { faSignal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const IndicadorCobertura = () => {
  return (
    <div className="absolute top-0.5 right-0.5 z-3 bg-black rounded text-xs flex gap-1 items-center text-green-300 p-1">
      <p>23</p>
      <FontAwesomeIcon icon={faSignal} />
    </div>
  );
};
