import { TorneoDTO } from "@/server/models/Competicion/Torneos/TorneoDTO";
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
