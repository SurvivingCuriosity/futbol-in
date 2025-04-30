import { OperadorDTO } from "@/server/models/User/OperadorDTO";
import { useEffect, useState } from "react";
import { UserClient } from "../client/UserClient";

export const useGetOperadorFromUserId = (userId: string | undefined) => {
  const [operador, setOperador] = useState<OperadorDTO | null | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPerfilOperador = async () => {
      setLoading(true);
      if (!userId) {
        setOperador(null);
        setLoading(false);
      } else {
        const res = await UserClient.getPerfilOperadorFromUserId(userId);
        setLoading(false);
        setOperador(res.operador);
      }
    };

    getPerfilOperador();
  }, [userId]);

  return {operador, loading}
};
