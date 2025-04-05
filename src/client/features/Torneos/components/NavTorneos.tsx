"use client";
import {
  faInfoCircle,
  faList12,
  faPeopleGroup,
  faSitemap,
  faUser,
  faUserPlus,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { InlinePicker } from "futbol-in-ui";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const NavTorneos = ({
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
  const grupos = { id: 1, label: "Grupos", icon: faPeopleGroup };
  const clasificacion = { id: 2, label: "Cuadro", icon: faSitemap };
  const partidos = { id: 3, label: "Partidos", icon: faUser };
  const inscribirme = { id: 4, label: "Entrar", icon: faUserPlus };

  const opciones = [
    detalles,
    grupos,
    clasificacion,
    estaInscrito ? partidos : inscribirme,
  ];

  const linkMap: Record<number, string> = {
    0: `/competitivo/torneos/${idCompeticion}`,
    1: `/competitivo/torneos/${idCompeticion}/grupos`,
    2: `/competitivo/torneos/${idCompeticion}/cuadro`,
    3: `/competitivo/torneos/${idCompeticion}/partidos`,
    4: `/competitivo/torneos/${idCompeticion}/join`,
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
    1: `Grupos`,
    2: `Cuadro`,
    3: `Partidos`,
    4: `Inscribirme`,
  };

  function getTabIdFromPath(path: string) {
    if (path.endsWith("/grupos")) return 1;
    if (path.endsWith("/cuadro")) return 2;
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
    <div className="my-2 w-full md:min-w-md">
      <InlinePicker
        options={opciones}
        onTabClick={handleTabClick}
        size="sm"
        activeTabId={activeTabId}
        itemContainerClassName="flex items-center p-3 justify-center md:justify-start gap-2"
        textClassName="hidden md:block text-sm w-fit xl:mx-0 lg:text-lg xl:text-xl"
      />
      <h2 className="text-xl font-bold text-neutral-400 mt-2 p-1">
        <FontAwesomeIcon
          icon={iconMap[activeTabId]}
          width={24}
          height={24}
          className="mr-2 text-lg"
        />
        {headingText[activeTabId]}
      </h2>
    </div>
  );
};
