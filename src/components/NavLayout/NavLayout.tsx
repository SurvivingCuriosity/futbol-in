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
    <div className="h-screen pb-16">

          {/* PC */}
          <div className="hidden md:block">
            {loggedIn && <TopNav />}
            <main className="p-8 max-w-screen-xl mx-auto">{children}</main>
          </div>

          {/* MOVIL */}
          <div className="block md:hidden fixed bottom-0 left-0 w-full">
            <main className="p-4">{children}</main>
            {loggedIn && <BottomNav />}
          </div>
    </div>
  );
}
