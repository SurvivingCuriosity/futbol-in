import type { Metadata } from "next";
import "../globals.css";

export const fetchCache = "force-no-store";

export const metadata: Metadata = {
  title: "Futbol-In",
  description: "Encuentra futbolines en tu ciudad!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`antialiased bg-neutral-950 text-neutral-50`}>
        {children}
      </body>
    </html>
  );
}
