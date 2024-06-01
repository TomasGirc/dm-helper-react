export type cityType = {
  id?: number;
  name: string;
  region: string;
  size: citySize;
  population: number;
  description: string;
};

export type citySize = "Village" | "City" | "Capital";
