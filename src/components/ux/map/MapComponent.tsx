"use client";
import React, { useState } from "react";
import ImageMarker, { Marker } from "react-image-marker";
import { locationType } from "src/entities/types";
import { CustomMarker } from "./MarkerComponent";

const MapComponent = ({ locationList }: { locationList: locationType[] }) => {
  const [markers, setMarkers] =
    useState<Array<locationType & Marker>>(locationList);

  const [filterName, setFilter] = useState<string>("");

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
            markers={markers.filter((filter) =>
              filter.name
                .toLocaleLowerCase()
                .includes(filterName.toLocaleLowerCase())
            )}
            onAddMarker={(marker: locationType & Marker) =>
              setMarkers([...markers, marker])
            }
            markerComponent={CustomMarker}
          />
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
