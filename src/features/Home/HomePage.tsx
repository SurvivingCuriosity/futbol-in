"use client";
import { Window } from "@/shared/components/Window/Window";
import Link from "next/link";
import { useState } from "react";
import Confetti from "react-confetti";
import { MedallaIcon } from "../MiPerfil/components/MedallaIcon";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

const HomePage = () => {
  const [mockMostrarConfetti, setMockMostrarConfetti] = useState(true);

  return (
    <div className="h-full w-full grid grid-cols-5 grid-rows-5 gap-4 *:bg-neutral-900 *:h-full *:rounded-lg *:p-2">
      {mockMostrarConfetti && (
        <Window
          onClose={() => {
            setMockMostrarConfetti(false);
          }}
        >
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
          />
          <div className="p-8 z-20 bg-neutral-950 rounded-2xl">
            <h1 className="text-3xl lg:text-5xl font-black">Enhorabuena!</h1>
            <h2 className="mt-4 lg:text-lg text-neutral-500">
              Has conseguido un nuevo logro!
            </h2>
            <div className="scale-125 m-10 mx-auto flex flex-col gap-2 items-center justify-center border w-fit p-4 rounded-xl border-neutral-700 z-20 bg-neutral-900/50">
              <MedallaIcon
                conseguida={true}
                icon={faTrophy}
                level={5}
                showConseguidaIcon={false}
                size="xl"
              />
              <p className="text-lg">Explorador</p>
              <p className="text-neutral-400">Añade 50 futbolines</p>
            <Link href={"/perfil"} className="bg-neutral-800 p-2 rounded-lg">Ver en mi perfil</Link>
            </div>
          </div>
        </Window>
      )}
      <div className="col-span-2 row-span-3 col-start-4">2</div>
      <div className="col-span-2 row-span-2 row-start-4">3</div>
      <div className="row-span-2 col-start-3 row-start-4">4</div>
      <div className="col-span-2 row-span-2 col-start-4 row-start-4">6</div>
    </div>
  );
};

export default HomePage;
