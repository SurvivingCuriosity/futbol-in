"use client";
import {
  faHand,
  faInfoCircle,
  faList12,
  faPeopleGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { InlinePicker } from "futbol-in-ui";
import { useRouter } from "next/navigation";

export const Nav = ({
  idCompeticion,
  estaInscrito,
}: {
  idCompeticion: string;
  estaInscrito: boolean;
}) => {
  const router = useRouter();

  const detalles = { id: 0, label: "Detalles", icon: faInfoCircle };
  const equipos = { id: 1, label: "Equipos", icon: faPeopleGroup };
  const clasificacion = { id: 2, label: "Clasificación", icon: faList12 };
  const partidos = { id: 3, label: "Partidos", icon: faUser };
  const inscribirme = { id: 4, label: "Inscribirme", icon: faHand };

  const opciones = [
    detalles,
    equipos,
    clasificacion,
    estaInscrito ? partidos : inscribirme,
  ];

  const linkMap: Record<number, string> = {
    0: `/competicion/torneos/${idCompeticion}`,
    1: `/competicion/torneos/${idCompeticion}/equipos`,
    2: `/competicion/torneos/${idCompeticion}/clasificacion`,
    3: `/competicion/torneos/${idCompeticion}/clasificacion`,
    4: `/competicion/torneos/${idCompeticion}/join`,
  };

  const handleTabClick = (id: number) => {
    router.push(linkMap[id]);
  };

  return (
    <div className="my-2 w-full md:w-fit md:min-w-md">
      <InlinePicker options={opciones} onTabClick={handleTabClick} size="sm" />
    </div>
  );
};
