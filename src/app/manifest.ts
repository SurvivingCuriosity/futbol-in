import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: "Futbol-In",
    name: "Futbol-In",
    icons: [
      {
        src: "/favicon.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    start_url: "/",
    background_color: "#0A0A0A",
    display: "standalone",
    scope: "/",
    theme_color: "#0a0a0a",
    shortcuts: [
      {
        name: "Lista de futbolines",
        short_name: "Listado",
        description: "Obtén un listado de futbolines cercanos en tu ciudad",
        url: "/futbolines",
        icons: [
          {
            src: "/futbolin-logo.svg",
            sizes: "96x96",
          },
        ],
      },
      {
        name: "Agregar un futbolín",
        short_name: "Agregar",
        description: "Agrega un futbolín a tu listado",
        url: "/agregar-futbolin",
        icons: [
          {
            src: "/futbolin-logo.svg",
            sizes: "96x96",
          },
        ],
      },
      {
        name: "Perfil",
        short_name: "Perfil",
        description: "Ver tu perfil y tus logros",
        url: "/perfil",
        icons: [
          {
            src: "/futbolin-logo.svg",
            sizes: "96x96",
          },
        ],
      },
    ],
  };
}
