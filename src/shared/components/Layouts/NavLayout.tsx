import { BottomNav } from "./Navs/BottomNav";
import { TopNav } from "./Navs/TopNav";

export function NavLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full">
          {/* PC */}
          <div className="hidden md:block">
            {<TopNav />}
            <main className="p-4 relative max-w-screen-xl mx-auto">{children}</main>
          </div>

          {/* MOVIL */}
          <div className="block md:hidden">
            <main className="p-4 flex flex-col relative items-start justify-start pb-18">{children}</main>
            {<BottomNav />}
          </div>
    </div>
  );
}
