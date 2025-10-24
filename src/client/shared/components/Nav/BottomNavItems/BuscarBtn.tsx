import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BuscarBtn = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/ciudades") {
      return pathname === "/ciudades";
    }
    return pathname.startsWith(href);
  };

  return (
    <Link
      href={"/ciudades"}
      className={`tour-buscar flex items-center justify-center p-2 ${isActive('/spots/') ? "text-primary" : "text-white"}`}
      aria-label={"Spots"}
      prefetch
    >
      <FontAwesomeIcon
        icon={faMagnifyingGlass}
        width={22}
        height={22}
        className="text-xl"
      />
    </Link>
  );
};
