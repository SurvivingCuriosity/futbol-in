import { TopNav } from "@/components/NavLayout/TopNav";
import { BottomNav } from "./BottomNav";

export function NavLayout({
  loggedIn,
  children,
}: {
  loggedIn: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen pb-16 w-full">
          {/* PC */}
          <div className="hidden md:block">
            {loggedIn && <TopNav />}
            <main className="p-8 max-w-screen-xl mx-auto">{children}</main>
          </div>

          {/* MOVIL */}
          <div className="block md:hidden">
            <main className="p-4 flex flex-col items-start justify-start pb-18">{children}</main>
            {loggedIn && <BottomNav />}
          </div>
    </div>
  );
}
