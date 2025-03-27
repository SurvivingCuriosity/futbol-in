"use client";

import { EquiposClient } from "@/client/shared/client/EquiposClient";
import { ImagenEditable } from "@/client/shared/components/ImagenEditable";
import { UserOption } from "@/client/shared/components/SearchInputUser";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { getErrorMessage } from "@/packages/utils/getErrorMessage";
import { Button, TextInput } from "futbol-in-ui";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export const CrearEquipoPage = () => {
  const router = useRouter();

  const [nombreEquipo, setNombreEquipo] = useState("");
  const [imagenEquipo, setImagenEquipo] = useState("");

  const [uploadedFile, setUploadedFile] = useState<File | undefined>();

  const [companero, setCompanero] = useState<{
    nombre: string;
    usuario: string | null;
  }>({
    nombre: "",
    usuario: null,
  });

  const [companeroTieneCuenta, setCompaneroTieneCuenta] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserOption | undefined>(
    undefined
  );

  const handleCrearEquipo = async () => {
    subirImagenEquipo().then((newUrl) => {
      setUploadedFile(undefined);
      EquiposClient.crearEquipo({
        imagenEquipo: newUrl,
        nombreEquipo: nombreEquipo,
        jugadores: [companero],
      })
        .then((res) => {
          if (res.success) {
            toast.success("Equipo creado");
            router.back();
          } else {
            toast.error("Hubo algun error al crear el equipo");
          }
        })
        .catch((err) => {
          toast.error("Hubo un error al crear el equipo" + getErrorMessage(err));
        });

    });
    
  };

  const subirImagenEquipo = async (): Promise<string> => {
    if (!uploadedFile) return '';
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("type", "user");

    const res = await fetch("/api/storage/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.path
  };

  const handleUploadImagen = (file: File) => {
    setImagenEquipo(URL.createObjectURL(file));
    setUploadedFile(file);
  };

  const handleSelectCompañero = (selected: UserOption) => {
    setSelectedUser(selected);
    setCompanero({
      nombre: selected.label,
      usuario: selected.data.id,
    });
  };

  const SearchInputUser = dynamic(
    () => import("@/client/shared/components/SearchInputUser"),
    { ssr: false }
  );

  return (
    <GoBackLayout href="/perfil" className="max-w-lg mx-auto">
      <h1 className="text-2xl font-extrabold text-primary mb-2">
        Crear equipo
      </h1>

      <div className="my-4 flex justify-center">
        <ImagenEditable
          url={imagenEquipo}
          onNewImage={handleUploadImagen}
          width={100}
          height={100}
        />
      </div>

      <FormField>
        <FormLabel>Nombre del equipo</FormLabel>
        <TextInput
          value={nombreEquipo}
          onChangeText={setNombreEquipo}
          placeholder="Los makinas"
        />
      </FormField>

      <div className="my-4">
        <label className="mb-2 flex items-center gap-2">
          <input
            type="checkbox"
            checked={companeroTieneCuenta}
            onChange={(e) => {
              setSelectedUser(undefined);
              setCompanero({
                nombre: "",
                usuario: null,
              });
              setCompaneroTieneCuenta(e.target.checked);
            }}
            className="accent-primary size-4"
          />
          Mi compañero tiene cuenta Futbol-In
        </label>
        {!companeroTieneCuenta && (
          <TarjetaMensaje
            variant="info"
            text="Podrás asociar una cuenta a tu compañero en cualquier momento"
          />
        )}
      </div>

      {companeroTieneCuenta ? (
        <FormField>
          <FormLabel>Compañero</FormLabel>
          <SearchInputUser
            onSelect={handleSelectCompañero}
            value={selectedUser}
          />
        </FormField>
      ) : (
        <FormField>
          <FormLabel>Nombre compañero</FormLabel>
          <TextInput
            value={companero.nombre}
            onChangeText={(text) =>
              setCompanero({ ...companero, nombre: text })
            }
            placeholder="Juan"
          />
        </FormField>
      )}

      <Button
        label="Crear equipo"
        onClick={handleCrearEquipo}
        disabled={nombreEquipo === "" || companero.nombre === ""}
      />
    </GoBackLayout>
  );
};
