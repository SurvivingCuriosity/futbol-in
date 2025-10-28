import { faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BuscarBtn = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/mapa") {
      return pathname === "/mapa";
    }
    return pathname.startsWith(href);
  };

  return (
    <Link
      href={"/mapa"}
      className={`tour-buscar flex items-center justify-center p-2 ${isActive('/mapa') ? "text-primary" : "text-white"}`}
      aria-label={"Mapa"}
      prefetch
    >
      <FontAwesomeIcon
        icon={faMap}
        width={22}
        height={22}
        className="text-xl"
      />
    </Link>
  );
};
