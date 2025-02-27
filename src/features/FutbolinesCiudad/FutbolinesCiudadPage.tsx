import { TarjetaFutbolinInicio } from "@/shared/components/Inicio/TarjetaFutbolinInicio";
import { ILugar } from "@/shared/models/Futbolin.model";

export interface FutbolinesCiudadPageProps {
  futbolines: ILugar[];
  ciudad: string;
}

const FutbolinesCiudadPage = (props: FutbolinesCiudadPageProps) => {
  const { futbolines, ciudad } = props;

  const ciudadLabel = ciudad.charAt(0).toUpperCase() + ciudad.slice(1);

  return (
      <div>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          Futbolines en {ciudadLabel}
        </h1>
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
      </div>
  );
};

export default FutbolinesCiudadPage;
