"use client";
import React, { useState } from "react";
import ImageMarker, { Marker } from "react-image-marker";
import { ButtonComponent } from "src/components/ux/ButtonComponent";
import { CustomMarker } from "src/components/ux/map/MarkerComponent";

const MapMarkers = () => {
  const [markers, setMarkers] = useState<Array<Marker>>([
    {
      top: 10,
      left: 50,
      status: "blue",
    },
    {
      top: 90,
      left: 50,
      status: "blue",
    },
  ]);
  const [active, setActive] = useState<boolean>(false);
  return (
    <>
      <ButtonComponent onClick={() => setActive(!active)}>
        Active
      </ButtonComponent>
      <ButtonComponent
        onClick={() =>
          setMarkers([
            ...markers,
            {
              top: Math.floor(Math.random() * 100),
              left: Math.floor(Math.random() * 100),
              status: "red",
            },
          ])
        }
      >
        Active
      </ButtonComponent>
      <div className="max-w-[800px]">
        <ImageMarker
          src="https://i.redd.it/2go4ftv0h2c91.jpg"
          markers={markers}
          onAddMarker={(marker: Marker) =>
            active && setMarkers([...markers, marker])
          }
          markerComponent={CustomMarker}
        />
      </div>
    </>
  );
};

export default MapMarkers;
