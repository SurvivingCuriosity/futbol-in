"use client";

import { AppLogo } from "@/shared/components/AppLogo";
import { faMap, faTrophy, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "futbol-in-ui";
import Link from "next/link";
import { useEffect, useState } from "react";

export const HeroSection = ({ loggedIn }: { loggedIn: boolean }) => {
  return (
    <main className="flex flex-col items-center justify-center gap-4">
      {!loggedIn && (
        <menu className="max-w-screen-xl mx-auto fixed top-0 p-4 flex items-center justify-between w-full">
          <AppLogo />
          <div className="flex items-center gap-2 flex-wrap justify-end">
            <Link href="/login">
              <Button size="sm" label="Iniciar sesión" />
            </Link>
            <Link href="/register">
              <Button size="sm" label="Registrarme" variant="outline" />
            </Link>
          </div>
        </menu>
      )}

      <div className="mt-20 max-w-3xl flex gap-4 flex-col items-stretch justify-center w-full">
        <h1
          style={{ fontSize: "clamp(2.5em, 10vw, 4.5em)", lineHeight: "1em" }}
          className="mb-4 font-extrabold text-balance text-white tracking-tight"
        >
          Encuentra{" "}
          <span className="text-primary">
            <Typewriter />{" "}
          </span>
          cerca de ti
        </h1>
        <p className="text-neutral-400">
          Usa tu ubicación o introduce una ciudad para encontrar futbolines.
          Filtra por marca, cercanía etc.
        </p>

        <div className="z-2 relative">
          <input
            type="text"
            className="bg-neutral-700 rounded-3xl w-full h-12 p-2 relative placeholder:text-neutral-500 border border-neutral-600"
            placeholder="Busca un club..."
          />

          <div className="absolute right-1.5 top-0 h-full flex items-center">
            <button className="bg-primary rounded-3xl h-9/12 text-black font-bold px-4">
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-20 space-y-12 md:space-y-0 space-x-0 md:space-x-4">
        <div className="w-full lg:w-1/3 p-4 max-w-sm text-center flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faMap}
            width={24}
            height={24}
            className="p-4 aspect-square size-5 rounded-full text-primary bg-primary/20"
          />
          <p className="font-bold text-lg">Basado en tu ubicación</p>
          <p className="font-light text-neutral-400">
            Introduce tu localización o activa la ubicación para encontrar los
            futbolines más cercanos
          </p>
        </div>
        <div className="w-full lg:w-1/3 p-4 max-w-sm text-center flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faUsers}
            width={24}
            height={24}
            className="p-4 aspect-square size-5 rounded-full text-primary bg-primary/20"
          />
          <p className="font-bold text-lg">Impulsado por la comunidad</p>
          <p className="font-light text-neutral-400">
            Participa agregando nuevos futbolines y valorando los que otros
            usuarios añadan
          </p>
        </div>
        <div className="w-full lg:w-1/3 p-4 max-w-sm text-center flex flex-col items-center justify-center">
          <FontAwesomeIcon
            icon={faTrophy}
            width={24}
            height={24}
            className="p-4 aspect-square size-5 rounded-full text-primary bg-primary/20"
          />
          <p className="font-bold text-lg">Sistema de logros</p>
          <p className="font-light text-neutral-400">
            Agrega futbolines y valoralos para lograr insignias exclusivas y
            aparecer en el ranking.
          </p>
        </div>
      </div>
    </main>
  );
};

const Typewriter = ({
  words = ["Futbolines", "Dardos", "Billares"],
  typeSpeed = 150, // Velocidad al escribir (ms)
  deleteSpeed = 50, // Velocidad al borrar (ms)
  wordDelay = 3000, // Pausa cuando la palabra se ha escrito (ms)
  deleteDelay = 10, // Pausa cuando queda 1 letra y se cambia de palabra (ms)
}) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeoutId;

    if (!isDeleting) {
      // Escribiendo: se añade un carácter cada vez.
      if (charIndex < currentWord.length) {
        timeoutId = setTimeout(() => {
          setText(currentWord.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }, typeSpeed);
      } else {
        // Palabra completa, espera un poco antes de borrar.
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, wordDelay);
      }
    } else {
      // Borrando: se elimina un carácter, pero siempre se deja al menos 1.
      if (charIndex > 1) {
        timeoutId = setTimeout(() => {
          setText(currentWord.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        }, deleteSpeed);
      } else {
        // Cuando queda 1 carácter, espera y cambia a la siguiente palabra.
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
          setCharIndex(0);
        }, deleteDelay);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [
    charIndex,
    isDeleting,
    wordIndex,
    words,
    typeSpeed,
    deleteSpeed,
    wordDelay,
    deleteDelay,
  ]);

  return <h1 style={{ fontSize: "clamp(1em, 2vw, 3em)", lineHeight: "1em" }}>{text}</h1>;
};

export default Typewriter;
