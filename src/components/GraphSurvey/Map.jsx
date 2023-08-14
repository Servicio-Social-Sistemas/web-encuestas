import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = ({ locations }) => {
  return (
    <MapContainer
      center={[0, 0]}
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.location.latitude, location.location.longitude]}
        >
          <Popup>
            <div>
              <h3>{location.name}</h3>
              <p>{location.description}</p>
              <p>Latitud: {location.location.latitude}</p>
              <p>Longitud: {location.location.longitude}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
