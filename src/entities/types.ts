import { ReactNode } from "react";

export type cityType = {
  _id?: string;
  name: string;
  region: string;
  size: citySize;
  population: number;
  description: string;
};

export type regionType = {
  _id?: string;
  name: string;
  locations: locationType[];
  npc: npcType[];
  description: string;
  comment: commentType[];
  image?: string
};

export type locationType = {
  _id?: string;
  name: string;
  description: string;
  npc: npcType[];
  top: number;
  left: number;
  image: string;
  quest: questType[];
  region: regionType & string;
  comment: commentType[];
}

export type npcType = {
  _id?: string;
  name: string;
  description: string;
}

export type commentType = {
  author: userType,
  comment: string,
  emoticon: string
}

export type userType = {
  username: string,
  preferredName: string,
  image?: string
}

export type questType = {
  name: string,
  description: string,
  reward: string,
  locations: locationType[],
  npc: npcType[],
  comment: commentType
}

export type citySize = "Village" | "City" | "Capital";

export type rarityType = "Miscalenious" | "Common" | "Rare" | "Legendary";

export type itemType = {
  _id?: string;
  name: string;
  rarity: string;
  type: string;
  keywords: keywordsType[];
  requirements?: requirementsType[];
  price: number;
  description: string;
};

export type keywordsType = {
  name: string;
};

export type requirementsType = {
  name: string;
  value: number;
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

export interface ModalComponentProps {
  title?: string;
  colorBg?: string;
  colorTxt?: string;
  modalState?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>; // Optional now
  content: ReactNode;
  showButton?: boolean;
}