"use client";

import IconWhatsapp from "@/client/shared/components/Icons/IconWhatsapp";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ButtonWhatsapp = ({ numero }: { numero: string }) => {
  const handleSendWhatsapp = () => {
    const mensajePredeterminado =
      "Hola, he visto vuestro número de telefono en www.futbolin.app y quería comentaros lo siguiente:";
    window.open(
      `https://wa.me/34${numero}?text=${encodeURIComponent(
        mensajePredeterminado
      )}`,
      "_blank"
    );
  };
  return (
    <div className="ml-auto flex items-center">
      <button className="ml-auto" onClick={handleSendWhatsapp}>
        <IconWhatsapp />
      </button>
      <a href={`tel:${numero}`} className="p-2 ml-2 bg-neutral-700 rounded-full size-8 flex items-center justify-center">
        <FontAwesomeIcon icon={faPhone} />
      </a>
    </div>
  );
};
