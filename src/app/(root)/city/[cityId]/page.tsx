"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchSingleCity } from "src/api/citys";

export default function CityDetails({
  params,
}: {
  params: { cityId: string };
}) {
  const { data: city, isLoading } = useQuery({
    queryFn: () => fetchSingleCity(params.cityId),
    queryKey: ["city"],
  });
  if (isLoading || !city) {
    return <div>Loading...</div>;
  } else {
    return <div>{city.name}</div>;
  }
}
