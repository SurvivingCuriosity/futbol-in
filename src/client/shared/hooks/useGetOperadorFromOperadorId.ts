import { OperadorDTO } from "futbol-in-core/types";
import { useEffect, useState } from "react";
import { UserClient } from "../client/UserClient";

export const useGetOperadorFromOperadorId = (operadorId: string | null) => {
  const [operador, setOperador] = useState<OperadorDTO | null | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPerfilOperador = async () => {
      setLoading(true);
      if (!operadorId) {
        setOperador(null);
        setLoading(false);
      } else {
        const res = await UserClient.getPerfilOperadorFromOperadorId(operadorId);
        setLoading(false);
        setOperador(res.operador);
      }
    };

    getPerfilOperador();
  }, [operadorId]);

  return {operador, loading}
};
