import React, { useRef, useEffect, useState } from "react";
// import Map from "./components/Map.js";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { NavigationControl } from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2V3YWxkZWxoaXdhbGEiLCJhIjoiY2t6OGgxcXVqMHZmdjJ2czh1OWljYjNscCJ9.Xssyc6T_KwRT3Gjbb_X9Qw";

function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    
    map.current.addControl(
      map.current = new mapboxgl.GeolocateControl({
      positionOptions: {
      enableHighAccuracy: true
      },
      // When active the map will receive updates to the device's location as it changes.
      trackUserLocation: true,
      // Draw an arrow next to the location dot to indicate which direction the device is heading.
      showUserHeading: true
      })
      );
      navigator.geolocation.getCurrentPosition((pos) =>{
        console.log(pos.coords.longitude);
        console.log(pos.coords.latitude);
      })
  });


  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
export default App;
