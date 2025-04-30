import { PerfilOperadorPage } from '@/client/features/Operador/PerfilOperadorPage'
import { UserService } from '@/server/services/User/UserService'

export interface OperadorPageProps {
  params: Promise<{
    idOperador: string
  }>
}

export async function generateMetadata({params}:OperadorPageProps) {
  const { idOperador } = await params;
  const operador = await UserService.getPerfilOperador(idOperador)

  if(!operador) return null

  return {
    title: `${operador.nombreComercial}`,
    description: operador.bio,
    openGraph: {
      title: `${operador.nombreComercial}`,
      description: operador.bio,
      url: `https://futbolin.app/operador/${operador.id}`,
      images: [
        {
          url: "https://futbolin.app/favicon.png",
          width: 1200,
          height: 630,
        },
      ],
      locale: "es_ES",
      siteName: "Futbol-in",
      type: "website",
    },
  };
}


const page = async ({params}:OperadorPageProps) => {

    const {idOperador} = await params
    const operador = await UserService.getPerfilOperador(idOperador)
    if(!operador) return <p>No se encontró el operador</p>
    const mappedOperador = UserService.mapOperadorToDTO(operador)

  return (
    <PerfilOperadorPage operador={mappedOperador} />
  )
}

export default page