import cuadro16 from "@/client/shared/assets/img/torneos/cuadros/16.svg";
import cuadro32 from "@/client/shared/assets/img/torneos/cuadros/32.svg";
import cuadro64 from "@/client/shared/assets/img/torneos/cuadros/64.svg";
import { useState } from "react";

import { Button } from "futbol-in-ui";
import Image, { StaticImageData } from "next/image";
import { FormCantidadParejas } from "../../components/FormCantidadParejas";
import { ConfiguracionTorneo } from "../../types/ConfiguracionTorneo";
import {
  ConfigEnfrentamientos,
  FormEnfrentamientos,
} from "../Enfrentamientos/FormEnfrentamientos";

export const ConfigurarTorneo = ({
  onCompleted,
}: {
  onCompleted: (c: ConfiguracionTorneo) => void;
}) => {
  const [cantidadParejas, setCantidadParejas] = useState<number>(16);

  const [configEnfrentamientos, setConfigEnfrentamientos] =
    useState<ConfigEnfrentamientos>({
      cantidadPartidos: 4,
      golesParaGanar: 10,
      excepcionSemiFinales: null,
      excepcionFinal: null,
    });
  const imagenCuadroMap: Record<number, StaticImageData> = {
    16: cuadro16,
    32: cuadro32,
    64: cuadro64,
  };

  const handleSubmit = () => {
    const configTorneo: ConfiguracionTorneo = {
      cantidadParejas,
      configEnfrentamientos,
    };
    onCompleted(configTorneo);
  };

  return (
    <div>
      <FormCantidadParejas onChange={setCantidadParejas} />
      <FormEnfrentamientos
        onUpdate={setConfigEnfrentamientos}
        esTorneo={true}
      />
      <Image
        src={imagenCuadroMap[cantidadParejas]}
        alt="cuadro"
        width={600}
        height={200}
      />
      <Button label="Siguiente" onClick={handleSubmit} />
    </div>
  );
};
