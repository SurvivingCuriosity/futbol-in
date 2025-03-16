import React from "react";
import "./Loader.css";
import { Button } from "futbol-in-ui";
export const Loader = ({onCancel}:{onCancel:()=>void}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <p className="text-primary">Buscando partido...</p>
      <span className="loader mb-4"></span>
      <Button 
        label="Cancelar"
        size="sm"
        variant="neutral-outline"
        onClick={onCancel}
      />
    </div>
  );
};
