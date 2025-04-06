import {
    BaseEdge,
    getStraightPath
} from '@xyflow/react';
   
export interface CustomEdgeProps {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
}

  export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }:CustomEdgeProps) {
    const [edgePath] = getStraightPath({
      sourceX,
      sourceY,
      targetX,
      targetY,
    });
   
    return (
      <>
        <BaseEdge id={id} path={edgePath} />
      </>
    );
  }