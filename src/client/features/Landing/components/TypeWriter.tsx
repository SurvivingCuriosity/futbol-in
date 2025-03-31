"use client"

import { useEffect, useState } from "react";

const Typewriter = ({
    words = ["Tsunami", "Infinity", "Presas EVO", "Presas 2000"],
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
  
    return (
      <h1 style={{ fontSize: "clamp(1em, 2vw, 3em)", lineHeight: "1em" }}>
        {text}
      </h1>
    );
  };
  
  export default Typewriter;