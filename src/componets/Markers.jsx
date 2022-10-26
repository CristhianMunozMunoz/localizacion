import React, { useEffect, useMemo, useRef, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { LogoLocalizacion } from "./LogoLocalizacion";
import { LogoHome } from "./LogoHome";
import comercios from "../assets/data";
import fetchData from "../utils/fetchData";

const url = process.env.REACT_APP_URL_LOCALIZACION;
const Markers = () => {
  /*  const comercios2 = [
    {
      ID: 16522,
      COMERCIO: "PLATIK - PAPELERIA DE LA 119",
      LATITUD: 4.5982783,
      LONGITUD: -74.1357292,
    },
    {
      ID: 16522,
      COMERCIO: "PLATIK - PAPELERIA DE LA 119",
      LATITUD: 4.5977783,
      LONGITUD: -74.1357292,
    },
    {
      ID: 12035,
      COMERCIO: "PLATIK - R ANDREA CAROLINA MALDONADO SALAMANCA",
      LATITUD: 0,
      LONGITUD: 0,
    },
    {
      ID: 15619,
      COMERCIO: "PLATIK - SERCOPIAS RYR",
      LATITUD: 4.60971,
      LONGITUD: -74.08175,
    },
    {
      ID: 14720,
      COMERCIO: "PLATIK - DROGUER�A MEDITERRANEO 157",
      LATITUD: 4.7316953,
      LONGITUD: -74.024234,
    },
    {
      ID: 15413,
      COMERCIO: "PLATIK - MI PAPELERIA",
      LATITUD: 4.7405359,
      LONGITUD: -74.031113,
    },
  ]; */

  const [ubicacion, setUbicacion] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [ubicacionCercana, setUbicacionCercana] = useState("");
  const [latitudArriba, setLatitudArriba] = useState("");
  const [latitudAbajo, setLatitudAbajo] = useState("");
  const [longitudArriba, setLongitudArriba] = useState("");
  const [longitudAbajo, setLongitudAbajo] = useState("");

  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          /* console.log(marker.getLatLng().lat); */
          // setUbicacion(marker.getLatLng());
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
        /* console.log(position.coords.longitude);
        console.log(position.coords.latitude); */
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

  /*   useEffect(() => {
    setLatitudArriba(ubicacion.latitude + 0.01);
    setLatitudAbajo(ubicacion.latitude - 0.01);
    setLongitudArriba(ubicacion.longitude + 0.01);
    setLongitudAbajo(ubicacion.longitude - 0.01);
    console.log(ubicacion);
  }, [ubicacion]); */
  /* const filtrarDatos = () => {
    let latitudArriba = ubicacion.latitude + 0.01;
    let latitudAbajo = ubicacion.latitude - 0.01;
    let longitudArriba = ubicacion.longitude + 0.01;
    let longitudAbajo = ubicacion.longitude - 0.01;
    console.log("Arriba:", latitudArriba, "Abajo:", latitudAbajo);
  
    let datosFiltrados = comercios.filter(
      (comerce) =>
        comerce["LATITUD"] >= latitudAbajo &&
        comerce["LATITUD"] <= latitudArriba &&
        comerce["LONGITUD"] >= longitudAbajo &&
        comerce["LONGITUD"] <= longitudArriba
    );
    console.log("datos filtrados", datosFiltrados);
    setUbicacionCercana(datosFiltrados);
  };

  useEffect(() => {
    filtrarDatos();
  }, [ubicacion]); */

  /*   useEffect(() => {
    if (ubicacion.latitude !== 0 && ubicacion.longitude !== 0) {
      const latitudArriba = ubicacion.latitude + 0.009;
      const latitudAbajo = ubicacion.latitude - 0.009;
      const longitudArriba = ubicacion.longitude + 0.009;
      const longitudAbajo = ubicacion.longitude - 0.009;
      fetchData(
        `${url}/rangos?longitud_inicio=${longitudAbajo}&longitud_fin=${longitudArriba}&latitud_inicio=${latitudAbajo}&latitud_fin=${latitudArriba}`,
        "GET"
      ).then((res) => {
        // console.log("resultados fetch", res.obj.results);
        setUbicacionCercana(res.obj.results);
      });
    }
  }, [ubicacion]); */
  useEffect(() => {
    if (ubicacion.latitude !== 0 && ubicacion.longitude !== 0) {
      /*       const latitudArriba = ubicacion.latitude + 0.009;
      const latitudAbajo = ubicacion.latitude - 0.009;
      const longitudArriba = ubicacion.longitude + 0.009;
      const longitudAbajo = ubicacion.longitude - 0.009; */
      fetchData(
        `${url}/rangos?longitud_inicio=${ubicacion.longitude}&latitud_inicio=${ubicacion.latitude}`,
        "GET"
      ).then((res) => {
        /*  console.log("resultados fetch", res); */
        setUbicacionCercana(res.obj.results);
      });
    }
  }, [ubicacion]);

  return (
    <div>
      {ubicacionCercana !== "" ? (
        <div>
          <Marker
            position={{
              lat: ubicacion.latitude,
              lng: ubicacion.longitude,
            }}
            draggable={true}
            icon={LogoHome}
            eventHandlers={eventHandlers}
            ref={markerRef}
          >
            <Popup>Tú estas aqui !!</Popup>
          </Marker>
          {ubicacionCercana &&
            ubicacionCercana.map((comercio, i) => {
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
