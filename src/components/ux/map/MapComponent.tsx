"use client";
import React, { useState } from "react";
import ImageMarker, { Marker } from "react-image-marker";
import { locationType, regionType } from "src/entities/types";
import { CustomMarker } from "./MarkerComponent";
import ModalComponent from "src/components/modal/ModalComponent";
import { locationProxy } from "src/constants/proxyData";
import CreateLocationModal from "src/components/modal/CreateLocationModal";
import LocationModal from "src/components/modal/LocationModal";

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
  const [showModal1, setShowModal1] = useState(false);
  const [modalData, setModalData] = useState<locationType>(locationProxy);

  return (
    <div className="my-[24px]">
      <div className=" mb-[24px] flex flex-row">
        <p className="mr-[8px]">Filter</p>
        <input type="text" onChange={(e) => setFilter(e.target.value)}></input>
      </div>
      <div className="grid grid-cols-2 ">
        <div className="max-w-[800px]">
          <ImageMarker
            src={
              regionName.image
                ? regionName.image
                : "https://i.redd.it/2go4ftv0h2c91.jpg"
            }
            alt={regionName.name}
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
        <div className="overflow-auto">
          {locationList
            .filter(
              (filter) =>
                filter.name &&
                filter.name
                  .toLocaleLowerCase()
                  .includes(filterName.toLocaleLowerCase())
            )
            .map((location, index) => (
              <div
                key={index}
                onClick={() => {
                  setShowModal1(true), setModalData(location);
                }}
              >
                <p className="font-bold">{location.name}</p>
              </div>
            ))}
          <ModalComponent
            modalState={showModal1}
            setShowModal={setShowModal1}
            content={
              <LocationModal setShowModal={setShowModal1} data={modalData} />
            }
          ></ModalComponent>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
