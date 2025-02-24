import { NavLayout } from "@/components/NavLayout/NavLayout";
import { PerfilPage } from "@/features/Perfil/PerfilPage";
import { authOptions } from "@/shared/lib/authOptions";
import connectDb from "@/shared/lib/db";
import { User } from "@/shared/models/User/User.model";
import { UserDTO } from "@/shared/models/User/UserDTO";
import { getServerSession } from "next-auth";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  // 1. Conectamos a la BD (si no lo hace el provider automáticamente)
  await connectDb();

  const { username } = await params;

  // 2. Obtenemos la sesión (opcional, si la necesitas)
  const session = await getServerSession(authOptions);

  // 3. Recuperamos el usuario por su ID
  const userDoc = await User.findOne({ name: username }).lean();

  // Manejo de errores si no se encuentra, etc.:
  if (!userDoc) {
    // Podrías redirigir, lanzar un error, o mostrar un "no encontrado"
    // Ejemplo:
    return (
      <NavLayout loggedIn={!!session}>
        <div className="text-center p-10">Usuario no encontrado</div>
      </NavLayout>
    );
  }

  // 4. Renderizamos la página, pasando el usuario como prop
  return (
    <NavLayout loggedIn={!!session}>
      <PerfilPage user={userDoc as unknown as UserDTO} />
    </NavLayout>
  );
}
