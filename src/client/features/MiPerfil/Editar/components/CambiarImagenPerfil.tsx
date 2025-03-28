import { StorageClient } from "@/client/shared/client/StorageClient";
import { UserClient } from "@/client/shared/client/UserClient";
import { ImagenEditable } from "@/client/shared/components/ImagenEditable";
import { useUser } from "@/client/shared/context/UserContext";
import { getErrorMessage } from "@/packages/utils/getErrorMessage";
import { useState } from "react";
import { toast } from "react-toastify";

export function CambiarImagenPerfil({
  url,
  nombreImagen,
}: {
  url: string;
  nombreImagen: string;
}) {
  const {setImageUrl} = useUser()
  const [loading, setLoading] = useState(false);

  async function handleNewImage(file: File) {
    try {
      setLoading(true);
      // Borramos la actual
      await StorageClient.delete(nombreImagen);

      // Subimos la nueva
      const path = await StorageClient.upload(file, "user");

      if (path) {
        await UserClient.cambiarImagenPerfil(path);
        const newImageUrl = await StorageClient.getImageUrl(path)
        setImageUrl(newImageUrl)
        setLoading(false);
      }
    } catch (err: unknown) {
      toast.error(getErrorMessage(err));
      setLoading(false);
    }
  }

  return (
    <ImagenEditable
      url={url || "/default_user.svg"}
      onNewImage={handleNewImage}
      width={150}
      height={150}
      loading={loading}
    />
  );
}
