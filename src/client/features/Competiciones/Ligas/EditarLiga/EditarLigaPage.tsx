"use client";

import { LigasClient } from "@/client/shared/client/LigasClient";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";
import { Button, TextInput } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DetalleLigaContext } from "../DetalleLiga/DetalleLigaContext";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";

export const EditarLigaPage = () => {
  const { liga } = use(DetalleLigaContext);

  const router = useRouter();

  const [ligaEditar, setLigaEditar] = useState<LigaDTO>(liga);
  const [hayCambios, setHayCambios] = useState(false);

  useEffect(() => {
    setHayCambios(JSON.stringify(ligaEditar) !== JSON.stringify(liga));
  }, [liga, ligaEditar]);

  const updateField = (field: keyof LigaDTO, value: string | number) => {
    setLigaEditar((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    const res = await LigasClient.actualizarLiga({
      idCompeticion: liga.id,
      data: ligaEditar,
    });
    if (res.success) {
      toast.success(
        "Liga actualizada, actualiza la página para ver los cambios!"
      );
      router.back();
    }
  };

  return (
    <div>
      <div className="my-4">
        <TarjetaMensaje
          text="Ciertos campos de la liga no se pueden modificar. Si quieres modificarlos forzosamente manda un correo a soporte@futbolin.app"
          variant="info"
        />
      </div>
      <FormField>
        <FormLabel>Nombre</FormLabel>
        <TextInput
          value={ligaEditar.nombre}
          onChangeText={(text) => updateField("nombre", text)}
        />
      </FormField>
      <FormField>
        <FormLabel>Descripción</FormLabel>
        <TextInput
          value={ligaEditar.descripcion}
          onChangeText={(text) => updateField("descripcion", text)}
        />
      </FormField>
      <Button label="Guardar" onClick={handleSubmit} disabled={!hayCambios} />
    </div>
  );
};
