/** @format */

import { useState } from "react";

export type ModalKeys =
  | "openUser"
  | "openAccount"
  | "openCreateChatroom"
  | "openCreateChannel";

type ModalState = Record<ModalKeys, boolean>;

export type OpenModal = (modalKey: ModalKeys) => void;
export type CloseModal = (modalKey: ModalKeys) => void;

type UseModalStateReturnType = [ModalState, OpenModal, CloseModal];

function useModalState(defaultState: ModalState): UseModalStateReturnType {
  const [state, setState] = useState(defaultState);

  const openModal: OpenModal = (modalKey) => {
    setState((prevState) => {
      const updatedState: ModalState = { ...prevState };
      Object.keys(updatedState).forEach((key) => {
        if (key !== modalKey) {
          updatedState[key as ModalKeys] = false;
        }
      });
      updatedState[modalKey] = true;
      return updatedState;
    });
  };

  const closeModal: CloseModal = (modalKey) => {
    setState((prevState) => ({
      ...prevState,
      [modalKey]: false,
    }));
  };

  return [state, openModal, closeModal];
}

export default useModalState;
