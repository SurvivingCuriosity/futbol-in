"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";

type UseTypewriterOptions = {
  words: string[];
  typeSpeed?: number; // ms entre caracteres al escribir
  deleteSpeed?: number; // ms entre caracteres al borrar
  wordDelay?: number; // ms tras terminar de escribir
  deleteDelay?: number; // ms cuando queda 1 char antes de saltar
  loop?: boolean; // repetir lista
  startIndex?: number; // palabra inicial
};

type Mode = "typing" | "pausing" | "deleting";

function useTypewriter({
  words,
  typeSpeed = 150,
  deleteSpeed = 50,
  wordDelay = 3000,
  deleteDelay = 10,
  loop = true,
  startIndex = 0,
}: UseTypewriterOptions) {
  const wordsRef = useRef(words);
  const [mode, setMode] = useState<Mode>("typing");
  const [wordIndex, setWordIndex] = useState(startIndex % words.length);
  const [charIndex, setCharIndex] = useState(0);
  const [text, setText] = useState("");

  // si cambia `words`, actualiza ref sin re-disparar todo
  useEffect(() => {
    wordsRef.current = words;
  }, [words]);

  useEffect(() => {
    const current = wordsRef.current[wordIndex] ?? "";
    let delay = typeSpeed;
    let to: ReturnType<typeof setTimeout>;

    if (mode === "typing") {
      const next = current.slice(0, charIndex + 1);
      setText(next);
      if (next.length === current.length) {
        setMode("pausing");
        delay = wordDelay;
      } else {
        delay = typeSpeed;
        to = setTimeout(() => setCharIndex((c) => c + 1), delay);
        return () => clearTimeout(to);
      }
    }

    if (mode === "pausing") {
      // tras la pausa, empezamos a borrar
      to = setTimeout(() => setMode("deleting"), wordDelay);
      return () => clearTimeout(to);
    }

    if (mode === "deleting") {
      const nextLen = Math.max(0, charIndex - 1);
      const next = current.slice(0, nextLen);
      setText(next);

      if (nextLen <= 1) {
        // cambio de palabra
        to = setTimeout(() => {
          setCharIndex(0);
          setMode("typing");
          setWordIndex((i) => {
            const nextIdx = i + 1;
            if (nextIdx < wordsRef.current.length) return nextIdx;
            return loop ? 0 : i; // si no hay loop, mantenemos índice
          });
        }, deleteDelay);
      } else {
        delay = deleteSpeed;
        to = setTimeout(() => setCharIndex((c) => c - 1), delay);
      }
      return () => clearTimeout(to);
    }
  }, [
    mode,
    charIndex,
    wordIndex,
    typeSpeed,
    deleteSpeed,
    wordDelay,
    deleteDelay,
    loop,
  ]);

  // estado "completo" si no hay loop y estamos al final
  const done =
    !loop &&
    wordIndex === wordsRef.current.length - 1 &&
    mode === "pausing" &&
    text.length === (wordsRef.current[wordIndex] ?? "").length;

  return { text, wordIndex, mode, done };
}

type TypewriterProps = {
  words?: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  wordDelay?: number;
  deleteDelay?: number;
  loop?: boolean;
  startIndex?: number;
  cursor?: boolean;
  className?: string;
};

export default function Typewriter({
  words = ["Tsunami", "Infinity", "Presas EVO", "Presas 2000"],
  typeSpeed = 150,
  deleteSpeed = 50,
  wordDelay = 3000,
  deleteDelay = 10,
  loop = true,
  startIndex = 0,
  cursor = true,
  className = "",
}: TypewriterProps) {
  const opts = useMemo(
    () => ({
      words,
      typeSpeed,
      deleteSpeed,
      wordDelay,
      deleteDelay,
      loop,
      startIndex,
    }),
    [words, typeSpeed, deleteSpeed, wordDelay, deleteDelay, loop, startIndex]
  );
  const { text } = useTypewriter(opts);

  return (
    <div className={className}>
      <div className="flex flex-col items-start gap-2">
        <p className="text-neutral-200 text-5xl font-bold">Futbolines</p>
        <p
          className="text-5xl font-bold text-accent"
          aria-live="polite"
          aria-atomic
        >
          {text}
          {cursor && (
            <span className="text-white inline-block w-px h-5 align-[-2px] bg-current ml-1 animate-pulse" />
          )}
        </p>
        <p className="text-neutral-200  text-5xl font-bold">cerca de ti</p>
      </div>
    </div>
  );
}
