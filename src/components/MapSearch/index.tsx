import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import { GOOGLE_MAPS_API_KEY } from "../../constants/maps";
import { point } from "../../assets";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -22.9132525,
  lng: -43.7261813,
};

interface MapSearchProps {
  onPositionSelected?(data: { lat: number; lng: number }): void;
  selectedPosition?: { lat: number; lng: number };
}

const MapSearch: React.FC<MapSearchProps> = ({
  onPositionSelected,
  selectedPosition,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    language: "pt-br",
    libraries: ["places"],
  });
  const [map, setMap] = React.useState(null);
  const [currentPosition, setCurrentPosition] = useState<any>(null);

  const mapsRef = useRef(null);

  function onMapClickHandler({ latLng }: any) {
    const { lat, lng } = latLng;
    const _localization = { lat: lat(), lng: lng() };
    console.log("onMapClickHandler", _localization);
    onPositionSelected?.(_localization);
  }
  function onMarkerClick() {}


  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log("currentPosition", position);

          var positionInfo =
            "Your current position is (" +
            "Latitude: " +
            position.coords.latitude +
            ", " +
            "Longitude: " +
            position.coords.longitude +
            ")";

          console.log("currentPosition", positionInfo);

          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          console.log("getCurrentPosition", { err });
        }
      );
    } else {
      alert("Sorry, your browser does not support HTML5 geolocation.");
    }
  }, []);

  if (!isLoaded) return null;

  return (
    <div
      id="map"
      style={{
        height: "386px",
        width: "100%",
        margin: "0",
        backgroundColor: "transparent",
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={
          selectedPosition?.lat ? selectedPosition : currentPosition || center
        }
        options={{ disableDefaultUI: true }}
        zoom={selectedPosition?.lat || currentPosition ? 15 : 4} 
        onUnmount={onUnmount}
        // onClick={onMapClickHandler}
      >
        {/* Child components, such as markers, info windows, etc. */}
        <>
          {selectedPosition && (
            <MarkerF
              position={selectedPosition}
              draggable
              onDragEnd={onMapClickHandler}
              icon={{
                url: point,
                scaledSize: new window.google.maps.Size(50, 50)
              }}
            />
          )}
        </>
      </GoogleMap>
    </div>
  );
};

export default MapSearch;