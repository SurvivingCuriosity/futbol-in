import { ReactNode } from "react";

/**
 * Estado de ordenación de la tabla.
 */
export interface SortState {
  columnKey: string | null;
  direction: "asc" | "desc";
}

/**
 * Parámetros opcionales para renderizar el encabezado.
 * Si 'header' es una función, puede recibir el estado de ordenación.
 */
export type HeaderRender =
  | ReactNode
  | ((sortState: SortState) => ReactNode);

/**
 * Parámetros opcionales para renderizar la celda.
 */
export interface CellRenderParams<T> {
  row: T;
  rowIndex: number;
  column: Column<T>;
}

export type CellRender<T> =
  | ReactNode
  | ((params: CellRenderParams<T>) => ReactNode);

/**
 * Definición de cada columna.
 */
export interface Column<T> {
  /**
   * Identificador único de la columna (usado para la ordenación).
   */
  key: string;

  /**
   * Contenido del encabezado. Puede ser un texto, JSX
   * o una función que reciba el estado de ordenación.
   */
  header?: HeaderRender;

  /**
   * Cómo se obtiene el valor de la columna para cada fila.
   */
  accessor?: (row: T) => string | number;

  /**
   * Render personalizado para la celda. Puede ser
   * un ReactNode o una función que recibe el row y la columna.
   */
  cell?: CellRender<T>;

  /**
   * Indica si la columna admite ordenación.
   */
  sortable?: boolean;

  /**
   * Función de ordenación personalizada.
   * (Se usará si la columna es 'sortable'.)
   */
  sortFn?: (a: T, b: T) => number;
}

/**
 * Props principales del DataTable.
 */
export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  initialSortState?: SortState;
}