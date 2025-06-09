"use client";

import Link from "next/link";
import { DataTable } from "../../../shared/components/Table/Table";
import { Column } from "../../../shared/components/Table/types";
import { TarjetaStats } from "./TarjetaStats";

export interface UsuarioEnRanking {
  id: string;
  posicion: number;
  usuario: string;
  spotsCreados: number;
  spotsVotados: number;
  spotsVerificados: number;
  puntuacion: number;
}

const columns: Column<UsuarioEnRanking>[] = [
  {
    key: "posicion",
    header: (sortState) => (
      <span>
        Posicion
        {sortState.columnKey === "posicion" && (
          <span className="ml-1">
            {sortState.direction === "asc" ? "▲" : "▼"}
          </span>
        )}
      </span>
    ),
    accessor: (row) => row.posicion,
    sortable: true,
    cell: ({ row }) => {
      // JSX personalizado en la celda
      return <strong className="text-primary">#{row.posicion || 0}</strong>;
    },
  },
  {
    key: "usuario",
    header: "Usuario",
    accessor: (row) => row.usuario,
    sortable: false,
    cell: ({ row }) => {
      // JSX personalizado en la celda
      return <Link className="underline" href={`/user/${row.usuario}?from=competitivo/ranking`}>{row.usuario}</Link>;
    },
  },
  {
    key: "spotsCreados",
    header: (sortState) => (
      <span>
        Spots creados
        {sortState.columnKey === "age" && (
          <span className="ml-1">
            {sortState.direction === "asc" ? "▲" : "▼"}
          </span>
        )}
      </span>
    ),
    accessor: (row) => row.spotsCreados,
    sortable: true,
    sortFn: (a, b) => a.spotsCreados - b.spotsCreados, // Ejemplo de sortFn personalizado
    cell: ({ row }) => {
      // JSX personalizado en la celda
      return (
        <TarjetaStats value={row.spotsCreados} kind="agregados" />
      );
    },
  },
  {
    key: "spotsVotados",
    header: (sortState) => (
      <span>
        Spots votados
        {sortState.columnKey === "age" && (
          <span className="ml-1">
            {sortState.direction === "asc" ? "▲" : "▼"}
          </span>
        )}
      </span>
    ),
    accessor: (row) => row.spotsVotados,
    sortable: true,
    sortFn: (a, b) => a.spotsVotados - b.spotsVotados, // Ejemplo de sortFn personalizado
    cell: ({ row }) => {
      // JSX personalizado en la celda
      return (
        <TarjetaStats value={row.spotsVotados} kind="votados" />
      );
    },
  },
  {
    key: "spotsVerificados",
    header: (sortState) => (
      <span>
        Spots verificados
        {sortState.columnKey === "age" && (
          <span className="ml-1">
            {sortState.direction === "asc" ? "▲" : "▼"}
          </span>
        )}
      </span>
    ),
    accessor: (row) => row.spotsVerificados,
    sortable: true,
    sortFn: (a, b) => a.spotsVerificados - b.spotsVerificados, // Ejemplo de sortFn personalizado
    cell: ({ row }) => {
        // JSX personalizado en la celda
        return (
          <TarjetaStats value={row.spotsVerificados} kind="verificados" />
        );
      },
  },
  {
    key: "puntuacion",
    header: (sortState) => (
      <span>
        Puntuación
        {sortState.columnKey === "age" && (
          <span className="ml-1">
            {sortState.direction === "asc" ? "▲" : "▼"}
          </span>
        )}
      </span>
    ),
    accessor: (row) => row.puntuacion,
    sortable: true,
    sortFn: (a, b) => a.puntuacion - b.puntuacion, // Ejemplo de sortFn personalizado
    cell: ({ row }) => {
      // JSX personalizado en la celda
      return <strong>{row.puntuacion || 0}</strong>;
    },
  },
];

export default function TablaRankingUsuarios({users}:{users: UsuarioEnRanking[]}) {
  return <DataTable data={users} columns={columns} />;
}
