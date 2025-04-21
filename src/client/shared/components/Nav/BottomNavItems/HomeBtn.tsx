import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const HomeBtn = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <Link
      href={"/"}
      className={`tour-inicio p-2 flex items-center justify-center ${isActive('/') ? "text-primary" : "text-white"}`}
      aria-label={"Inicio"}
      prefetch
    >
      <FontAwesomeIcon
        icon={faHome}
        width={22}
        height={22}
        className="text-xl"
      />
    </Link>
  );
};
