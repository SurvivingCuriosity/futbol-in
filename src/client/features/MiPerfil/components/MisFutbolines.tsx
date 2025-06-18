import { TarjetaLugar } from "@/client/shared/components/TarjetaLugar/TarjetaLugar";
import { SpotDTO } from "@/server/models/Spot/SpotDTO";
import { OperadorDTO } from "@/server/models/User/OperadorDTO";

export const MisFutbolines = ({
  futbolines,
  operador,
}: {
  futbolines: SpotDTO[];
  operador: OperadorDTO | null | undefined;
}) => {
  return (
    <>
      {futbolines.length === 0 ? (
        <p className="text-center p-8 text-neutral-600">
          No has agregado ningún futbolin
        </p>
      ) : (
        <ul className="flex items-start overflow-x-auto w-full">
          {futbolines.map((e) => (
            <span
              className="w-11/12 md:w-7/12 lg:w-5/12 shrink-0 pr-2 py-2"
              key={e.id}
            >
              <TarjetaLugar
                spot={e}
                distanciaMessage={""}
                operador={operador}
              />
            </span>
          ))}
        </ul>
      )}
    </>
  );
};
