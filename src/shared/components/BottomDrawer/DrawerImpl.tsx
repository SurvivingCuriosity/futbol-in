"use client";
import React, { useRef } from 'react';
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { rubberbandModifier } from './modifiers';
import { Sheet } from './Sheet';
import { Region } from './constants';
import { DropRegions } from './DropRegions';

export interface Props {
  accessibilityLabel?: string;
  children: React.ReactNode;
  header: React.ReactNode;
  label?: string;
  expanded: boolean;
  onChange: (expanded: boolean) => void;
  maxHeight?: string;
}

const modifiers = [restrictToVerticalAxis, rubberbandModifier];

export function DrawerImpl({
  children,
  expanded,
  header,
  onChange,
  maxHeight,
}: Props) {
  console.log("Drawer render (client)");

  const tracked = useRef({
    distance: 0,
    timestamp: 0,
    velocity: 0,
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 25,
        tolerance: 40,
      },
    })
  );

  return (
    <DndContext
      autoScroll={false}
      modifiers={modifiers}
      sensors={sensors}
      onDragMove={({ delta }) => {
        // Track drag velocity
        const timestamp = Date.now();
        const timeDelta = timestamp - tracked.current.timestamp;
        const distance = tracked.current.distance - delta.y;
        const velocity = Math.round((distance / timeDelta) * 1000);

        tracked.current = {
          distance: delta.y,
          velocity,
          timestamp,
        };
      }}
      onDragEnd={handleDragEnd}
    >
      <div className="Drawer z-20">
        <Sheet expanded={expanded} header={header} maxHeight={maxHeight}>
          {children}
        </Sheet>
        <DropRegions />
      </div>
    </DndContext>
  );

  function handleDragEnd({ over }: DragEndEvent) {
    const { velocity } = tracked.current;

    if (Math.abs(velocity) > 500) {
      // Directional velocity is high => expand/collapse
      onChange(velocity > 0);
    } else if (over) {
      const expanded = over.id === Region.Expand;
      onChange(expanded);
    }

    tracked.current = {
      distance: 0,
      timestamp: 0,
      velocity: 0,
    };
  }
}
