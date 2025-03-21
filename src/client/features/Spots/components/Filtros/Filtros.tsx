import { Switch } from "@/packages/components/Switch";
import { FormField, FormLabel } from "@/packages/components/FormField";
import SelectorTipoFutbolin from "@/client/shared/components/SelectorTipoFutbolin";
import { Window } from "@/packages/components/Window";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "futbol-in-ui";
import { useState } from "react";

export interface ButtonFiltrosProps {
  filtros: Filtros | null;
  onFiltrosChange: (filtros: Filtros | null) => void;
}

export const ButtonFiltros = (props: ButtonFiltrosProps) => {
  const { filtros, onFiltrosChange } = props;

  const [openFiltros, setOpenFiltros] = useState(false);

  return (
    <>
      {openFiltros && (
        <Window onClose={() => setOpenFiltros(false)}>
          <Filtros
            filtros={filtros}
            onFiltrosChange={(f) => {
              onFiltrosChange(f);
              setOpenFiltros(false);
            }}
          />
        </Window>
      )}
      <button
        onClick={() => setOpenFiltros(true)}
        className="flex items-center gap-2 text-primary p-1 px-2 rounded-lg hover:bg-neutral-900"
      >
        <FontAwesomeIcon
          icon={faFilter}
          width={24}
          height={24}
        />
        <span className="hidden md:block">Filtros</span>
      </button>
    </>
  );
};

export interface Filtros {
  tipoFutbolin: TipoFutbolin;
  soloVerificados: boolean;
}

export interface FiltrosPageProps {
  filtros: Filtros | null;
  onFiltrosChange: (filtros: Filtros | null) => void;
}

export const Filtros = (props: FiltrosPageProps) => {
  const { filtros: filtrosProp, onFiltrosChange } = props;

  const DEFAULT_FILTROS: Filtros = {
    tipoFutbolin: TipoFutbolin.CUALQUIERA,
    soloVerificados: false,
  };

  const [filtros, setFiltros] = useState<Filtros>(
    filtrosProp || DEFAULT_FILTROS
  );

  return (
    <div className="h-full w-full max-w-md p-8">
      <p className="text-primary text-4xl font-black mb-4">Filtros</p>
      <FormField>
        <FormLabel>Tipo de futbolin</FormLabel>
        <SelectorTipoFutbolin
          onSelect={(v) => {
            setFiltros((prev) => ({ ...prev, tipoFutbolin: v }));
          }}
          value={filtros?.tipoFutbolin ?? TipoFutbolin.CUALQUIERA}
          incluirOpcionTodos
        />
      </FormField>
      <Switch
        checked={filtros?.soloVerificados ?? false}
        onChange={(v) =>
          setFiltros((prev) => ({ ...prev, soloVerificados: v }))
        }
        label="Solo futbolines verificados"
      />
      <div className="flex items-center gap-2 justify-between mt-8">
        <Button
          onClick={()=>onFiltrosChange(null)}
          variant="outline"
          label="Resetear filtros"
        />
        <Button onClick={()=>onFiltrosChange(filtros)} label="Aplicar filtros" />
      </div>
    </div>
  );
};
