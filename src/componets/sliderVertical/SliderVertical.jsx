import Classes from "./SliderVertical.module.css";
import { useContext, useState } from "react";
import { ContextoGeneral } from "../../contexto/GeneralContext";
const {
  cardInfo,
  card,
  sliderVertical,
  image,
  noDataMessage,
  noDataImage,
  pagination,
  next,
  prev,
  numeroPaginacion,
  world,
  contendorBotones,
  seleccionado,
  google,
  distanciaP,
} = Classes;
const SliderVertical = ({ data, onOpcionSeleccionada }) => {
  const { ubicacionPuntero, setUbicacionPuntero } = useContext(ContextoGeneral);
  // import moverCursorImage from "../../assets/moverPuntos.png";
  console.log("ubicacion punteroooo", ubicacionPuntero);

  const itemsPerPage = 3; // Número de comercios por página
  const [currentPage, setCurrentPage] = useState(1);

  const [opcionSeleccionada, setOpcionSeleccionada] = useState("puntosPago");
  const handleSeleccionarOpcion = (opcion) => {
    setOpcionSeleccionada(opcion);
    onOpcionSeleccionada(opcion);
  };

  // Calcular el índice inicial y final de los comercios para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Obtener los comercios de la página actual
  const currentPageData = data?.slice(startIndex, endIndex);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  // Función para cambiar a la página siguiente
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Función para cambiar a la página anterior
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openGoogleMaps = (destLat, destLng) => {
    const origin = `${ubicacionPuntero.latitude},${ubicacionPuntero.longitude}`;
    const destination = `${destLat},${destLng}`;
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    window.open(googleMapsUrl, "_blank");
  };
  const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en kilómetros
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distancia = R * c; // Distancia en kilómetros
    const distanciaEnMetros = distancia * 1000; // Convertir a metros
    return distanciaEnMetros;
  };
  return (
    <div className={sliderVertical}>
      <div className={contendorBotones}>
        <button
          className={opcionSeleccionada === "puntosPago" ? seleccionado : ""}
          onClick={() => handleSeleccionarOpcion("puntosPago")}
        >
          Puntos de pago
        </button>
        <button
          className={
            opcionSeleccionada === "retiroSubsidio" ? seleccionado : ""
          }
          onClick={() => handleSeleccionarOpcion("retiroSubsidio")}
        >
          Retiro Subsidios
        </button>
      </div>

      {currentPageData?.length > 0 ? (
        currentPageData?.map((item, index) => {
          const distancia = calcularDistancia(
            ubicacionPuntero.latitude,
            ubicacionPuntero.longitude,
            item["latitud_comercio"],
            item["longitud_comercio"]
          );
          return (
            <div className={card} key={index}>
              <div className={image}></div>
              <div className={cardInfo}>
                <h3>{item.nombre_comercio}</h3>
                <p>{item.direccion_comercio}</p>
              </div>
              <div
                className={google}
                title={"VER EN GOOGLE MAPS"}
                onClick={() => {
                  // console.log(
                  //   "COORDENADAS",
                  //   item["latitud_comercio"],
                  //   item["longitud_comercio"]
                  // );

                  openGoogleMaps(
                    item["latitud_comercio"],
                    item["longitud_comercio"]
                  );
                }}
              >
                <p className={distanciaP}>{`${distancia.toFixed(2)}m`}</p>
              </div>
            </div>
          );
        })
      ) : (
        <div className={noDataMessage}>
          <h1>No hay puntos cercanos</h1>
          <p>Mueva el cursor para encontrar el punto de pago más cercano</p>
          {/* <img className={noDataImage} src={moverCursorImage} alt="No Data" /> */}
          <div className={world}></div>
        </div>
      )}
      {data?.length > itemsPerPage && (
        <div className={pagination}>
          <button
            className={prev}
            onClick={prevPage}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          ></button>
          <span className={numeroPaginacion}>{currentPage}</span>
          <button
            className={next}
            onClick={nextPage}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
          ></button>
        </div>
      )}
    </div>
  );
};

export default SliderVertical;
