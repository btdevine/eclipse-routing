import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_GL_ACCESS_TOKEN;

function Map() {
  const mapContainerRef = useRef(null);

  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-97.1467, 31.5493],
      zoom: 4,
    });

    map.on("load", () => {
      map.addSource("accuweather-satellite-tiles", {
        type: "raster",
        tiles: [
          `https://api.accuweather.com/maps/v1/satellite/globalColor/zxy/2024-04-01T22:40:00Z/{z}/{x}/{y}.jpeg?apikey=de13920f574d420984d3080b1fa6132b`,
        ],
        tileSize: 256,
        attribution: `&copy; <a href="https://www.accuweather.com">Accuweather ${new Date().getFullYear()}</a>`,
      });
      map.addSource("weather-channel-satellite-tiles", {
        type: "raster",
        tiles: [
          "https://api.weather.com/v3/TileServer/tile?product=satradFcst&ts=1712018700&fts=1712019600&xyz={x}:{y}:{z}&apiKey=bbd90b15bb534e3c990b15bb53fe3c03",
        ],
        tileSize: 256,
      });
      map.addSource("eclipseCenterPathGeoJson", {
        type: "geojson",
        data: "/eclipse-center-path.geojson",
      });
      map.addSource("eclipseUmbraPathGeoJson", {
        type: "geojson",
        data: "/eclipse-umbra-path.geojson",
      });

      map.addLayer({
        id: "accuweather-satellite",
        type: "raster",
        source: "accuweather-satellite-tiles",
        minzoom: 0,
        maxzoom: 22,
      });

      map.addLayer({
        id: "weather-channel-satellite",
        type: "raster",
        source: "weather-channel-satellite-tiles",
        minzoom: 0,
        maxzoom: 22,
      });

      map.addLayer({
        id: "eclipseCenterPathGeoJson",
        type: "line",
        source: "eclipseCenterPathGeoJson",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#0000ff",
          "line-width": 2,
        },
      });
      map.addLayer({
        id: "eclipseUmbraPathGeoJson",
        type: "line",
        source: "eclipseUmbraPathGeoJson",
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#ff0000",
          "line-width": 2,
        },
      });
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

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
