import { ImagenCuadrada } from "@/client/shared/components/ImagenCuadrada";

export const ImagenPerfil = ({ imagenUrl }: { imagenUrl:string }) => {
  return <ImagenCuadrada src={imagenUrl} size="lg" alt="Imagen de perfil" />;
};
