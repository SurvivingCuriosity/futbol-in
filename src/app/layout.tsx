import { NavLayout } from "@/client/shared/layouts/NavLayout";
import SessionWrapper from "@/client/shared/components/Providers/SessionWrapper";
import type { Metadata } from "next";
import { Slide, ToastContainer } from "react-toastify";
import "@/client/shared/assets/styles/toast.css";
import "../globals.css";
import { UserProvider } from "@/client/shared/context/UserContext";
import { Poppins } from 'next/font/google'

export const metadata: Metadata = {
  title: "Futbol-In",
  description: "Encuentra futbolines en tu ciudad !",
  creator: "Fernando Rodríguez Esteban",
  manifest: "/manifest.json",
};
 
const roboto = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionWrapper>
      <UserProvider>
        <html lang="es">
          <head>
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content="#0a0a0a" />
            <link rel="icon" href="/futbolin-logo.svg" />
          </head>
          <body className={`antialiased bg-neutral-950 text-neutral-50 ${roboto.className}`}>
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
