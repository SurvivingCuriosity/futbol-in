import React from "react";
import { AppLogo } from "../../AppLogo";
import SearchInputCiudad from "../../SearchInputCiudad";
import { LoginRegister } from "../../LandingPage/LoginRegister";

export const SearchTopNav = () => {
  return (
    <menu className="max-w-screen-xl mx-auto bg-neutral-950 sticky top-0 h-16 px-4 flex items-center justify-between w-full gap-4 z-1">
      <AppLogo href="/" />
      <span className="w-full">
        <SearchInputCiudad />
      </span>
      <LoginRegister />
    </menu>
  );
};
