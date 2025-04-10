import { BottomNav } from "@/client/shared/components/Nav/BottomNav";
import { TopNav } from "@/client/shared/components/Nav/TopNav";
import Image from "next/image";
export function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh w-full">
      <TopNav />
      <main
        className="p-3 md:p-4 relative flex flex-col items-start justify-start pb-18
          md:pb-0
          md:max-w-screen-xl 
          md:mx-auto
          z-1
        "
      >
        <Image src={'/fondo.png'} alt="Imagen de fondo" width={400} height={400} className="fixed bottom-0 w-screen md:w-[80%] left-1/2 -translate-x-1/2 h-auto z-0 pointer-events-none"/>
        <div className="z-1 relative w-full">
          {children}
        </div>
      
      </main>
      
      <BottomNav />
    </div>
  );
}
