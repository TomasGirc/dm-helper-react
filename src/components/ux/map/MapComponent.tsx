"use client";
import React, { useState } from "react";
import ImageMarker, { Marker } from "react-image-marker";
import { locationType, regionType } from "src/entities/types";
import { CustomMarker } from "./MarkerComponent";
import ModalComponent from "src/components/modal/ModalComponent";
import { locationProxy } from "src/constants/proxyData";
import CreateLocationModal from "src/components/modal/CreateLocationModal";

const MapComponent = ({
  locationList,
  regionName,
}: {
  locationList: locationType[];
  regionName: regionType;
}) => {
  const markers = locationList;
  const [newMarker, setNewMarkers] = useState<locationType & Marker>(
    locationProxy
  );

  const [filterName, setFilter] = useState<string>("");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="my-[24px] flex flex-row">
        <p className="mr-[8px]">Filter</p>
        <input type="text" onChange={(e) => setFilter(e.target.value)}></input>
      </div>
      <div className="flex flex-row space-x-4">
        <div className="max-w-[800px]">
          <ImageMarker
            src="https://i.redd.it/2go4ftv0h2c91.jpg"
            markers={markers.filter(
              (filter) =>
                filter.name &&
                filter.name
                  .toLocaleLowerCase()
                  .includes(filterName.toLocaleLowerCase())
            )}
            onAddMarker={(marker: locationType & Marker) => {
              setShowModal(true), setNewMarkers(marker);
            }}
            markerComponent={CustomMarker}
          />
          <ModalComponent
            modalState={showModal}
            setShowModal={setShowModal}
            content={
              <CreateLocationModal
                setShowModal={setShowModal}
                data={newMarker}
                region={regionName}
              />
            }
          ></ModalComponent>
        </div>
        <div>
          {locationList.map((location, index) => (
            <div key={index}>
              <p>{location.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MapComponent;
