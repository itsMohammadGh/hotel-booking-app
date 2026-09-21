import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useHotel } from "../../context/HotelsProvider";
import { useState } from "react";

function Map() {
  const { isLoading, hotels } = useHotel();
  const [mapCenter, setMapCenter] = useState([51, 3]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapCenter}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
