import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { TarjetaEquipo } from "./TarjetaEquipo";

export const MisEquipos = ({ equipos }: { equipos: EquipoDTO[] }) => {
  const router = useRouter();

  const handleCrearEquipo = async () => {
    router.push("/perfil/crear-equipo");
  };

  const handleClickEquipo = async (idEquipo: string) => {
    router.push(`/equipos/${idEquipo}`);
  };

  return (
    <div className="grow p-3 bg-neutral-900 rounded-lg flex flex-col justify-between">
      <p className="mb-2 text-xl text-primary font-bold">Mis equipos</p>
      {equipos.length === 0 ? (
        <p className="text-center p-8 text-neutral-600">No tienes ningún equipo</p>
      ) : (
        <ul className="my-2 flex gap-2 overflow-x-auto w-full">
          {equipos.map((e) => (
            <TarjetaEquipo
              equipo={e}
              key={e.id}
              onClick={() => handleClickEquipo(e.id)}
            />
          ))}
        </ul>
      )}
      <Button
        label="Crear equipo"
        variant="neutral-outline"
        onClick={handleCrearEquipo}
      />
    </div>
  );
};
