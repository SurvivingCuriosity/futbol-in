import { BottomNav } from "@/client/shared/components/Nav/BottomNav";
import { TopNav } from "@/client/shared/components/Nav/TopNav";


export function NavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-dvh w-full">
      <TopNav />
      <main
        className="p-2 md:p-4 relative flex flex-col items-start justify-start pb-18
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
