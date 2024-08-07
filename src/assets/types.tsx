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

export interface SidebarItemProps {
  active?: boolean;
  icon: React.ReactNode;
  text: string;
  expanded: boolean;
  subMenu?: SubMenuItemProps[] | null;
  href?: string;
}

export interface SubMenuItemProps extends Omit<SidebarItemProps, "expanded"> {
  expanded?: never;
  subMenu?: never;
}
