import { UserClient } from "@/client/shared/client/UserClient";
import { ImagenEditable } from "@/client/shared/components/ImagenEditable";
import { getErrorMessage } from "@/packages/utils/getErrorMessage";
import { useState } from "react";
import { toast } from "react-toastify";

export function CambiarImagenPerfil({url}:{url:string}) {

  const [loading, setLoading] = useState(false);

  async function handleNewImage(file: File) {
    try{

      setLoading(true)
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "user");
      
      const res = await fetch("/api/storage/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.path) {
        await UserClient.cambiarImagenPerfil(data.path);
        setLoading(false)
      }
    }catch(err:unknown){
      toast.error(getErrorMessage(err))
      setLoading(false)
    }
  }

  return (
      <ImagenEditable
        url={url || '/default_user.svg'}
        onNewImage={handleNewImage}
        width={150}
        height={150}
        loading={loading}
      />
  );
}
