import { NavLayout } from "@/client/shared/layouts/NavLayout";
import SessionWrapper from "@/client/shared/components/Providers/SessionWrapper";
import type { Metadata } from "next";
import { Slide, ToastContainer } from "react-toastify";
import "@/client/shared/assets/styles/toast.css";
import "../globals.css";
import 'intro.js/introjs.css';
import { UserProvider } from "@/client/shared/context/UserContext";
import { Poppins } from "next/font/google";

export const metadata: Metadata = {
  title: "Futbol-in - Encuentra futbolines en tu ciudad !",
  description:
    "Descubre y agrega futbolines de tu ciudad, crea y participa en torneos y ligas!",
  creator: "Fernando Rodríguez Esteban",
  manifest: "/manifest.json",
};

const roboto = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionWrapper>
      <UserProvider>
        <html lang="es">
          <head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#0E172B" />
            <link rel="shortcut icon" href="/favicon/favicon.ico" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/favicon/apple-touch-icon.png"
            />
            <meta name="apple-mobile-web-app-title" content="Futbol-in" />
            <meta
              name="description"
              content="Añade y descubre futbolines de tu ciudad. Organiza y gestiona ligas de manera sencilla. Apúntate a torneos y visualiza tus resultados en tiempo real."
            />
            <meta
              property="og:description"
              content="Añade y descubre futbolines de tu ciudad. Organiza y gestiona ligas de manera sencilla. Apúntate a torneos y visualiza tus resultados en tiempo real."
            />
            <meta
              property="og:image"
              content="https://futbolin.app/favicon/icon-512x512.png"
            />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link rel="icon" href="/favicon/icon-192x192.png" />
          </head>
          <body
            className={`dark antialiased bg-neutral-950 text-neutral-50 ${roboto.className}`}
          >
            <NavLayout>{children}</NavLayout>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              draggable
              transition={Slide}
            />
          </body>
        </html>
      </UserProvider>
    </SessionWrapper>
  );
}
