// import the dependencies
import { useState } from "react";
import { MarkerComponentProps } from "react-image-marker";
import LocationModal from "src/components/modal/LocationModal";
import ModalComponent from "src/components/modal/ModalComponent";
import { locationType } from "src/entities/types";

export const CustomMarker = (props: MarkerComponentProps & locationType) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="flex cursor-pointer" onClick={() => setShowModal(true)}>
        <span className="h-[25px] w-[25px] bg-black text-white rounded-full inline-block text-center"></span>
        <h1 className="text-black ml-[5px]"></h1>
        <ModalComponent
          modalState={showModal}
          setShowModal={setShowModal}
          content={<LocationModal setShowModal={setShowModal} data={props} />}
        ></ModalComponent>
      </div>
    </>
  );
};
