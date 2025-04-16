import { ImagenFutbolinLogoMap } from "@/client/shared/constants/FutbolinesLogoImageMap";
import { OperadorDTO } from "@/server/models/User/OperadorDTO";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { ButtonWhatsapp } from "./ButtonWhatsapp";

export const PerfilOperadorPage = ({ operador }: { operador: OperadorDTO }) => {

    return (
    <div className="flex flex-col max-w-lg mx-auto">
      <h1 className="text-3xl font-black text-primary mb-4">
        {operador.nombreComercial}
      </h1>

      <p className="text-primary underline">¿Dónde estamos?</p>
      <div className="text-sm text-neutral-300 flex items-center gap-2 p-2 mb-4">
        <FontAwesomeIcon icon={faLocationDot} width={14} height={14} />
        <p>{operador.ciudad.split(",")[0].trim()}</p>
        <p className="text-neutral-500">
          ({operador.ciudad.split(",")[1].trim()})
        </p>
      </div>

      <p className="text-primary underline">Trabajamos con futbolines:</p>
      <ul className="flex items-center gap-2 my-2 flex-wrap p-2 mb-4">
        {operador.futbolines.map((f) => (
          <div
            key={f}
            className="flex items-center gap-2 bg-neutral-800 px-2 rounded-md"
          >
            <Image
              src={ImagenFutbolinLogoMap[f]}
              width={25}
              height={25}
              alt="Logo futbolin"
            />
            <p>{f}</p>
          </div>
        ))}
      </ul>
      <p className="text-primary underline">Sobre nosotros:</p>
      <p className="p-2 mb-4">{operador.bio}</p>

      <p className="text-primary underline">Contacto</p>
      <div className="p-2 mb-4">
        {operador.telefonos.map((t) => (
          <div
            key={t.numero}
            className="flex items-center gap-2 border border-neutral-800 mb-2 p-1 rounded-lg"
          >
            <p className="text-lg font-semibold">{t.persona}</p>
            <p className="text-lg text-neutral-500">{t.numero}</p>
            <ButtonWhatsapp numero={t.numero} />
          </div>
        ))}
      </div>
    </div>
  );
};
