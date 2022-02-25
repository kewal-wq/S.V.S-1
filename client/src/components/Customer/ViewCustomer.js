import React, { useRef, useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { myContext } from "../Context";
import "../../index.css";

import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPTOKEN;
const ViewCustomer = () => {
  const userObject = useContext(myContext);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [customer, setCustomer] = useState("");

  useEffect(() => {
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    // if(map.current) return;
    console.log(map.current);
    map.current = map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
  }, []);

  let navigate = useNavigate();
  const onDeleteCustomer = (id) => {
    navigate("/");
    axios.delete(`http://localhost:4000/customers/${id}/delete`).then((res) => {
      setCustomer((data) => data.filter((cust) => cust._id !== cust.id));
    });
  };

  const { id } = useParams();

  useEffect(() => {

    axios.get(`http://localhost:4000/customers/${id}`).then(
      (res) => {
    setCustomer(res.data); // add conditional check

        // setCustomer(res.data);
        map.current.setCenter([customer.longitude, customer.latitude]);

        new mapboxgl.Marker()
          .setLngLat([customer.longitude, customer.latitude])
          .addTo(map.current)
          .catch((e) => {
            console.log("Error", e);
          });
        
      },
      [map.current, customer.email]
    ).catch((e) => {
      console.log(e);
    })
  });

  const handleEdit = () => {
    navigate(`edit`);
  }

  

  return (
    <div>

 <div>

 <h1>View Customer</h1>

 <div className="sidebar">
   Longitude: {customer.latitude} | Latitude: {customer.longitude} |
   Zoom: {zoom}
 </div>
 <div ref={mapContainer} className="map-container" />

 <h1>{customer.name}</h1>
 <h1>{customer.email}</h1>
 <h1>{customer.mobileNumber}</h1>

 <div>
   <Link to={`/customers/${customer._id}/allVendor`}>
     <button>All Vendors</button>
   </Link>
 </div>
 <div>
   <Link to={`/customers/${customer._id}/myVendors`}>
     <button>My Vendors</button>
   </Link>
 </div>
 <button onClick={() => onDeleteCustomer(customer._id)}>Delete</button>
</div> 
<div>
  <button onClick={handleEdit}>Edit</button>
</div>
 </div>
  );
};

export default ViewCustomer;
