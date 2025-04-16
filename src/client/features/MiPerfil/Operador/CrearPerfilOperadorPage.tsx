"use client";
import { UserClient } from "@/client/shared/client/UserClient";
import SearchInputMunicipios from "@/client/shared/components/SearchInputMunicipios";
import SelectorTipoFutbolin from "@/client/shared/components/SelectorTipoFutbolin";
import { TarjetaMensaje } from "@/client/shared/components/TarjetaMensaje";
import { ImagenFutbolinLogoMap } from "@/client/shared/constants/FutbolinesLogoImageMap";
import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { TipoFutbolin } from "@/core/enum/Futbolin/TipoFutbolin";
import { FormField, FormLabel } from "@/packages/components/FormField";
import { OperadorDTO } from "@/server/models/User/OperadorDTO";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextInput } from "futbol-in-ui";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export const CrearPerfilOperadorPage = () => {
  const [operadorEnCreacion, setOperadorEnCreacion] = useState<Omit<OperadorDTO,'id'>>({
    nombreComercial: "",
    ciudad: "",
    bio: "",
    enlaces: [],
    futbolines: [],
    telefonos: [],
    usuarios: [],
    fondo: "",
    logo: "",
  });

  const [futbolines, setFutbolines] = useState<TipoFutbolin[]>([]);

  const [enlaces, setEnlaces] = useState<string[]>([]);
  const [enlaceActual, setEnlaceActual] = useState<string>("");

  const [telefonoActual, setTelefonoActual] = useState<{
    persona: string;
    numero: string;
  }>({ persona: "", numero: "" });
  const [telefonos, setTelefonos] = useState<
    Array<{ persona: string; numero: string }>
  >([]);

  const handleSubmit = async () => {
    const operadorCrear:Omit<OperadorDTO,'id'> = {
        ...operadorEnCreacion,
        futbolines,
        enlaces,
        telefonos
    }
    const res = await UserClient.crearPerfilOperador(operadorCrear)
    if(res.success){
        toast.success('Perfil creado')
    } else {
        toast.error('Upss... error')
    }
  }

  return (
    <GoBackLayout href="/perfil" className="max-w-screen-lg mx-auto">
      <h1 className="text-primary text-2xl font-bold mb-2">
        Crear perfil de operador
      </h1>
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
        <PreviewFutbolinesSeleccionados
          futbolines={futbolines}
          setFutbolines={setFutbolines}
        />
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
      <Button 
        onClick={handleSubmit}
        label="Crear perfil"
      />
    </GoBackLayout>
  );
};

const PreviewFutbolinesSeleccionados = ({
  futbolines,
  setFutbolines,
}: {
  futbolines: TipoFutbolin[];
  setFutbolines: (futbolines: TipoFutbolin[]) => void;
}) => {
  const handleEliminarFutbolin = (futbolinEliminar: TipoFutbolin) => {
    const nuevosFutbolines = futbolines.filter((f) => f !== futbolinEliminar);
    setFutbolines(nuevosFutbolines);
  };

  if (futbolines.length === 0) return null;

  return (
    <ul className="flex items-center gap-2 my-2 flex-wrap">
      {futbolines.map((f) => (
        <div
          key={f}
          className="flex items-center gap-2 bg-neutral-800 px-2 rounded-md"
        >
          <Image
            src={ImagenFutbolinLogoMap[f]}
            width={25}
            height={25}
            alt="Logo futbolin"
          />
          <p>{f}</p>
          <button
            aria-label="Eliminar futbolín"
            onClick={() => handleEliminarFutbolin(f)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ))}
    </ul>
  );
};

const PreviewTelefonos = ({
  telefonos,
  setTelefonos,
}: {
  telefonos: Array<{ persona: string; numero: string }>;
  setTelefonos: (telefonos: Array<{ persona: string; numero: string }>) => void;
}) => {
  const handleEliminarTelefono = (telefonoEliminar: string) => {
    const nuevosTelefonos = telefonos.filter(
      (t) => t.numero !== telefonoEliminar
    );
    setTelefonos(nuevosTelefonos);
  };

  if (telefonos.length === 0) return null;

  return (
    <ul className="flex items-center gap-2 my-2 flex-wrap">
      {telefonos.map((t) => (
        <div
          key={t.numero}
          className="flex items-center gap-2 bg-neutral-800 px-2 rounded-md"
        >
          <p>{t.persona}</p>
          <p>{t.numero}</p>
          <button
            aria-label="Eliminar telefono"
            onClick={() => handleEliminarTelefono(t.numero)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ))}
    </ul>
  );
};

const PreviewEnlaces = ({
  enlaces,
  setEnlaces,
}: {
  enlaces: string[];
  setEnlaces: (enlaces: string[]) => void;
}) => {
  const handleEliminarEnlace = (enlaceEliminar: string) => {
    const nuevosTelefonos = enlaces.filter((e) => e !== enlaceEliminar);
    setEnlaces(nuevosTelefonos);
  };

  if (enlaces.length === 0) return null;

  return (
    <ul className="flex items-center gap-2 my-2 flex-wrap">
      {enlaces.map((e) => (
        <div
          key={e}
          className="flex items-center gap-2 bg-neutral-800 px-2 rounded-md"
        >
          <p>{e}</p>
          <button
            aria-label="Eliminar enlace"
            onClick={() => handleEliminarEnlace(e)}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
      ))}
    </ul>
  );
};
