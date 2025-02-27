import { TarjetaFutbolinInicio } from "@/shared/components/Inicio/TarjetaFutbolinInicio";
import { ILugar } from "@/shared/models/Futbolin.model";

export interface ListaFutbolinesProps {
  futbolines: ILugar[];
}

const ListaFutbolines = (props: ListaFutbolinesProps) => {
  const { futbolines } = props;

  return (
    <>
      <ul className="flex flex-col gap-2 items-center w-full mt-4">
        {futbolines.length === 0 && (
          <p className="text-center text-neutral-400">
            Ups... parece que aún no hay futbolines en esta ciudad
          </p>
        )}
        {futbolines.map((f) => (
          <TarjetaFutbolinInicio key={f.nombre} lugar={f} />
        ))}
      </ul>
    </>
  );
};

export default ListaFutbolines;
