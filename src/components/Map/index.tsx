import { Status, Wrapper } from "@googlemaps/react-wrapper";
import React from "react";
import { GOOGLE_MAPS_API_KEY } from "../../constants";
import Maps from "./Map";

// import { Container } from './styles';

const render = (status: Status) => {
  return (
    <div>
      {/* <h1>{status}</h1> */}
      {status === "SUCCESS" && <Maps />}
    </div>
  );
};

const MapsWrapper: React.FC = () => {
  return (
    <Wrapper
      apiKey="AIzaSyAySrRV2P8-DZb5mWAKZfLkYo3UM5H-2Do"
      render={render}
    ></Wrapper>
  );
};

export default MapsWrapper;
