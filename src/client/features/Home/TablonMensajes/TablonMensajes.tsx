import React, { useState } from "react";
import { Mensaje } from "./Mensaje";
import { faArrowRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, TextInput } from "futbol-in-ui";

export interface IMensaje {
  id: number;
  fecha: Date;
  usuario: string;
  mensaje: string;
}

export const TablonMensajes = () => {
  const mockMensajes = [
    {
      id: 1,
      fecha: new Date(),
      usuario: "@juanperez",
      mensaje:
        "¡Hola! ¡Bienvenido a Futbol-In! Aquí encontrarás los mejores futbolines en la ciudad de Tumba, Colombia. ¡Disfruta de la actividad reciente y de las últimas noticias de la comunidad!",
    },
    {
      id: 2,
      fecha: new Date(),
      usuario: "@juanperez",
      mensaje:
        "¡Hola! ¡Bienvenido a Futbol-In! Aquí encontrarás los mejores futbolines en la ciudad de Tumba, Colombia. ¡Disfruta de la actividad reciente y de las últimas noticias de la comunidad!",
    },
    {
      id: 3,
      fecha: new Date(),
      usuario: "@juanperez",
      mensaje:
        "¡Hola! ¡Bienvenido a Futbol-In! Aquí encontrarás los mejores futbolines en la ciudad de Tumba, Colombia. ¡Disfruta de la actividad reciente y de las últimas noticias de la comunidad!",
    },
    {
      id: 4,
      fecha: new Date(),
      usuario: "@juanperez",
      mensaje:
        "¡Hola! ¡Bienvenido a Futbol-In! Aquí encontrarás los mejores futbolines en la ciudad de Tumba, Colombia. ¡Disfruta de la actividad reciente y de las últimas noticias de la comunidad!",
    },
    {
      id: 5,
      fecha: new Date(),
      usuario: "@juanperez",
      mensaje:
        "¡Hola! ¡Bienvenido a Futbol-In! Aquí encontrarás los mejores futbolines en la ciudad de Tumba, Colombia. ¡Disfruta de la actividad reciente y de las últimas noticias de la comunidad!",
    },
  ];


  const [mensaje, setMensaje] = useState("");
  
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <p className="text-primary md:text-lg text-2xl font-black">Tablón de anuncios</p>
        <button>
          <FontAwesomeIcon icon={faArrowRotateRight} className="w-6 h-6" />
        </button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <TextInput placeholder="Escribe aquí tu mensaje..." value={mensaje} onChangeText={setMensaje} />
        <span>
          <Button label="Enviar" disabled={!mensaje} />
        </span>
      </div>
      <ul className="flex flex-col gap-4 overflow-y-scroll h-full max-h-[300px]">
        {mockMensajes.map((mensaje) => (
          <Mensaje key={mensaje.id} mensaje={mensaje} />
        ))}
      </ul>
    </>
  );
};
