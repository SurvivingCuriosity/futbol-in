"use client"

import { use } from "react";
import { DetalleLigaContext } from "../DetalleLiga/DetalleLigaContext";
import { MainInfoLiga } from "../DetalleLiga/MainInfoLiga";

export const DetalleLigaPage = () => {
  const { liga } = use(DetalleLigaContext);

  return (
    <>
      <MainInfoLiga competicion={liga} />
    </>
  );
};
