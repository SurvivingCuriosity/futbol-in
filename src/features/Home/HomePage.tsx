import React from "react";

const HomePage = async () => {
  return (
    <div className="h-full w-full grid grid-cols-5 grid-rows-5 gap-4 *:bg-neutral-900 *:h-full *:rounded-lg *:p-2">
      <div className="col-span-3 row-span-3">1</div>
      <div className="col-span-2 row-span-3 col-start-4">2</div>
      <div className="col-span-2 row-span-2 row-start-4">3</div>
      <div className="row-span-2 col-start-3 row-start-4">4</div>
      <div className="col-span-2 row-span-2 col-start-4 row-start-4">6</div>
    </div>
  );
};

export default HomePage;
