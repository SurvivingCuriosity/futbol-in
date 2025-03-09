import React from "react";
import { Filtros } from "./Filtros";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { TipoFutbolin } from "@/shared/enum/Futbolin/TipoFutbolin";

export interface PreviewFiltrosProps {
  filtros: Filtros | null;
  onFiltrosChange: (filtros: Filtros | null) => void;
}

export const PreviewFiltros = (props: PreviewFiltrosProps) => {
  const { filtros, onFiltrosChange } = props;

  if (!filtros) return null;

  return (
    <div className="flex items-center gap-2 ml-2">
      {filtros?.soloVerificados === true && (
        <ItemPreviewFiltro
          label="Solo verificados"
          onDelete={() => {
            onFiltrosChange({ ...filtros, soloVerificados: false });
          }}
        />
      )}
      {filtros?.tipoFutbolin !== TipoFutbolin.CUALQUIERA && (
        <ItemPreviewFiltro
          label={filtros?.tipoFutbolin || ''}
          onDelete={() => {
            onFiltrosChange({ ...filtros, tipoFutbolin: TipoFutbolin.CUALQUIERA });
          }}
        />
      )}
    </div>
  );
};

export const ItemPreviewFiltro = ({
  label,
  onDelete,
}: {
  label: string;
  onDelete: () => void;
}) => {
  return (
    <div className="p-1 px-2 pl-3 rounded-xl bg-neutral-800 text-neutral-300 flex items-center gap-2 text-sm">
      <p>{label}</p>
      <button onClick={onDelete} className="hover:bg-neutral-700 size-5 flex rounded-full items-center justify-center">
        <FontAwesomeIcon icon={faXmark} />
      </button>
    </div>
  );
};
