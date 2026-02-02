import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ScaleControl, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Red marker icon
export const redMarkerIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Component to fit map bounds
function FitBounds({ bounds }) {
  const map = useMap();

  useEffect(() => {
    if (!bounds || bounds.length === 0) return;
    const leafletBounds = L.latLngBounds(bounds);
    map.fitBounds(leafletBounds, { padding: [1000, 1000] });
  }, [bounds, map]);

  return null;
}

// Reset view button
function ResetViewButton({ bounds }) {
  const map = useMap();

  const handleReset = () => {
    if (!bounds || bounds.length === 0) return;
    const leafletBounds = L.latLngBounds(bounds);
    map.fitBounds(leafletBounds, { padding: [1000, 1000] });
  };

  return (
    <button
      onClick={handleReset}
      className="absolute top-2 right-2 bg-white text-sm text-black px-3 py-1 rounded shadow z-[1000] hover:bg-gray-100"
    >
      Reset View
    </button>
  );
}

// Main MapDisplay component
export default function MapDisplay() {
  const defaultMarkers = [
    {
        id: 1,
        position: [54.5757, -0.9717], // updated to exact address
        title: "Rushpool Hall Wedding Venue\nSaltburn Ln, Saltburn-by-the-Sea TS12 1HD",
    },
];

  const allPositions = defaultMarkers.map(m => m.position);

  return (
    <MapContainer
    center={[54.5817, -0.9855]}  // center map on Rushpool Hall
    zoom={1}                    // zoom in closer for venue
    scrollWheelZoom={true}
    className="leaflet-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {defaultMarkers.map(({ id, position, title }) => (
        <Marker key={id} position={position}>
          <Popup>
            {title.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Popup>
        </Marker>
      ))}

      <ScaleControl position="bottomleft" />
      <FitBounds bounds={allPositions} />
      <ResetViewButton bounds={allPositions} />
    </MapContainer>
  );
}

