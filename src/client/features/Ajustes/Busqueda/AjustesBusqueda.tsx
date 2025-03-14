import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { ContainerAjustes } from "../components/ContainerAjustes";
import { InlinePicker } from "futbol-in-ui";
import { Ajuste } from "../components/Ajuste";

export const AjustesBusqueda = () => {
  return (
    <ContainerAjustes titulo="Busqueda" icono={faMagnifyingGlass}>
      <Ajuste
        titulo="Radio de búsqueda"
        descripcion="Elige una opción más alta si vives en una ciudad grande o si quieres encontrar spots en municipios de alrededor"
      >
        <InlinePicker
          onTabClick={() => {}}
          options={[
            { id: 0, label: "5km" },
            { id: 1, label: "10km" },
            { id: 2, label: "20km" },
            { id: 3, label: "50km" },
          ]}
        />
      </Ajuste>
    </ContainerAjustes>
  );
};
