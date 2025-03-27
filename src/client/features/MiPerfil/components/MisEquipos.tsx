import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { Button } from "futbol-in-ui";
import { useRouter } from "next/navigation";
import { TarjetaEquipo } from "./TarjetaEquipo";

export const MisEquipos = ({ equipos }: { equipos: EquipoDTO[] }) => {
  const router = useRouter();

  const handleCrearEquipo = async () => {
    router.push("/perfil/crear-equipo");
  };

  return (
    <div className="grow p-3 bg-neutral-900 rounded-lg">
      <p className="mb-2 text-xl">Mis equipos</p>
      <ul className="my-2 flex gap-2 overflow-x-auto w-full">
        {equipos.map((e) => (
          <TarjetaEquipo equipo={e} key={e.id}/>
        ))}
      </ul>
      <Button
        label="Crear equipo"
        variant="neutral-outline"
        onClick={handleCrearEquipo}
      />
    </div>
  );
};
