import React, { useEffect, useMemo, useRef, useState } from "react";
import { LogoHome } from "./LogoHome";
import fetchData from "../utils/fetchData";
import { Marker, Popup } from "react-leaflet";
import { LogoLocalizacion } from "./LogoLocalizacion";
import classes from "./Makers.module.css";
import { useContext } from "react";
import { ContextoGeneral } from "../contexto/GeneralContext";

const { btnGoogle } = classes;
const url = process.env.REACT_APP_URL_LOCALIZACION;
const Markers = (props) => {
  const { ubicacionPuntero, setUbicacionPuntero } = useContext(ContextoGeneral);
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
          setUbicacionPuntero({
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
        setUbicacionPuntero({
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

  // const openGoogleMaps = (latitude, longitude) => {
  //   const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  //   window.open(googleMapsUrl, "_blank");
  // };
  const openGoogleMaps = (destLat, destLng) => {
    const origin = `${ubicacion.latitude},${ubicacion.longitude}`;
    const destination = `${destLat},${destLng}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    window.open(googleMapsUrl, "_blank");
  };
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
                    lat: comercio["latitud_comercio"],
                    lng: comercio["longitud_comercio"],
                  }}
                  icon={LogoLocalizacion}
                >
                  {" "}
                  <Popup>
                    {comercio["nombre_comercio"]}
                    <br />
                    {comercio["direccion_comercio"]}
                    <br></br>
                    <button
                      className={btnGoogle}
                      onClick={() =>
                        openGoogleMaps(
                          comercio["latitud_comercio"],
                          comercio["longitud_comercio"]
                        )
                      }
                    >
                      VER EN GOOGLE MAPS
                    </button>
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
