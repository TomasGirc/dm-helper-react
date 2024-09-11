"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchSingleLocation } from "src/api/locations";
import LocationPage from "src/components/page/LocationPage";

export default function LocationDetails({
  params,
}: {
  params: { locationId: string };
}) {
  const { data: location, isLoading } = useQuery({
    queryFn: () => fetchSingleLocation(params.locationId),
    queryKey: ["location"],
  });

  if (isLoading || !location) {
    return <div>Loading...</div>;
  } else {
    return <LocationPage data={location} />;
  }
}
