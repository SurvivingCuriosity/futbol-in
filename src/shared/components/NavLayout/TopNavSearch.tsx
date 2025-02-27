import { AppLogo } from "../AppLogo";
import { LoginRegister } from "../LandingPage/LoginRegister";
import SearchInputCiudad from "../SearchInputCiudad";

export const TopNavSearch = () => {
  return (
    <>
      <menu className="max-w-screen-xl mx-auto bg-neutral-950 fixed top-0 p-4 flex items-center justify-between w-full gap-4 z-1">
        <AppLogo href="/" />
        <span className="w-full">
          <SearchInputCiudad />
        </span>
        <LoginRegister />
      </menu>
    </>
  );
};
