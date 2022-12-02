import { Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "../../services";
import { getCities, getStates } from "../../utils/resources";
import ClusterMarker from "./ClusterMarker";

const Maps: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const mapRef = React.useRef<google.maps.Map>();
  const map = mapRef.current;
  // const [map, setMap] = React.useState<google.maps.Map>();
  const [services, setServices] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [points, setPoints] = useState<any[]>([]);
  const [filter, setFilter] = useState<any>({
    service: "",
    state: "RJ",
    city: "Rio de Janeiro",
  });

  function initMap() {
    try {
      if (ref.current)
        mapRef.current = new window.google.maps.Map(ref.current, {
          // center: { lat: -22.9265873, lng: -43.2269271 },
          center: { lat: -22.9227966, lng: -43.1963752 },
          zoom: 14,
          fullscreenControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
        });
      mapRef.current?.addListener("click", function (e: any) {
        console.log("on map click", { lat: e.latLng.lat(), lng: e.latLng.lng() });
      });
    } 
    catch(error){
      console.log(error)
    }
  }

  function loadServices() {
    api
      .get("/services", { params: { active: true } })
      .then(async (response) => {
        const data = await response.data;

        setServices(data?.map((d: any) => ({ label: d.name, value: d.id })));
      });
  }

  React.useEffect(() => {
    initMap();
    loadServices();
  }, []);

  useEffect(() => {
    // if (map) {
    if (!filter.city) {
      setPoints([]);
      return;
    }

    // initMap();

    api
      .get("/occurrences/map", {
        params: {
          ...filter,
          services: filter.service,
        },
      })
      .then(async (response) => {
        const data = await response.data;

        setPoints(data);
      });
    // }
  }, [filter]);

  const states = getStates();
  const cities = filter.state ? getCities(filter.state) : [];

  console.log("Map render", { services });

  return (
    <div style={{ position: "relative", height: "80vh" }}>
      <div ref={ref} id="map" style={{ height: "100%", width: "100%" }}>
        {points?.map((point) => (
          <ClusterMarker key={point.cid} map={map} {...point} />
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          top: "38px",
          right: "100px",
          width: "100%",
          borderRadius: "10px",
        }}
      >
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "38px",
          left: "38px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "15px 25px",
          width: '600px'
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            fontSize: "0.8rem",
            textAlign: "start",
            marginBottom: "17px",
          }}
        >
          Escala de horas
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "0.7rem",
            justifyContent: "space-between",
          }}
        >
          <div>1h</div>
          <div>7 dias</div>
        </div>
        <div
          id="gradient"
          style={{
            height: "11px",
            background:
              "linear-gradient(89.95deg, #47DED0 7.14%, #F77014 42.85%, #FF000E 57.14%, #341948 111.3%)",
            borderRadius: "65.1244px",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Maps;
