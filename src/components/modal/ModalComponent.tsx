import React, { useEffect, useState } from "react";
import ClickOutside from "../helpers/ClickOutside";
import { ButtonComponent } from "../ux/ButtonComponent";
import { ModalComponentProps } from "src/entities/types";

export default function ModalComponent({
  title,
  colorBg,
  colorTxt,
  modalState = false,
  setShowModal,
  content,
  showButton = true,
}: ModalComponentProps) {
  const [internalShowModal, setInternalShowModal] = useState(modalState);

  useEffect(() => {
    if (setShowModal) {
      setInternalShowModal(modalState);
    }
  }, [modalState, setShowModal]);

  const handleCloseModal = () => {
    if (setShowModal) {
      setShowModal(false);
    } else {
      setInternalShowModal(false);
    }
    document.body.style.overflow = "auto";
  };

  const handleOpenModal = () => {
    if (!setShowModal) {
      setInternalShowModal(true);
    } else {
      setShowModal(true);
    }
    document.body.style.overflow = "hidden";
  };

  const handleClickOutside = () => {
    handleCloseModal();
  };

  const ref = ClickOutside(handleClickOutside);

  return (
    <>
      {showButton && title && (
        <ButtonComponent
          onClick={handleOpenModal}
          colorBg={colorBg}
          colorTxt={colorTxt}
        >
          {title}
        </ButtonComponent>
      )}

      {(setShowModal ? modalState : internalShowModal) && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div
                ref={ref}
                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"
              >
                {content}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
}
