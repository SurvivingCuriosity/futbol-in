
export const HeroSection = () => {
  return (
    <div className="bg-neutral-800 relative mb-10">
      <main className="p-4 max-w-screen-lg mx-auto flex flex-col justify-center gap-4 pb-12 overflow-hidden">

        <h1 className="z-2 text-4xl xl:text-6xl mb-4 font-extrabold text-white tracking-tight text-pretty">
          ¡Encuentra los mejores futbolines de tu ciudad!
        </h1>
        <div className="z-2 relative">
          <input
            type="text"
            className="bg-neutral-700 rounded-3xl h-12 p-2 w-full relative placeholder:text-neutral-500 border border-neutral-600"
            placeholder="Busca un club..."
          />

          <div className="absolute right-1.5 top-0 h-full flex items-center">
            <button className="bg-lime-300 rounded-3xl h-9/12 text-black font-bold px-4">Buscar</button>
          </div>
        </div>
      </main>

      <div className="absolute top-full left-0 w-full">
        <svg
          className="h-10 w-full"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill fill-neutral-800"
          ></path>
        </svg>
      </div>
    </div>
  );
};
