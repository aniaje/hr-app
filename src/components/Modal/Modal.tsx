import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import {
  Background,
  CloseModalButton,
  ModalContent,
  ModalWrapper,
} from "./Modal.styles";

interface IModal {
  children: React.ReactNode;
  showModal: boolean;
  handleCloseModal: () => void;
}

export const Modal = ({ showModal, children, handleCloseModal }: IModal) => {
  const modalRef = useRef<HTMLInputElement | null>(null);
  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const keyPress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModal) {
        handleCloseModal();
      }
    },
    [showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return showModal ? (
    <>
      <Background
        onClick={() => {
          handleCloseModal();
          console.log("background");
        }}
        ref={modalRef}
      />
      <animated.div style={animation}>
        <ModalWrapper showModal={showModal}>
          <CloseModalButton
            aria-label="Close modal"
            onClick={handleCloseModal}
          />

          <ModalContent>{children}</ModalContent>
        </ModalWrapper>
      </animated.div>
    </>
  ) : (
    <> </>
  );
};
