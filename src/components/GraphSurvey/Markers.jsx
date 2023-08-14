import React, { useEffect, useState, useMemo } from "react";
import { Marker, Popup } from "react-leaflet";
import { MapContainer, TileLayer } from "react-leaflet";

const Markers = ({ selectedQuestion, surveyId, locations }) => {
  const [markers, setMarkers] = useState([]);

  const colorMap = useMemo(() => {
    return {
      azul: "blue",
      rojo: "red",
      verde: "green",
    };
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_PUBLIC_DATA}/get/${surveyId}`
        );
        const data = await response.json();
        setMarkers(data);
      } catch (error) {
        console.log("Error al obtener los datos:", error);
      }
    }
    fetchData();
  }, [surveyId]);

  const filteredMarkers = markers.filter((marker) => {
    const selectedResponse = marker.responses.find(
      (response) => Object.keys(response)[0] === selectedQuestion
    );
    return selectedResponse !== undefined;
  });

  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {filteredMarkers.map((marker) => {
        const selectedResponse = marker.responses.find(
          (response) => Object.keys(response)[0] === selectedQuestion
        );
        const color =
          selectedResponse !== undefined
            ? colorMap[selectedResponse[selectedQuestion]] || "gray"
            : "gray";
        const answer = selectedResponse
          ? selectedResponse[selectedQuestion]
          : "";
        return (
          <Marker
            key={marker.id}
            position={[marker.location.latitude, marker.location.longitude]}
            icon={
              new L.Icon({
                iconUrl: "/icons/" + color + ".svg",
                iconSize: [13, 19],
                iconAnchor: [14, 12],
                popupAnchor: [6, -8],
                shadowAnchor: [4, 62],
              })
            }
          >
            <Popup>
              {answer}
              <br />
              {`Latitud: ${marker.location.latitude}`}
              <br />
              {`Longitud: ${marker.location.longitude}`}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default Markers;
