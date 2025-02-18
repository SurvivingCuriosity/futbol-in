import { BottomNav } from "./BottomNav";

export async function BottomNavLayout({
  loggedIn,
  children,
}: {
  loggedIn: boolean;
  children: React.ReactNode;
}) {

  return (
    <div className="min-h-dvh">
      {children}
      {loggedIn && <BottomNav />}
    </div>
  );
}
