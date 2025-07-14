import { faCheck, faPlus, faThumbsUp, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { IconosLogros } from "futbol-in-core/constants";

export const LogrosIconMap: Record<IconosLogros, IconDefinition> = {
    [IconosLogros.faCheck]: faCheck,
    [IconosLogros.faPlus]: faPlus,
    [IconosLogros.faThumbsUp]: faThumbsUp,
};