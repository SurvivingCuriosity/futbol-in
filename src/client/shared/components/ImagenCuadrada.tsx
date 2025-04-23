import Image from "next/image";
import React from "react";

type ImageSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ImagenCuadradaProps {
  src: string;
  defaultSrc?: string;
  alt?: string;
  size: ImageSize;
  showBorder?: boolean;
}

export const ImagenCuadrada = ({
  src,
  defaultSrc = "/default_user.svg",
  alt = "image",
  size = "md",
  showBorder = false,
}: ImagenCuadradaProps) => {
  const sizeMap: Record<ImageSize, number> = {
    xs: 20,
    sm: 30,
    md: 40,
    lg: 70,
    xl: 100,
  };

  return (
    <Image
      src={src || defaultSrc}
      alt={alt}
      width={sizeMap[size]}
      height={sizeMap[size]}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
      }}
      className={`w-full h-full rounded-full ${
        showBorder ? "border-2" : ""
      } border-primary object-center object-cover`}
    />
  );
};
