import L from "leaflet";
import icon from "../assets/5.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
export const LogoLocalizacion = L.icon({
  iconUrl: icon,
  iconRetinaUrl: icon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: "leaflet-venue-icon",
});
