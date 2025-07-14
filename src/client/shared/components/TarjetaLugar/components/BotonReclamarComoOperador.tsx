import { UserClient } from "@/client/shared/client/UserClient";
import { SpotDTO } from "futbol-in-core/types";
import { Button } from "futbol-in-ui";
import { useState } from "react";
import { toast } from "react-toastify";

export const BotonReclamarComoOperador = ({ spot, onUpdate }: { spot: SpotDTO, onUpdate: (s:SpotDTO)=>void }) => {
  const [loading, setLoading] = useState(false);

  const handleReclamarComoOperador = async () => {
    setLoading(true);
    const res = await UserClient.reclamarSpotComoOperador(spot.id);
    setLoading(false);
    if (res.success) {
      toast.success("Ahora tú gestionas este futbolín");
      if(res.updatedSpot){
        onUpdate(res.updatedSpot)
      }
    } else {
      toast.error("Upss... error");
    }
  };

  return (
    <Button
      onClick={handleReclamarComoOperador}
      label="Lo gestiono yo"
      size="sm"
      loading={loading}
      disabled={loading}
    />
  );
};
