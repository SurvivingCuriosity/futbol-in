"use client"
import { StorageClient } from "@/client/shared/client/StorageClient";
import { UserDTO } from "@/server/models/User/UserDTO";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ImagenPerfil = ({ user }: { user: UserDTO }) => {
  
    const [imageUrl, setImageUrl] = useState<string>("");

    useEffect(() => {
      StorageClient.getImageUrl(user?.imagen || "").then((url) =>
        setImageUrl(url || "")
      );
    }, [user?.imagen]);

  return user.imagen === "" ? (
    <FontAwesomeIcon icon={faUserCircle} className="text-neutral-700 size-8" />
  ) : (
    <Image
      src={imageUrl || "/default_user.svg"}
      alt="avatar"
      width={100}
      height={100}
      style={{
        width: 100,
        height: 100,
      }}
      className="w-full h-full rounded-full border-2 border-primary"
    />
  );
};
