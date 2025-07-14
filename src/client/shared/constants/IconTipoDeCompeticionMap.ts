import { TipoCompeticion } from "futbol-in-core/enum";
import { faCrown, faSitemap, IconDefinition } from "@fortawesome/free-solid-svg-icons";

export const iconTipoDeCompeticionMap:Record<TipoCompeticion, IconDefinition> = {
    [TipoCompeticion.TORNEO]: faSitemap,
    [TipoCompeticion.LIGA]: faCrown,
    [TipoCompeticion.TORNEO_CON_CLASIFICATORIA]: faCrown,
}