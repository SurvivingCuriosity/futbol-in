import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface WindowProps {
  onClose: () => void;
  children: React.ReactNode;
}

export const Window = (props: WindowProps) => {
  const { onClose, children } = props;

  return (
    <div className="animate-fade-in flex items-center justify-center fixed top-0 left-0 z-10 w-screen h-dvh bg-neutral-950/95 backdrop-blur-xs">
        <button onClick={onClose} className="p-2 rounded-full absolute top-2 right-2 hover:bg-neutral-900 size-8 flex items-center justify-center">
          <FontAwesomeIcon icon={faXmark} className="text-xl text-red-500" />
        </button>
        {children}
    </div>
  );
};
