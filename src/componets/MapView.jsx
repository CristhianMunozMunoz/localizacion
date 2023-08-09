import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Markers from "./Markers";
import SliderVertical from "./sliderVertical/SliderVertical";
import Classes from "./MapViews.module.css";
const MapView = () => {
  const { gridContainerMapa, ContenedorSlide, ContenedorMapa, mapa } = Classes;
  // const position = [0, 0];
  const [datos, setDatos] = useState([]);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("puntosPago");

  const recibirDatos = (data, tipoBus) => {
    setDatos(data);
  };
  const recibirOpcionSeleccionada = (opcion) => {
    setOpcionSeleccionada(opcion);
  };
  const [ubicacion, setUbicacion] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setUbicacion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      function (error) {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  useEffect(() => {}, []);
  // const handleOpcionSeleccionada = (opcion) => {
  //   // Aquí puedes hacer algo con el valor de la opción seleccionada
  //   // console.log(opcion);
  // };

  return (
    <div>
      {ubicacion.latitude !== 0 && ubicacion.longitude !== 0 ? (
        <div className={gridContainerMapa}>
          <div className={ContenedorSlide}>
            <SliderVertical
              data={datos}
              onOpcionSeleccionada={recibirOpcionSeleccionada}
            ></SliderVertical>
          </div>
          <div className={ContenedorMapa}>
            <MapContainer
              className={mapa}
              center={{
                lat: ubicacion.latitude,
                lng: ubicacion.longitude,
              }}
              zoom={15}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Markers
                datos={datos}
                enviarDatos={recibirDatos}
                opcionSeleccionada={opcionSeleccionada}
              ></Markers>
            </MapContainer>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MapView;
