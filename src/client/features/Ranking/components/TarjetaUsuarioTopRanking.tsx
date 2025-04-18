"use client";

import { StorageClient } from "@/client/shared/client/StorageClient";
import { esUsuarioVerificado } from "@/core/helpers/esUsuarioVerificado";
import { UserDTO } from "@/server/models/User/UserDTO";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function TarjetaUsuarioTopRanking({
  user,
  posicion,
  puntuacion,
}: {
  user: UserDTO;
  posicion: number;
  puntuacion: number;
}) {
  const router = useRouter();

  const [image, setImage] = useState<string>("");

  useEffect(() => {
    StorageClient.getImageUrl(user?.imagen || "").then((url) =>
      setImage(url || "")
    );
  }, [user?.imagen]);

  const handleNavigateToUser = () => {
    router.push(`/user/${user.name}?from=competitivo/ranking`);
  };

  return (
    <li
      className={`flex flex-row items-center h-24 gap-2 p-4 border rounded-lg relative border-primary/50 bg-primary/5`}
      onClick={handleNavigateToUser}
    >
      {esUsuarioVerificado(user) && (
        <div className="bg-sky-600 absolute -top-1 -right-1 size-6 flex items-center justify-center rounded-full border-2 border-blue-300">
          <FontAwesomeIcon
            icon={faCheck}
            width={24}
            height={24}
            className="text-blue-200"
          />
        </div>
      )}
      {image !== "" ? (
        <div className="relative">
          <Image
            src={image}
            alt="avatar"
            width={55}
            height={55}
            className="rounded-full size-14"
          />
          <div className="absolute -top-2 -left-2 text-sm font-bold text-black bg-primary rounded-full size-7 flex items-center justify-center">{`#${posicion}`}</div>
        </div>
      ) : (
        <div className="bg-neutral-700 size-14 rounded-full flex items-center justify-center relative">
          <div className="absolute -top-2 -left-2 text-sm font-bold text-black bg-primary rounded-full size-7 flex items-center justify-center">{`#${posicion}`}</div>
          {user?.name?.charAt(0).toUpperCase()}
        </div>
      )}
      <span>
        <p className="">{user?.name}</p>
        <p className="text-xl text-neutral-400 font-bold">{puntuacion} pts</p>
      </span>
    </li>
  );
}
