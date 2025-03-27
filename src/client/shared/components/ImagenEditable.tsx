"use client";

import React, { ChangeEvent, useRef, useState } from "react";
import Image from "next/image";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ImagenEditableProps {
  onNewImage: (file: File) => void;
  url: string;
  width?: number;
  height?: number;
  loading?: boolean;
}

export const ImagenEditable = (props: ImagenEditableProps) => {
  const { onNewImage, url, width = 100, height = 100, loading = false } = props;

  const [innerUrl, setInnerUrl] = useState(url);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setInnerUrl(URL.createObjectURL(file));
      onNewImage(file);
    }
  };

  return (
    <div className="relative w-fit mx-auto">
      <Image
        src={innerUrl || "/default_user.svg"}
        alt="avatar"
        width={width}
        height={height}
        style={{ width, height }}
        className="border-2 border-primary rounded-full aspect-square"
      />

      <button
        type="button"
        className="bg-primary text-neutral-900 absolute top-0 right-0 p-1 px-2 text-sm rounded-full"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faPen} />
      </button>

      {loading && <div>Actualizando imagen...</div>}

      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};
