import { Handle, Position } from "@xyflow/react";

export function NodoPartido({ data }:{data:string}) {

  console.log(data);

  return (
    <>
      <div className="bg-neutral-900 border w-[150px] rounded-lg border-neutral-700 relative">
        <Handle type="target" position={Position.Left} />
        <p className="p-1 border-b border-neutral-700 w-full">Equipo 1</p>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs bg-neutral-800 p-1 rounded-full size-5 flex items-center justify-center">vs</span>
        <p className="p-1 text-neutral-800">Equipo 2</p>
        <Handle type="source" position={Position.Right} />
      </div>
    </>
  );
}
