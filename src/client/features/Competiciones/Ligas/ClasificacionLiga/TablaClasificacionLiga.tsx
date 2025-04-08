import { DataTable } from "@/client/shared/components/Table/Table";
import { Column } from "@/client/shared/components/Table/types";
import { EnfrentamientoDTO } from "@/server/models/Enfrentamiento/Enfrentamiento.model";
import { EquipoConEstadoDTO } from "@/server/models/Equipo/EquipoDTO";

export const TablaClasificacionLiga = ({
  equipos,
  enfrentamientos,
}: {
  equipos: EquipoConEstadoDTO[];
  enfrentamientos: EnfrentamientoDTO[];
}) => {
  interface TableRow {
    pos: number;
    equipo: string;
    pj: number;
    pg: number;
    pp: number;
    gf: number;
    gc: number;
    pts: number;
  }

  const sampleDataClasificacion: TableRow[] = equipos.map((e, i) => ({
    pos: i + 1,
    equipo: e.nombreEquipo,
    pj: enfrentamientos.filter((e) => e.equipoA === e.id || e.equipoB === e.id).length,
    pg: enfrentamientos.filter((e) => e.ganador === e.id).length,
    pp: 10,
    gf: 10,
    gc: 10,
    pts: 10,
  }));

  const columns: Column<TableRow>[] = [
    {
      key: "posicion",
      header: (sortState) => (
        <span>
          Pos.
          {sortState.columnKey === "posicion" && (
            <span className="ml-1">
              {sortState.direction === "asc" ? "▲" : "▼"}
            </span>
          )}
        </span>
      ),
      accessor: (row) => row.pos,
      sortable: true,
      sortFn: (a, b) => a.pos - b.pos,
      cell: ({ row }) => <strong>#{row.pos}</strong>,
    },
    {
      key: "equipo",
      header: "Equipo",
      accessor: (row) => row.equipo,
      sortable: false,
    },
    {
      key: "pj",
      header: (sortState) => (
        <span>
          PJ
          {sortState.columnKey === "pj" && (
            <span className="ml-1">
              {sortState.direction === "asc" ? "▲" : "▼"}
            </span>
          )}
        </span>
      ),
      accessor: (row) => row.pj,
      sortable: true,
      sortFn: (a, b) => a.pj - b.pj,
    },
    {
      key: "pg",
      header: (sortState) => (
        <span>
          PG
          {sortState.columnKey === "pg" && (
            <span className="ml-1">
              {sortState.direction === "asc" ? "▲" : "▼"}
            </span>
          )}
        </span>
      ),
      accessor: (row) => row.pg,
      sortable: true,
      sortFn: (a, b) => a.pg - b.pg,
    },
    {
      key: "pp",
      header: (sortState) => (
        <span>
          PP
          {sortState.columnKey === "pp" && (
            <span className="ml-1">
              {sortState.direction === "asc" ? "▲" : "▼"}
            </span>
          )}
        </span>
      ),
      accessor: (row) => row.pp,
      sortable: true,
      sortFn: (a, b) => a.pp - b.pp,
    },
    {
      key: "gf",
      header: (sortState) => (
        <span>
          GF
          {sortState.columnKey === "gf" && (
            <span className="ml-1">
              {sortState.direction === "asc" ? "▲" : "▼"}
            </span>
          )}
        </span>
      ),
      accessor: (row) => row.gf,
      sortable: true,
      sortFn: (a, b) => a.gf - b.gf,
    },
    {
      key: "gc",
      header: (sortState) => (
        <span>
          GC
          {sortState.columnKey === "gc" && (
            <span className="ml-1">
              {sortState.direction === "asc" ? "▲" : "▼"}
            </span>
          )}
        </span>
      ),
      accessor: (row) => row.gc,
      sortable: true,
      sortFn: (a, b) => a.gc - b.gc,
    },
    {
      key: "pts",
      header: (sortState) => (
        <span>
          PTS
          {sortState.columnKey === "pts" && (
            <span className="ml-1">
              {sortState.direction === "asc" ? "▲" : "▼"}
            </span>
          )}
        </span>
      ),
      accessor: (row) => row.pts,
      sortable: true,
      sortFn: (a, b) => a.pts - b.pts,
    },
  ];

  return <DataTable data={sampleDataClasificacion} columns={columns} />;
};
