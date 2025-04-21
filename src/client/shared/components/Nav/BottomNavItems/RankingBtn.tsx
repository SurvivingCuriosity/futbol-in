import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const RankingBtn = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/competitivo") {
      return pathname === "/competitivo";
    }
    return pathname.startsWith(href);
  };

  return (
    <Link
      href={"/competitivo"}
      className={`tour-ranking flex items-center justify-center p-2 ${
        isActive("/competitivo") ? "text-primary" : "text-white"
      }`}
      aria-label={"Ranking"}
      prefetch
    >
      <FontAwesomeIcon
        icon={faTrophy}
        width={22}
        height={22}
        className="text-xl"
      />
    </Link>
  );
};
