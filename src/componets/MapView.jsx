import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Markers from "./Markers";
import { LogoLocalizacion } from "./LogoLocalizacion";
import comercios from "../assets/data";
const MapView = () => {
  const position = [0, 0];

  const [ubicacion, setUbicacion] = useState({
    latitude: 0,
    longitude: 0,
  });
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        console.log(position.coords.longitude);
        console.log(position.coords.latitude);
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

  return (
    <div>
      {ubicacion.latitude != 0 && ubicacion.longitude != 0 ? (
        <MapContainer
          center={{
            lat: ubicacion.latitude,
            lng: ubicacion.longitude,
          }}
          zoom={20}
          /*    scrollWheelZoom={true} */
          style={{ width: "100vw", height: "100vh" }}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Markers></Markers>
        </MapContainer>
      ) : (
        ""
      )}
    </div>
  );
};

export default MapView;
