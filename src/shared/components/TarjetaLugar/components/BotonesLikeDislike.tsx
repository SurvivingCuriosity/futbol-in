import { faSadTear, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const BotonesLikeDislike = () => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <button className="cursor-pointer border w-full rounded-lg p-2 hover:bg-green-500/20 bg-green-500/5 border-green-500 text-green-500">
        <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
        Está ahí (32)
      </button>
      <button className="cursor-pointer border w-full rounded-lg p-2 hover:bg-red-500/20 bg-red-500/5 border-red-500 text-red-500">
        <FontAwesomeIcon icon={faSadTear} className="mr-2" />
        Ya no está (2)
      </button>
    </div>
  );
};
