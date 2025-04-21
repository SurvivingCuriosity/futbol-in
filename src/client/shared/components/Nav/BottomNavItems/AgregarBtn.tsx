import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AgregarBtn = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/agregar-spot") {
      return pathname === "/agregar-spot";
    }
    return pathname.startsWith(href);
  };

  return (
    <Link
      href={"/agregar-spot"}
      className={`tour-agregar flex items-center justify-center p-2 ${isActive('/agregar-spot') ? "text-primary" : "text-white"}`}
      aria-label={"Agregar spot"}
      prefetch
    >
      <FontAwesomeIcon
        icon={faCirclePlus}
        width={22}
        height={22}
        className="text-xl"
      />
    </Link>
  );
};
