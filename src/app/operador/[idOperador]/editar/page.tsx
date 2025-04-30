import { EditarPerfilOperadorPage } from "@/client/features/Operador/EditarPerfilOperadorPage";
import { authOptions } from "@/server/lib/authOptions";
import { UserService } from "@/server/services/User/UserService";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export interface OperadorPageProps {
  params: Promise<{
    idOperador: string;
  }>;
}

const page = async ({ params }: OperadorPageProps) => {
  const { idOperador } = await params;

  const user = await getServerSession(authOptions);
  const userDb = await UserService.findById(user?.user?.id);

  if (!userDb?.idOperador) {
    redirect("/operador/crear");
  }

  if (userDb?.idOperador.toString() !== idOperador) {
    return <p>No tienes permiso para editar esta página</p>;
  }

  const operador = await UserService.getPerfilOperador(idOperador)
  const mappedOperador = operador ? UserService.mapOperadorToDTO(operador) : null

  if(!mappedOperador) return <p>No se encontró el operador</p>

  return <EditarPerfilOperadorPage operador={mappedOperador} />;
};

export default page;
