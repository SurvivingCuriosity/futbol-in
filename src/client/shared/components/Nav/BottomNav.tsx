"use client";

import { AgregarBtn } from "./BottomNavItems/AgregarBtn";
import { BuscarBtn } from "./BottomNavItems/BuscarBtn";
import { HomeBtn } from "./BottomNavItems/HomeBtn";
import { PerfilBtn } from "./BottomNavItems/PerfilBtn";
import { RankingBtn } from "./BottomNavItems/RankingBtn";
export const BottomNav = () => {

  return (
    <menu className="md:hidden fixed bottom-0 w-full z-2">
      <div className="w-full h-12 bg-neutral-900/95 flex justify-around items-center relative">
        <HomeBtn />
        <BuscarBtn />
        <AgregarBtn />
        <RankingBtn />
        <PerfilBtn />
      </div>
    </menu>
  );
};
