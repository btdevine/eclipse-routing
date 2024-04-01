import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_GL_ACCESS_TOKEN;

function Map() {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState<number>(-97.2);
  const [lat, setLat] = useState<number>(31.5);
  const [zoom, setZoom] = useState(4);

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng);
      setLat(map.getCenter().lat);
      setZoom(map.getZoom());
    });

    // Clean up on unmount
    return () => map.remove();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      }}
      ref={mapContainerRef}
    />
  );
}

export default Map;
