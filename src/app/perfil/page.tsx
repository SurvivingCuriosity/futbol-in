import { NavLayout } from "@/components/NavLayout/NavLayout";
import {
  faTrophy,
  faUserCircle
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession();

  return (
    <NavLayout loggedIn={!!session}>
      <div className="w-full h-full justify-between flex border border-neutral-700 rounded-lg p-8">
        <div>
          <span>
            <FontAwesomeIcon
              icon={faUserCircle}
              className="text-neutral-700 text-7xl"
            />
            <p className="font-bold">Fernando Rodríguez</p>
            <p className="text-neutral-400">Miembro desde el 2023</p>
          </span>

          <div className="rounded-2xl flex w-min whitespace-nowrap items-center gap-1 bg-blue-500/20 px-2 p-1 text-neutral-400">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-blue-500 rounded-full"
            />
            <p className="text-sm">10 Futbolín</p>
          </div>
          <div className="rounded-2xl flex w-min whitespace-nowrap items-center gap-1 bg-purple-500/20 px-2 p-1 text-neutral-400">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-purple-500 rounded-full"
            />
            <p className="text-sm">10 Futbolín</p>
          </div>
          <div className="rounded-2xl flex w-min whitespace-nowrap items-center gap-1 bg-amber-500/20 px-2 p-1 text-neutral-400">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-amber-500 rounded-full"
            />
            <p className="text-sm">10 Futbolín</p>
          </div>
        </div>
        <div>
          <div className="flex flex-row items-start gap-4">
            <div className="p-4 border border-neutral-500 rounded-lg flex flex-col items-center">
              <FontAwesomeIcon icon={faTrophy} className="text-primary" />
              <p>15</p>
              <p>Añadidos</p>
            </div>
            <div className="p-4 border border-neutral-500 rounded-lg flex flex-col items-center">
              <FontAwesomeIcon icon={faTrophy} className="text-primary" />
              <p>15</p>
              <p>Añadidos</p>
            </div>
            <div className="p-4 border border-neutral-500 rounded-lg flex flex-col items-center">
              <FontAwesomeIcon icon={faTrophy} className="text-primary" />
              <p>15</p>
              <p>Añadidos</p>
            </div>
          </div>
          <p>Logros</p>
          <div className="flex flex-row border border-neutral-600 rounded-lg p-4 items-center gap-4">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-primary bg-primary/20 p-2 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold">Explorador</p>
              <p className="text-sm font-light text-neutral-400">
                Añade futbolines
              </p>
              <input type="range" className="accent-primary" />
            </div>
          </div>
          <div className="flex flex-row border border-neutral-600 rounded-lg p-4 items-center gap-4">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-primary bg-primary/20 p-2 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold">Explorador</p>
              <p className="text-sm font-light text-neutral-400">
                Añade futbolines
              </p>
              <input type="range" className="accent-primary" />
            </div>
          </div>
          <div className="flex flex-row border border-neutral-600 rounded-lg p-4 items-center gap-4">
            <FontAwesomeIcon
              icon={faTrophy}
              className="text-primary bg-primary/20 p-2 rounded-full"
            />
            <div className="flex flex-col">
              <p className="font-bold">Explorador</p>
              <p className="text-sm font-light text-neutral-400">
                Añade futbolines
              </p>
              <input type="range" className="accent-primary" />
            </div>
          </div>
        </div>
      </div>
    </NavLayout>
  );
}
