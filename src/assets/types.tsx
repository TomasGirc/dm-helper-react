export type cityType = {
  id?: number;
  name: string;
  region: string;
  size: citySize;
  population: number;
  description: string;
};

export type citySize = "Village" | "City" | "Capital";

export type itemType = {
  id?: number;
  name: string;
  rarity: string;
  type: string;
  keywords: string[];
  requirements: string[];
  price: number;
  description: string;
};
