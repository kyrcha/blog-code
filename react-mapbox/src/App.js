import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import mapboxgl from "mapbox-gl";

function App() {
  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(2);

  const node = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: node.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div>
        <div className="sidebarStyle">
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div ref={node} className="mapContainer" />
    </div>
  );
}

export default App;
