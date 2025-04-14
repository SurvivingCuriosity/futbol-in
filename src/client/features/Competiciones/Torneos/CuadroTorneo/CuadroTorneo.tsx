"use client";
import { Background, Controls, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { NodoPartido } from "./components/NodoPartido";
import CustomEdge from "./components/CustomEdge";

const nodeTypes = {
  nodoPartido: NodoPartido,
};

// Declara la arista como 'customEdge' para que usemos tu componente personalizado
const edges = [
  { id: "1>9", source: "1", target: "9", type: "customEdge" },
  { id: "2>9", source: "2", target: "9", type: "customEdge" },
  { id: "3>10", source: "3", target: "10", type: "customEdge" },
  { id: "4>10", source: "4", target: "10", type: "customEdge" },
  { id: "5>11", source: "5", target: "11", type: "customEdge" },
  { id: "6>11", source: "6", target: "11", type: "customEdge" },
  { id: "7>12", source: "7", target: "12", type: "customEdge" },
  { id: "8>12", source: "8", target: "12", type: "customEdge" },
];

const nodesFirstRound = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Hello" },
    type: "nodoPartido",
  },
  {
    id: "2",
    position: { x: 0, y: 100 },
    data: { label: "World" },
    type: "nodoPartido",
  },
  {
    id: "3",
    position: { x: 0, y: 200 },
    data: { label: "World" },
    type: "nodoPartido",
  },
  {
    id: "4",
    position: { x: 0, y: 300 },
    data: { label: "World" },
    type: "nodoPartido",
  },
  {
    id: "5",
    position: { x: 0, y: 400 },
    data: { label: "World" },
    type: "nodoPartido",
  },
  {
    id: "6",
    position: { x: 0, y: 500 },
    data: { label: "World" },
    type: "nodoPartido",
  },
  {
    id: "7",
    position: { x: 0, y: 600 },
    data: { label: "World" },
    type: "nodoPartido",
  },
  {
    id: "8",
    position: { x: 0, y: 700 },
    data: { label: "World" },
    type: "nodoPartido",
  },
];

const nodes = [
  {
    id: "9",
    position: { x: 250, y: 50 },
    data: { label: "World" },
    type: "nodoPartido",
  },
  {
    id: "10",
    position: { x: 250, y: 250 },
    data: { label: "World" },
    type: "nodoPartido",
  },
  {
    id: "11",
    position: { x: 250, y: 450 },
    data: { label: "World" },
    type: "nodoPartido",
  },
  {
    id: "12",
    position: { x: 250, y: 650 },
    data: { label: "World" },
    type: "nodoPartido",
  },
];

// Declaramos edgeTypes para asociar 'customEdge' con tu componente
const edgeTypes = {
  customEdge: CustomEdge,
};

const allNodes = [...nodes, ...nodesFirstRound];

function CuadroTorneo() {
  return (
    <div style={{ height: "calc(100dvh - 12em)" }} className="h-full border">
      <ReactFlow
        defaultViewport={{
          zoom: 0,
          x: 10,
          y: 10,
        }}
        elementsSelectable
        nodes={allNodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default CuadroTorneo