import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "./IPTracker.css";

const defaultPosition = [0, 0];

const IPTracker = () => {
  const [ip, setIp] = useState("");
  const [info, setInfo] = useState(null);
  const [error, setError] = useState("");
  const [position, setPosition] = useState(defaultPosition);

  const markerRef = useRef(null);

  const handleSearch = async () => {
    setError("");
    if (!isValidInput(ip)) {
      setError("Invalid IP or domain format");
      return;
    }

    try {
      const apiKey = await fetchApiKey();
      const data = await fetchData(ip, apiKey);

      if (!data?.location?.city || !data?.isp) {
        setError("Invalid data received. Try another IP or domain.");
        setInfo(null);
        setPosition(defaultPosition);
        return;
      }

      setInfo(data);
      setPosition([data.location.lat, data.location.lng]);
    } catch (err) {
      setError("Error fetching data");
      setInfo(null);
    }
  };

  const isValidInput = (input) => {
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
    const domainRegex = /^(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return ipRegex.test(input) || domainRegex.test(input);
  };

  const fetchApiKey = async () => {
    const res = await fetch("/api-key");
    if (!res.ok) throw new Error("API Key fetch failed");
    const data = await res.json();
    return data.apiKey;
  };

  const fetchData = async (ipValue, apiKey) => {
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ipValue}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Geo API fetch failed");
    return res.json();
  };

  const customIcon = new L.Icon({
    iconUrl: "/img/icon-location.svg",
    iconSize: [25, 36],
    iconAnchor: [12, 75],
    popupAnchor: [-3, -76],
  });

  return (
    <div className="ip-tracker">
      <div className="input-container">
        <input
          type="text"
          placeholder="Search for any IP address or domain"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-submit">
          Search
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      <div className="info">
        <div>IP Address: {info?.ip || "-/-"}</div>
        <div>Location: {info?.location?.city || "-/-"}</div>
        <div>Timezone: {info?.location?.timezone || "-/-"}</div>
        <div>ISP: {info?.isp || "-/-"}</div>
      </div>

      <div className="map-container">
        <MapContainer
          center={position}
          zoom={position === defaultPosition ? 2 : 10}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position !== defaultPosition && (
            <Marker position={position} icon={customIcon} ref={markerRef}>
              <Popup>{info?.isp}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default IPTracker;
