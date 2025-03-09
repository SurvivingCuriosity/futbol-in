"use client";
import { Window } from "@/shared/components/Window/Window";
import Link from "next/link";
import Confetti from "react-confetti";

const HomePage = () => {
  return (
    <div className="h-full w-full grid grid-cols-5 grid-rows-5 gap-4 *:bg-neutral-900 *:h-full *:rounded-lg *:p-2">
      <Window onClose={() => {}}>
        <Confetti
          colors={["#b7ffa2", "#00FF00", "#5edc58"]}
          width={window.innerWidth}
          height={window.innerHeight}
        />
        <div className="p-8 z-20">
          <h1 className="text-5xl font-black">Enhorabuena!</h1>
          <h2 className="mt-4 text-lg text-neutral-500">
            Has conseguido un nuevo logro!
          </h2>
          <Link href={"/perfil"}>Ver en mi perfil</Link>
        </div>
      </Window>
      <div className="col-span-2 row-span-3 col-start-4">2</div>
      <div className="col-span-2 row-span-2 row-start-4">3</div>
      <div className="row-span-2 col-start-3 row-start-4">4</div>
      <div className="col-span-2 row-span-2 col-start-4 row-start-4">6</div>
    </div>
  );
};

export default HomePage;
