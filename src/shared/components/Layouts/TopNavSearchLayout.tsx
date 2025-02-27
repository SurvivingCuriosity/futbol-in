import { SearchTopNav } from "./Navs/SearchTopNav";

export const TopNavSearchLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className="h-screen w-full">
        <SearchTopNav />
        <main className="p-4 sm:not-odd:p-8 relative max-w-screen-xl mx-auto">{children}</main>
      </div>
    </>
  );
};
