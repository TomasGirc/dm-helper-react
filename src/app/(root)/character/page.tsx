"use client";

import ModalComponent from "src/components/modal/ModalComponent";
import ItemTableComponent from "src/components/tables/ItemTableComponent";

export default function Character() {
  return (
    <ModalComponent
      title="Items"
      content={<ItemTableComponent />}
    ></ModalComponent>
  );
}
