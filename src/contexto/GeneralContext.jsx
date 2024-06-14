import React, { useEffect, useMemo, useRef } from "react";
import { useState } from "react";
import { createContext } from "react";
export const ContextoGeneral = createContext();

const GeneralContext = ({ children }) => {
  const [ubicacionPuntero, setUbicacionPuntero] = useState({
    longitude: 0,
    latitude: 0,
  });
  //   const markerRef = useRef(null);
  //   const eventHandlers = useMemo(
  //     () => ({
  //       dragend() {
  //         const marker = markerRef.current;
  //         if (marker != null) {
  //           //   console.log("MArker", marker.getLatLng().lng);
  //           //   console.log("MArker", marker.getLatLng().lat);
  //           setUbicacionPuntero({
  //             longitude: marker.getLatLng().lng,
  //             latitude: marker.getLatLng().lat,
  //           });
  //         }
  //       },
  //     }),
  //     []
  //   );
  //   useEffect(() => {
  //     navigator.geolocation.getCurrentPosition(
  //       function (position) {
  //         // console.log("position", position.coords.longitude);
  //         // console.log("position", position.coords.latitude);
  //         setUbicacionPuntero({
  //           longitude: position.coords.longitude,
  //           latitude: position.coords.latitude,
  //         });
  //       },
  //       function (error) {
  //         console.log(error);
  //       },
  //       {
  //         enableHighAccuracy: true,
  //       }
  //     );
  //   }, []);
  //   useEffect(() => {}, []);

  return (
    <ContextoGeneral.Provider value={{ ubicacionPuntero, setUbicacionPuntero }}>
      {children}
    </ContextoGeneral.Provider>
  );
};

export default GeneralContext;
