import L from "leaflet";
import icon from "../assets/logo.svg";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
export const LogoHome = L.icon({
  iconUrl: icon,
  iconRetinaUrl: icon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [40, 40],
  className: "leaflet-venue-icon",
});
