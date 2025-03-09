import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface ILogro {
  nombre: string;
  descripcion: string;
  icon: IconDefinition;
  steps: number[];
  stepDescription: (n: number) => string;
}
