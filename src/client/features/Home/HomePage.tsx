"use client";

import { Header } from "./Header/Header";
import { Matchmaking } from "./Matchmaking/Matchmaking";
import { TablonMensajes } from "./TablonMensajes/TablonMensajes";

const HomePage = () => {
  return (
    <div>
      <Header />
      <div className="h-full w-full flex flex-col md:grid grid-cols-5 grid-rows-5 gap-8 *:h-full md:*:border md:*:p-4 *:border-neutral-800 *:rounded-lg">
        <div className="col-span-3 row-span-3 max-h-[500px]">
          <TablonMensajes />
        </div>
        <div className="col-span-2 row-span-3 col-start-4">
          <Matchmaking />
        </div>
        {/* <div className="col-span-2 row-span-2 row-start-4">
        <ActividadReciente />
        </div>
        <div className="row-span-2 col-start-3 row-start-4">4</div>
        <div className="col-span-2 row-span-2 col-start-4 row-start-4">6</div> */}
      </div>
    </div>
  );
};

export default HomePage;
