import React from "react";
import { Marker } from "react-image-marker";

const PinModal = ({ marker }: { marker: Marker }) => {
  return (
    <div>
      {marker.left.toString()} {marker.top.toString()}
    </div>
  );
};

export default PinModal;
