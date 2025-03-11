import { BottomNav } from "./Navs/BottomNav";
import { TopNav } from "./Navs/TopNav";

export function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh w-full">
      <TopNav />
      <main
        className=" p-4 relative flex flex-col items-start justify-start pb-18
          md:pb-0
          md:max-w-screen-xl 
          md:mx-auto
        "
      >
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
