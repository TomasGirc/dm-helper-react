"use client";
import React, { useState } from "react";
import ImageMarker, { Marker } from "react-image-marker";
import ModalComponent from "src/components/modal/ModalComponent";
import PinModal from "src/components/modal/PinModal";
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
  const [showModal, setShowModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<Marker>({
    top: 10,
    left: 50,
    status: "blue",
  });
  return (
    <>
      <ModalComponent
        title="Modal"
        colorBg="bg-blue-500"
        colorTxt="text-white"
        modalState={showModal}
        setShowModal={setShowModal}
        showButton={false}
        content={<PinModal marker={selectedMarker}></PinModal>}
      ></ModalComponent>
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
            // setShowModal(true), setSelectedMarker(marker)
            setMarkers([...markers, marker])
          }
          markerComponent={CustomMarker}
        />
      </div>
    </>
  );
};

export default MapMarkers;
