import { iconTipoDeCompeticionMap } from "@/client/shared/constants/IconTipoDeCompeticionMap";
import { TipoCompeticion } from "@/core/enum/Competicion/TipoCompeticion";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

const page = () => {
  const items = [
    {
      label: "Ranking",
      href: "/competitivo/ranking",
      descripcion: "Ver tus mejores resultados",
      icon: faRankingStar,
    },
    {
      label: "Torneos",
      href: "/competitivo/torneos",
      descripcion: "Consulta los torneos activos en tu ciudad",
      icon: iconTipoDeCompeticionMap[TipoCompeticion.TORNEO],
    },
    {
      label: "Ligas",
      href: "/competitivo/ligas",
      descripcion: "Consulta las ligas activas en tu ciudad",
      icon: iconTipoDeCompeticionMap[TipoCompeticion.LIGA],
    },
  ];

  const textColorMap: Record<string, string> = {
    Ranking: "text-primary",
    Torneos: "text-sky-500",
    Ligas: "text-yellow-500",
  };
  const backgroundMap: Record<string, string> = {
    Ranking: "bg-neutral-800/50",
    Torneos: "bg-neutral-800/50",
    Ligas: "bg-neutral-800/50",
  };
  const borderColorMap: Record<string, string> = {
    Ranking: "border-neutral-500",
    Torneos: "border-neutral-500",
    Ligas: "border-neutral-500",
  };
  const iconColorMap: Record<string, string> = {
    Ranking: "text-primary/50",
    Torneos: "text-sky-500/20",
    Ligas: "text-yellow-500/20",
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
