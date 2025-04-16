import Image from "next/image";

export const ImagenPerfil = ({ imagenUrl }: { imagenUrl:string }) => {
  return <Image
      src={imagenUrl || "/default_user.svg"}
      alt="avatar"
      width={70}
      height={70}
      style={{
        width: 70,
        height: 70,
      }}
      className="w-full h-full rounded-full border-2 border-primary object-center object-cover"
    />
};
