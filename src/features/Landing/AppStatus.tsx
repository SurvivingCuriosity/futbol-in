import React from "react";
import { IWorkItem, WorkItems, WorkStatus } from "./db";

const AppStatus = () => {
  const doneItems = WorkItems.filter((item) => item.status === WorkStatus.DONE);
  const todoItems = WorkItems.filter((item) => item.status === WorkStatus.TODO);
  const doingItems = WorkItems.filter(
    (item) => item.status === WorkStatus.DOING
  );

  return (
    <div className="border p-2 rounded-lg border-neutral-700 mx-auto my-8 *:accent-primary">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-light uppercase text-neutral-600 tracking-widest">
            Tareas completadas
          </p>
          <ul className="flex flex-col gap-2">
            {doneItems.map((item) => (
              <WorkItem key={item.name} item={item} />
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-light uppercase text-neutral-600 tracking-widest">
            Tareas pendientes
          </p>
          <ul className="flex flex-col gap-2">
            {todoItems.map((item) => (
              <WorkItem key={item.name} item={item} />
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-light uppercase text-neutral-600 tracking-widest">
            Tareas en progreso
          </p>
          <ul className="flex flex-col gap-2">
            {doingItems.map((item) => (
              <WorkItem key={item.name} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AppStatus;

export const WorkItem = ({ item }: { item: IWorkItem }) => {
  return (
    <li className="flex flex-col gap-2 ">
      <label className="gap-2 flex flex-row items-center">
        <input
          type="checkbox"
          className="size-4 border-neutral-700 rounded-lg"
          checked={item.status === WorkStatus.DONE}
        />
        {item.name}
      </label>
      <span className="text-xs text-neutral-500 ml-8">{item.description}</span>
    </li>
  );
};
