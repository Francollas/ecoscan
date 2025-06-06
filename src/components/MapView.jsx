import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Papa from "papaparse";

const gladCsvUrl =
  "https://data-api.globalforestwatch.org/dataset/glad-alerts/latest/download?iso=MOZ&type=csv";

const MapView = ({ startDate, endDate }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchCsvData = async () => {
      try {
        const response = await fetch(gladCsvUrl);
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const parsed = results.data
              .map((row, index) => {
                const lat = parseFloat(row["lat"]);
                const lon = parseFloat(row["lon"]);
                const date = row["alert__date"];

                if (!lat || !lon || !date) return null;

                if (
                  (startDate && date < startDate) ||
                  (endDate && date > endDate)
                ) {
                  return null;
                }

                return {
                  id: index,
                  lat,
                  lon,
                  date,
                  source: "GLAD",
                };
              })
              .filter(Boolean);

            setAlerts(parsed);
          },
        });
      } catch (error) {
        console.error("Erro ao carregar dados GLAD:", error);
      }
    };

    fetchCsvData();
  }, [startDate, endDate]);

  return (
    <MapContainer
      center={[-18.5, 35]}
      zoom={5}
      style={{ flexGrow: 1, width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {alerts.map((alert) => (
        <Marker
          key={alert.id}
          position={[alert.lat, alert.lon]}
          icon={L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            iconSize: [25, 25],
          })}
        >
          <Popup>
            <strong>Fonte:</strong> {alert.source} <br />
            <strong>Data:</strong> {alert.date}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;