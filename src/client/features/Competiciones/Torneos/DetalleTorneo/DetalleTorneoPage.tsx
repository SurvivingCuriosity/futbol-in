import { TorneoDTO } from "futbol-in-core/types";
import { MainInfoTorneo } from "./components/MainInfoTorneo";

export const DetalleTorneoPage = (props: {
  competicion: TorneoDTO;
}) => {
  const { competicion } = props;

  return (
    <>
        <MainInfoTorneo competicion={competicion} />
    </>
  );
};
