"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRegion, fetchRegions } from "src/api/regions";
import React from "react";
import { regionType } from "src/entities/types";
import MapComponent from "../ux/map/MapComponent";
import { ButtonComponent } from "../ux/ButtonComponent";

const RegionListComponent = () => {
  const queryClient = useQueryClient();
  const { data: regions, isLoading } = useQuery({
    queryFn: () => fetchRegions(),
    queryKey: ["regions"],
  });

  const { mutateAsync: deleteRegionMutation } = useMutation({
    mutationFn: deleteRegion,
    onSuccess: () => {
      queryClient.invalidateQueries(["regions"]);
    },
  });

  const regionList = regions?.map((region: regionType, index) => (
    <div key={index} className="flex flex-col">
      <p>{region.name}</p>
      <div>
        <MapComponent
          locationList={region.locations}
          regionName={region}
        ></MapComponent>
        <ButtonComponent
          children={"Delete"}
          onClick={() => deleteRegionMutation(region._id || "")}
        ></ButtonComponent>
      </div>
    </div>
  ));

  if (isLoading) {
    return <p>...Loading</p>;
  }

  return <div>{regionList}</div>;
};

export default RegionListComponent;
