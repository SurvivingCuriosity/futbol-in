"use client";

import { EnfrentamientoDTO } from "@/server/models/Enfrentamiento/Enfrentamiento.model";
import { EquipoDTO } from "@/server/models/Equipo/EquipoDTO";
import { PartidoDTO } from "@/server/models/Partido/Partido.model";
import { faCheck, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { use, useState } from "react";
import { PartidosLigaContext } from "./PartidosLigaContex";

export const TarjetaEnfrentamiento = ({
  enfrentamiento,
  equipoA,
  equipoB,
}: {
  enfrentamiento: EnfrentamientoDTO;
  equipoA: EquipoDTO | undefined;
  equipoB: EquipoDTO | undefined;
}) => {
  const [editing, setEditing] = useState(false);

  const { equipoInscrito, isOwner, configEnfrentamiento } =
    use(PartidosLigaContext);

  const [partidos, setPartidos] = useState<PartidoDTO[]>(
    enfrentamiento.partidos.length > 0
      ? enfrentamiento.partidos
      : new Array(configEnfrentamiento.cantidadPartidos).fill({
          enfrentamiento: enfrentamiento.competicion,
          equipoA: enfrentamiento.equipoA,
          equipoB: enfrentamiento.equipoB,
          golesEquipoA: 0,
          golesEquipoB: 0,
          finalizado: false,
          ganador: null,
        } as PartidoDTO)
  );

  const handleChangeGolesEquipoA = (index: number, valor: number) => {
    const copy = [...partidos];
    copy[index] = {
      ...copy[index],
      golesEquipoA: valor,
    };
    setPartidos(copy);
  };

  const handleChangeGolesEquipoB = (index: number, valor: number) => {
    const copy = [...partidos];
    copy[index] = {
      ...copy[index],
      golesEquipoB: valor,
    };
    setPartidos(copy);
  };

  const jugadorLogadoEsEquipoA = equipoInscrito?.id === equipoA?.id;
  const jugadorLogadoEsEquipoB = equipoInscrito?.id === equipoB?.id;

  const handleEdit = () => {
    setEditing(true);
  };

  const handleUpdateResultado = () => {
    setEditing(false);
    console.log(partidos);
  };

  const handleCancelUpdate = () => {
    setEditing(false);
  };

  return (
    <div className="bg-neutral-900 rounded-lg border border-neutral-700 flex flex-row">
      <div className="flex flex-col">
        <RowJugador
          enfrentamiento={enfrentamiento}
          nombreEquipo={equipoA?.nombreEquipo}
          esJugadorLogeado={jugadorLogadoEsEquipoA}
          isTop
          editing={editing}
        />
        <RowJugador
          enfrentamiento={enfrentamiento}
          nombreEquipo={equipoB?.nombreEquipo}
          esJugadorLogeado={jugadorLogadoEsEquipoB}
          editing={editing}
        />
      </div>
      <div className="flex flex-row">
        {partidos.map((p, i) => (
          <CeldaPartido
            key={p.equipoA + p.equipoB+i}
            partido={p}
            editing={editing}
            index={i}
            handleChangeGolesEquipoA={handleChangeGolesEquipoA}
            handleChangeGolesEquipoB={handleChangeGolesEquipoB}
          />
        ))}
      </div>
      <div className="border-neutral-700 flex items-center justify-center w-full">
        {isOwner ||
          jugadorLogadoEsEquipoA ||
          (jugadorLogadoEsEquipoB &&
            (editing ? (
              <div className="flex flex-col gap-2">
                <button onClick={handleUpdateResultado}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button onClick={handleCancelUpdate}>
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            ) : (
              <button onClick={handleEdit}>
                <FontAwesomeIcon icon={faPen} />
              </button>
            )))}
      </div>
    </div>
  );
};

const RowJugador = ({
  nombreEquipo,
  esJugadorLogeado,
  isTop = false,
}: {
  nombreEquipo: string | undefined;
  esJugadorLogeado: boolean;
  enfrentamiento: EnfrentamientoDTO;
  isTop?: boolean;
  editing: boolean;
}) => {
  return (
    <div className="flex">
      <p
        className={`w-32 ${
          esJugadorLogeado ? "text-green-500 bg-primary/5" : "text-neutral-400"
        } col-span-4 border-r ${
          isTop ? "border-b" : ""
        } border-neutral-700 p-2`}
      >
        {nombreEquipo ?? "Equipo desconocido"}
      </p>
    </div>
  );
};

const CeldaPartido = ({
  partido,
  editing,
  index,
  handleChangeGolesEquipoA,
  handleChangeGolesEquipoB,
}: {
  partido: PartidoDTO;
  editing: boolean;
  index: number;
  handleChangeGolesEquipoA: (index: number, valor: number) => void;
  handleChangeGolesEquipoB: (index: number, valor: number) => void;
}) => {
  const { configEnfrentamiento } = use(PartidosLigaContext);

  return (
    <div className="flex flex-col h-full">
      <div
        className={`w-10 h-full border-b border-r border-neutral-700 flex items-center justify-center text-neutral-400 p-1`}
      >
        {editing ? (
          <input
            type="number"
            min={0}
            max={configEnfrentamiento.golesParaGanar}
            className="w-full p-0.5 bg-neutral-100 rounded"
            onChange={(e) => handleChangeGolesEquipoA(index, +e.target.value)}
            value={partido.golesEquipoA === 0 ? "" : partido.golesEquipoA}
          />
        ) : partido.golesEquipoA === 0 ? (
          "-"
        ) : (
          partido.golesEquipoA
        )}
      </div>
      <div
        className={`w-10 h-full border-r border-neutral-700 flex items-center justify-center text-neutral-400 p-1`}
      >
        {editing ? (
          <input
            type="number"
            min={0}
            max={configEnfrentamiento.golesParaGanar}
            onChange={(e) => handleChangeGolesEquipoB(index, +e.target.value)}
            className="w-full p-0.5 bg-neutral-100 rounded"
            value={partido.golesEquipoB === 0 ? "" : partido.golesEquipoB}
          />
        ) : partido.golesEquipoB === 0 ? (
          "-"
        ) : (
          partido.golesEquipoB
        )}
      </div>
    </div>
  );
};
