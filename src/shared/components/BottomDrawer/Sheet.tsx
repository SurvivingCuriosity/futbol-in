import { useDraggable } from "@dnd-kit/core";
import React from "react";


import { Header } from "./Header";

interface Props {
  children: React.ReactNode;
  expanded?: boolean;
  header: React.ReactNode;
  maxHeight?: string;
}

export function Sheet({ children, expanded, header, maxHeight }: Props) {
  const { attributes, isDragging, listeners, transform, setNodeRef } =
    useDraggable({
      id: "header",
    });

  return (
    <div
      className={`Sheet ${isDragging ? "dragging" : ""} ${
        expanded ? "expanded" : ""
      }`}
      style={
        {
          "--max-height": maxHeight, // Inyectamos la variable
          "--transform": transform ? `${transform.y}px` : undefined,
        } as React.CSSProperties
      }
    >
      <Header ref={setNodeRef} {...attributes} {...listeners}>
        {header}
      </Header>
      <div className="bg-white p-4">{children}</div>
    </div>
  );
}
