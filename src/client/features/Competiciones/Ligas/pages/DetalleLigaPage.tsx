import { LigaDTO } from "@/server/models/Competicion/Ligas/LigaDTO";
import { MainInfoLiga } from "../DetalleLiga/MainInfoLiga";


export const DetalleLigaPage = (props: {
  competicion: LigaDTO;
}) => {
  const { competicion } = props;

  return (
    <>
        <MainInfoLiga competicion={competicion} />
    </>
  );
};
