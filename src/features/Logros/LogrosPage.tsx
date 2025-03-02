import { faCheck, faPlus, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { Medalla } from "./Medalla";

export const LogrosPage = () => {
  const LOGROS = [
    {
      id: 1,
      nombre: "Explorador",
      descripcion: "Añade nuevos futbolines",
      icon: faPlus,
      steps: [5, 10, 25, 50, 100],
      stepDescription: (n:number) => `Añade ${n} futbolines`
    },
    {
      id: 2,
      nombre: "Comentarista",
      descripcion: "Valora futbolines",
      icon: faThumbsUp,
      steps: [5, 10, 25, 50, 100],
      stepDescription: (n:number) => `Valora ${n} futbolines`
    },
    {
      id: 3,
      nombre: "De fiar",
      descripcion: "Tus contribuciones son aprobadas por usuarios verificados",
      icon: faCheck,
      steps: [5, 10, 25, 50, 100],
      stepDescription: (n:number) => `Consigue ${n} aprobados` 
    },
  ];

  return (
    <div className="w-full">
      <h1 className="text-2xl">Logros disponibles</h1>
      <ul className="w-full space-y-2 mt-2 gap-4 flex flex-col">
        {LOGROS.map((logro) => (
          <li
            key={logro.id}
            className="bg-neutral-900 rounded-2xl p-4 flex flex-col gap-2 border border-neutral-600 w-full"
          >
            <h2 className="text-2xl tracking-tight font-extrabold">{logro.nombre}</h2>
            <p className="text-neutral-500 mb-4">{logro.descripcion}</p>
            <ul className="flex gap-2 w-full items-center justify-between">
              {logro.steps.map((step,index) => (
                <div key={step} className="w-full">
                  <Medalla
                    level={index+1}
                    icon={logro.icon}
                    text={logro.stepDescription(step)}
                    smallText={step.toString()}
                  />
                </div>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
