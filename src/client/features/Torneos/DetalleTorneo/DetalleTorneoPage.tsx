import { CompeticionDTO } from "@/server/models/Competicion/CompeticionDTO";
import { MainInfo } from "./components/MainInfo";

export const DetalleCompeticionPage = (props: {
  competicion: CompeticionDTO;
}) => {
  const { competicion } = props;

  return (
    <>
        <MainInfo competicion={competicion} />
    </>
  );
};
