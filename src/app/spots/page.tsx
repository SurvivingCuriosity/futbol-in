import { SpotsVacio } from "@/client/features/Spots/SpotsVacio";
import { encodeCiudad } from "@/core/helpers/encodeCiudad";
import { authOptions } from "@/server/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const revalidate = 60

const page = async () => {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.ciudadActual) {
    return <SpotsVacio />;
  }

  const ciudadFormateada = encodeCiudad(session?.user?.ciudadActual)

  redirect(`/spots/${ciudadFormateada}`);

};

export default page;
