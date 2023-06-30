import React, { useEffect, useMemo, useRef, useState } from "react";
import { LogoHome } from "./LogoHome";
import fetchData from "../utils/fetchData";
import { Marker, Popup } from "react-leaflet";
import { LogoLocalizacion } from "./LogoLocalizacion";

const url = process.env.REACT_APP_URL_LOCALIZACION;
const Markers = (props) => {
  // console.log("este es la opcion", props?.opcionSeleccionada);
  const [ubicacion, setUbicacion] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [ubicacionCercana, setUbicacionCercana] = useState("");
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setUbicacion({
            longitude: marker.getLatLng().lng,
            latitude: marker.getLatLng().lat,
          });
        }
      },
    }),
    []
  );
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setUbicacion({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
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

  useEffect(() => {
    props?.enviarDatos(ubicacionCercana);
  }, [ubicacionCercana]);

  useEffect(() => {
    if (
      ubicacion.latitude !== 0 &&
      ubicacion.longitude !== 0 &&
      props?.opcionSeleccionada === "retiroSubsidio"
    ) {
      fetchData(
        `${url}/img/rangos?longitud_inicio=${ubicacion?.longitude}&latitud_inicio=${ubicacion?.latitude}`,
        "GET"
      ).then((res) => {
        // console.log("img", res?.obj?.results);
        setUbicacionCercana(res?.obj?.results);
      });
    } else if (
      ubicacion.latitude !== 0 &&
      ubicacion.longitude !== 0 &&
      props?.opcionSeleccionada === "puntosPago"
    ) {
      fetchData(
        `${url}/rangos?longitud_inicio=${ubicacion?.longitude}&latitud_inicio=${ubicacion?.latitude}`,
        "GET"
      ).then((res) => {
        // console.log("rangos", res?.obj?.results);
        setUbicacionCercana(res?.obj?.results);
      });
    }
  }, [ubicacion, props?.opcionSeleccionada]);

  return (
    <div>
      {ubicacionCercana !== "" ? (
        <div>
          <Marker
            position={{
              lat: ubicacion?.latitude,
              lng: ubicacion?.longitude,
            }}
            draggable={true}
            icon={LogoHome}
            eventHandlers={eventHandlers}
            ref={markerRef}
          >
            <Popup>Tú estas aqui !!</Popup>
          </Marker>
          {ubicacionCercana &&
            ubicacionCercana?.map((comercio, i) => {
              return (
                <Marker
                  key={i}
                  position={{
                    lat: comercio["latitud"],
                    lng: comercio["longitud"],
                  }}
                  icon={LogoLocalizacion}
                >
                  {" "}
                  <Popup>
                    {comercio["comercio"]}
                    <br />
                    {comercio["direccion"]}
                  </Popup>
                </Marker>
              );
            })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export default Markers;
