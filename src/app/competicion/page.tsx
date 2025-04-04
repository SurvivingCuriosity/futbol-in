import { faRankingStar, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";

const page = () => {
  const items = [
    {
      label: "Ranking",
      href: "/competicion/ranking",
      descripcion: "Ver tus mejores resultados",
      icon: faRankingStar,
    },
    {
      label: "Torneos",
      href: "/competicion/torneos",
      descripcion: "Consulta los torneos activos en tu ciudad",
      icon: faTrophy,
    },
  ];

  const textColorMap: Record<string, string> = {
    Ranking: "text-amber-500",
    Torneos: "text-sky-500",
  };
  const backgroundMap: Record<string, string> = {
    Ranking: "bg-amber-700/10",
    Torneos: "bg-sky-700/10",
  };
  const borderColorMap: Record<string, string> = {
    Ranking: "border-amber-500",
    Torneos: "border-sky-500",
  };
  const iconColorMap: Record<string, string> = {
    Ranking: "text-amber-500/50",
    Torneos: "text-sky-500/50",
  };

  return (
    <>
      <h1 className="text-2xl font-bold text-primary mb-4">Zona competición</h1>
      <div className="flex flex-col md:grid grid-cols-2 gap-4 w-full">
        {items.map((item, index) => (
          <Link
            className={`w-full border p-4 rounded-2xl ${
              backgroundMap[item.label]
            } ${borderColorMap[item.label]} min-h-40 relative overflow-hidden`}
            href={item.href}
            key={`${item.label}-${index}`}
          >
            <FontAwesomeIcon
              icon={item.icon}
              className={`absolute -bottom-1 -right-1 -rotate-12 text-8xl ${
                iconColorMap[item.label]
              }`}
            />
            <div
              className={`flex items-center gap-2 text-4xl ${
                textColorMap[item.label]
              }`}
            >
              <FontAwesomeIcon icon={item.icon} />
              <h2 className="font-bold">{item.label}</h2>
            </div>
            <p className="z-1 relative mt-2">{item.descripcion}</p>
          </Link>
        ))}
      </div>
    </>
  );
};

export default page;
