import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export interface ContainerAjustesProps {
  titulo: string;
  icono: IconDefinition;
  children: React.ReactNode;
}

export const ContainerAjustes = (props: ContainerAjustesProps) => {
  const { titulo, icono, children } = props;

  return (
    <section className="bg-neutral-900 p-2 rounded-lg">
      <span className="flex items-center gap-2 p-2">
        <FontAwesomeIcon icon={icono} />
          <p>{titulo}</p>
      </span>
      <div className="p-4">
        {children}
      </div>
    </section>
  );
};
