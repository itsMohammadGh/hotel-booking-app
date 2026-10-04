import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../Hooks/UseGeoLocation";
import useUrlLocation from "../../Hooks/useUrlLocation";

function Map({ markerlocation }) {
  const [mapCenter, setMapCenter] = useState([51, 3]);
  const [lat, lng] = useUrlLocation();
  const {
    isLoading: isLoadingPosition,
    position: geoLoactionPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLoactionPosition?.lat && geoLoactionPosition?.lng)
      setMapCenter([geoLoactionPosition.lat, geoLoactionPosition.lng]);
  }, [geoLoactionPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={8}
        scrollWheelZoom={true}
      >
        <button onClick={getPosition} className="getLocation">
          {isLoadingPosition ? "Loading..." : "Use Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {markerlocation.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) =>
      navigate(`/bookmark/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
