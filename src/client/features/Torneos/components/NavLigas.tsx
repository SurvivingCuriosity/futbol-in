"use client";
import {
  faInfoCircle,
  faList12,
  faPeopleGroup,
  faUser,
  faUserPlus,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NavBase } from "./NavBase";

export const NavLigas = ({
  idCompeticion,
  estaInscrito,
}: {
  idCompeticion: string;
  estaInscrito: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const [activeTabId, setActiveTabId] = useState(getTabIdFromPath(pathname));

  const detalles = { id: 0, label: "Información", icon: faInfoCircle };
  const equipos = { id: 1, label: "Equipos", icon: faPeopleGroup };
  const clasificacion = { id: 2, label: "Clasific.", icon: faList12 };
  const partidos = { id: 3, label: "Partidos", icon: faUser };
  const inscribirme = { id: 4, label: "Entrar", icon: faUserPlus };

  const opciones = [
    detalles,
    equipos,
    clasificacion,
    estaInscrito ? partidos : inscribirme,
  ];

  const linkMap: Record<number, string> = {
    0: `/competitivo/competiciones/${idCompeticion}`,
    1: `/competitivo/competiciones/${idCompeticion}/equipos`,
    2: `/competitivo/competiciones/${idCompeticion}/clasificacion`,
    3: `/competitivo/competiciones/${idCompeticion}/partidos`,
    4: `/competitivo/competiciones/${idCompeticion}/join`,
  };

  const iconMap: Record<number, IconDefinition> = {
    0: faInfoCircle,
    1: faPeopleGroup,
    2: faList12,
    3: faUser,
    4: faUserPlus,
  };

  const headingText: Record<number, string> = {
    0: `Información`,
    1: `Equipos`,
    2: `Clasificación`,
    3: `Partidos`,
    4: `Inscribirme`,
  };

  function getTabIdFromPath(path: string) {
    if (path.endsWith("/equipos")) return 1;
    if (path.endsWith("/clasificacion")) return 2;
    if (path.endsWith("/partidos")) return 3;
    if (path.endsWith("/join")) return 4;
    return 0;
  }

  useEffect(() => {
    if (pathname) {
      setActiveTabId(getTabIdFromPath(pathname));
    }
  }, [pathname]);

  const handleTabClick = (id: number) => {
    setActiveTabId(id);
    router.push(linkMap[id]);
  };

  return (
    <NavBase 
      headingText={headingText}
      iconMap={iconMap}
      options={opciones}
      activeTabId={activeTabId}
      onTabClick={handleTabClick}
      size="sm"
    />
  );
};
