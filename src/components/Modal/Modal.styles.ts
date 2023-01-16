import React from "react";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

export const Background = styled.div`
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  justify-content: center;
  align-items: start;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const Button = styled.button`
  min-width: 50px;
  padding: 5px 10px;
  font-weight: 200;
  border-radius: 4px;
  letter-spacing: 2;
  border: none;
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.bg};
  font-size: 15px;
  cursor: pointer;
`;

interface IModalWrapperProps extends React.HTMLProps<HTMLDivElement> {
  showModal: boolean;
}

export const ModalWrapper = styled.div<IModalWrapperProps>`
  width: 300px;
  height: 200px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 9;
  border-radius: 5px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  top: 10px;
  right: 10px;
  width: 48px;
  height: 48px;
  padding: 0;
  color: red;
  z-index: 50;
`;
