import { GoBackLayout } from "@/client/shared/layouts/GoBackLayout";
import { UserService } from "@/server/services/User/UserService";
import TarjetaUsuarioTopRanking from "./components/TarjetaUsuarioTopRanking";
import TablaRankingUsuariosMovil from "./components/TablaRankingUsuariosMovil";
import { UserDTO, UsuarioEnRanking } from "futbol-in-core/types";
import TablaRankingUsuarios from "./components/TablaRankingUsuarios";

export default async function RankingPage() {
  
  const users = await UserService.getAll();

  const usersParaRanking: UsuarioEnRanking[] = users.map((user, index) => ({
    id: user.id,
    usuario: user.name,
    posicion: index,
    spotsCreados: user.stats.lugaresAgregados,
    spotsVotados: user.stats.lugaresRevisados,
    spotsVerificados: user.stats.lugaresVerificados,
    puntuacion: getPuntuacion(user.stats.lugaresAgregados ?? 0, user.stats.lugaresRevisados ?? 0, user.stats.lugaresVerificados ?? 0),
  }))


  function getPuntuacion(lugaresAgregados: number, lugaresRevisados: number, lugaresVerificados: number) {
    const puntuacion = lugaresAgregados*5 + lugaresRevisados*2 + lugaresVerificados*2;
    return puntuacion;
  }

  const usuariosPorPuntuacion = usersParaRanking.sort((a, b) => b.puntuacion - a.puntuacion).map((user, index) => ({...user, posicion: index + 1}));

  return (
    <GoBackLayout href="/competitivo">
      <div className="w-full">
        <h1 className="text-3xl font-black text-primary">Ranking</h1>
        <ul className="w-full space-y-2 mt-2 flex flex-col md:grid grid-cols-3 gap-2 mb-4">
          {usuariosPorPuntuacion.slice(0, 3).map((user, index) => (
            <div key={user.id} className="animate-fade-in-top" style={{animationDelay: `${index * 0.1}s`}}>

            <TarjetaUsuarioTopRanking
              user={users.find((u) => u.name === user.usuario) as UserDTO}
              puntuacion={user.puntuacion}
              
              posicion={index + 1}
              />
              </div>
          ))}
        </ul>
        <span className="hidden md:block">
          <TablaRankingUsuarios users={usuariosPorPuntuacion.slice(3, usuariosPorPuntuacion.length)}/>
        </span>
        
        <span className="block md:hidden">
          <TablaRankingUsuariosMovil users={usuariosPorPuntuacion.slice(3, usuariosPorPuntuacion.length)}/>
        </span>
      </div>
    </GoBackLayout>
  );
}
