"use client";
import { UserClient } from "@/client/shared/client/UserClient";
import SearchInputMunicipios from "@/client/shared/components/SearchInputMunicipios";
import SelectorTipoFutbolin from "@/client/shared/components/SelectorTipoFutbolin";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { OperadorDTO } from "@/server/models/User/OperadorDTO";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextInput } from "futbol-in-ui";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  PreviewEnlaces,
  PreviewFutbolinesSeleccionados,
  PreviewTelefonos,
} from "./CrearPerfilOperadorPage";
import { ImagenEditable } from "@/client/shared/components/ImagenEditable";
import { StorageClient } from "@/client/shared/client/StorageClient";
import { getErrorMessage } from "@/packages/utils/getErrorMessage";

export const EditarPerfilOperadorPage = ({
  operador,
}: {
  operador: OperadorDTO;
}) => {
  const [operadorEnCreacion, setOperadorEnCreacion] = useState<OperadorDTO>(
    operador as OperadorDTO
  );

  const [futbolines, setFutbolines] = useState<TipoFutbolin[]>(
    operador.futbolines
  );

  const [enlaces, setEnlaces] = useState<string[]>(operador.enlaces);
  const [enlaceActual, setEnlaceActual] = useState<string>("");

  const [imageUrlLocal, setImageUrlLocal] = useState<string>('');
  const [loadingImagen, setLoadingImagen] = useState(false);

  const [telefonoActual, setTelefonoActual] = useState<{
    persona: string;
    numero: string;
  }>({ persona: "", numero: "" });
  const [telefonos, setTelefonos] = useState<
    Array<{ persona: string; numero: string }>
  >(operador.telefonos);


  useEffect(() => {
    const getImageUrl = async () => {
      const res = await StorageClient.getImageUrl(operador.logo);
      setImageUrlLocal(res);
    }
    getImageUrl();
  }, [operador.logo]);

  const handleSubmit = async () => {
    const operadorCrear: OperadorDTO = {
      ...operadorEnCreacion,
      futbolines,
      enlaces,
      telefonos,
    };
    const res = await UserClient.actualizarPerfilOperador({
      idOperador: operador.id,
      data: operadorCrear,
    });
    if (res.success) {
      toast.success("Perfil actualizado");
    } else {
      toast.error("Upss... error");
    }
  };

  const handleNewImage = async (file: File) => {
        try {
          const nombreImagen = operador.logo
          setLoadingImagen(true);
          // Borramos la actual
          if(nombreImagen){
            await StorageClient.delete(nombreImagen);
          }
    
          // Subimos la nueva
          const path = await StorageClient.upload(file, "user");
    
          if (path) {
            await UserClient.cambiarImagenPerfilOperador(path);
            const newImageUrl = await StorageClient.getImageUrl(path)
            setImageUrlLocal(newImageUrl)
            setLoadingImagen(false);
          }
        } catch (err: unknown) {
          toast.error(getErrorMessage(err));
          setLoadingImagen(false);
        }
  }

  if (!operador) {
    return <p>No se encontró el operador</p>;
  }

  return (
    <GoBackLayout href="/perfil" className="max-w-screen-lg mx-auto">
      <h1 className="text-primary text-2xl font-bold mb-2">
        Editar perfil de operador
      </h1>
      <ImagenEditable 
        url={imageUrlLocal}
        width={150}
        height={150}
        onNewImage={handleNewImage}
        loading={loadingImagen}
      />
      <FormField>
        <FormLabel>Nombre comercial</FormLabel>
        <TextInput
          placeholder="Recreativos Paco y Manolo S.L."
          value={operadorEnCreacion.nombreComercial}
          onChangeText={(text) =>
            setOperadorEnCreacion({
              ...operadorEnCreacion,
              nombreComercial: text,
            })
          }
        />
      </FormField>
      <FormField>
        <FormLabel>Bio</FormLabel>
        <TextInput
          placeholder="Sobre ti..."
          value={operadorEnCreacion.bio}
          onChangeText={(text) =>
            setOperadorEnCreacion({
              ...operadorEnCreacion,
              bio: text,
            })
          }
        />
      </FormField>
      <FormField>
        <FormLabel>Ciudad</FormLabel>
        <SearchInputMunicipios
          onSelect={(text) =>
            setOperadorEnCreacion({
              ...operadorEnCreacion,
              ciudad: text,
            })
          }
        />
      </FormField>
      <FormField>
        <FormLabel>Futbolines que trabajas</FormLabel>
        <SelectorTipoFutbolin
          value={futbolines[futbolines.length - 1]}
          onSelect={(f) => setFutbolines([...futbolines, f])}
        />
        <PreviewFutbolinesSeleccionados
          futbolines={futbolines}
          setFutbolines={setFutbolines}
        />
      </FormField>
      <FormField>
        <FormLabel>Teléfonos</FormLabel>
        <TarjetaMensaje
          variant="info"
          text="El número solo puede contener números y tener 9 caracteres"
        />
        <div className="flex items-center gap-2">
          <TextInput
            value={telefonoActual.persona}
            onChangeText={(t) =>
              setTelefonoActual({ ...telefonoActual, persona: t })
            }
            placeholder="Fernando"
          />
          <TextInput
            value={telefonoActual.numero}
            onChangeText={(n) =>
              setTelefonoActual({ ...telefonoActual, numero: n })
            }
            placeholder="600000000"
          />

          <button
            disabled={
              telefonoActual.persona === "" || telefonoActual.numero === ""
            }
            onClick={() => {
              if (telefonos.some((t) => t.numero === telefonoActual.numero)) {
                toast.error("Ya existe ese número de teléfono");
                return;
              }
              setTelefonos([...telefonos, telefonoActual]);
              setTelefonoActual({ persona: "", numero: "" });
            }}
            className="disabled:bg-neutral-800 border text-neutral-500 size-9 p-1 w-max aspect-square rounded"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <PreviewTelefonos telefonos={telefonos} setTelefonos={setTelefonos} />
      </FormField>
      <FormField>
        <FormLabel>Enlaces</FormLabel>
        <div className="flex items-center gap-2">
          <TextInput
            placeholder="www.pacoymanolo.com"
            value={enlaceActual}
            onChangeText={(e) => setEnlaceActual(e)}
          />
          <button
            disabled={enlaceActual === ""}
            onClick={() => {
              if (enlaces.some((t) => t === enlaceActual)) {
                toast.error("Ya existe ese enlace");
                return;
              }
              setEnlaces([...enlaces, enlaceActual]);
              setEnlaceActual("");
            }}
            className="disabled:bg-neutral-800 border text-neutral-500 size-9 p-1 w-max aspect-square rounded"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <PreviewEnlaces enlaces={enlaces} setEnlaces={setEnlaces} />
      </FormField>
      <Button onClick={handleSubmit} label="Actualizar perfil" />
    </GoBackLayout>
  );
};
