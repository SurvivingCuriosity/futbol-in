import { BottomNav } from "./Navs/BottomNav";
import { TopNav } from "./Navs/TopNav";

export function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full">
      {/* Navbar Superior en pantallas md+ */}
      <div className="hidden md:block">
        <TopNav />
      </div>
      
      {/* Contenido principal (solo una vez) */}
      <main
        className="
          p-4
          relative
          flex
          flex-col
          items-start
          justify-start
          pb-18     /* espacio al final para móviles */
          md:pb-0   /* quita el padding extra en pantallas grandes */
          md:max-w-screen-xl 
          md:mx-auto
        "
      >
        {children}
      </main>
      
      {/* Navbar Inferior en pantallas <md */}
      <div className="block md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
