import { faMapLocationDot, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BotoneraCompartir = ({
  googlePlaceId,
  idSpot,
}: {
  googlePlaceId: string;
  idSpot:string
}) => {
  const handleClickShare = async () => {
    await navigator.share({
      title: "Futbolin",
      text: "¡Échale un ojo a este futbolín en futbolin.app!",
      url: `https://futbolin.app/futbolines/${idSpot}`,
    });
  };

  const handleClickAbrirEnMaps = () => {
    if (!googlePlaceId) return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    let url;
    if (isMobile) {
      url = `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${googlePlaceId}`;
    } else {
      url = `https://www.google.com/maps/place/?q=place_id:${googlePlaceId}`;
    }

    window.open(url, "_blank");
  };

  return (
    <div className="flex items-center gap-2 text-sm mt-auto">
      <button
        aria-label="Compartir"
        onClick={handleClickShare}
        className="cursor-pointer size-8 border border-neutral-400 text-neutral-400 w-fit p-1 aspect-square rounded-lg bg-neutral-900"
      >
        <FontAwesomeIcon icon={faShare} />
      </button>

      <button
        aria-label="Abrir en mapas"
        onClick={handleClickAbrirEnMaps}
        className="cursor-pointer size-8 border border-neutral-400 text-neutral-400 w-fit p-1 aspect-square rounded-lg bg-neutral-900"
      >
        <FontAwesomeIcon icon={faMapLocationDot} />
      </button>
    </div>
  );
};
