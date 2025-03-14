import { faMapLocationDot, faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const BotoneraCompartir = ({
  googlePlaceId,
}: {
  googlePlaceId: string;
}) => {
  const handleClickShare = async () => {
    await navigator.share({
      title: "Comparte este lugar",
      text: "Comparte este lugar",
      url: "https://futbol-in.vercel.app/futbolines/salamanca/ChIJRXzdx10mPw0Rqqm_C9Dkei8",
    });
  };

  const handleClickAbrirEnMaps = () => {
    if (!googlePlaceId) return;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    let url;
    if (isMobile) {
      url = `comgooglemaps://?q=place_id:${googlePlaceId}`;
    } else {
      url = `https://www.google.com/maps/place/?q=place_id:${googlePlaceId}`;
    }

    window.open(url, "_blank");
  };

  return (
    <div className="flex items-center gap-2 text-sm mb-4">
      <button
        onClick={handleClickShare}
        className="cursor-pointer size-8 border border-neutral-400 text-neutral-400 w-fit p-1 aspect-square rounded-lg bg-neutral-900"
      >
        <FontAwesomeIcon icon={faShare} />
      </button>

      <button
        onClick={handleClickAbrirEnMaps}
        className="cursor-pointer size-8 border border-neutral-400 text-neutral-400 w-fit p-1 aspect-square rounded-lg bg-neutral-900"
      >
        <FontAwesomeIcon icon={faMapLocationDot} />
      </button>
    </div>
  );
};
