/** @format */

import { GetRoomsResponse } from "../api/protos/chatroom/v1/chatroomgateway_service_pb";

import { useEffect, useState } from "react";

function useChatRoomState(userState) {
  const [chatRoomState, setChatRoomState] = useState(null);

  useEffect(() => {
    (async function () {
      if (typeof userState?.uuid === "undefined") {
        return;
      }
      const req = new GetRoomsRequest();
      req.chatroomUuids = userState?.chatServers!;
      const res = (await chatroomClient.fetch(req)) as
        | GetRoomsResponse
        | undefined;
      if (typeof res !== "undefined") {
        console.log("Chatrooms received!");
        console.log(res);
        setChatRoomState(res);

        //Here we can add some default chatroom and channel upload loading
        if (typeof channel === "undefined") {
          setChannel(res.rooms[0].channel[0].channelUuid);
          console.log("Channel set to: ", channel);
        }
        if (typeof chatroom === "undefined") {
          setChatroom(res.rooms[0].chatroomUuid);
          console.log("Chatroom set to: ", chatroom);
        }
      } else {
        console.log("Chatrooms not received!");
      }
    })();
  }, [userState?.uuid]);

  return chatRoomState;
}

export default useChatRoomState;

import React, { useState } from "react";
import Modal from "react-modal";
import { ModalProps } from "./Modal"; // assuming we already have a Modal component defined

interface ModalManagerProps {
  modals: ModalProps[]; // an array of ModalProps objects containing the configuration for each modal
}

const ModalManager: React.FC<ModalManagerProps> = ({ modals }) => {
  const [modalStates, setModalStates] = useState<boolean[]>(
    modals.map((_) => false)
  ); // an array of boolean values representing the visibility state of each modal

  const toggleModal = (index: number) => {
    setModalStates((prevStates) =>
      prevStates.map((prevState, i) => (i === index ? !prevState : prevState))
    );
  }; // a function to toggle the visibility of a modal given its index

  return (
    <>
      {modals.map((modal, index) => (
        <Modal
          key={index}
          isOpen={modalStates[index]}
          onRequestClose={() => toggleModal(index)}
          // additional props for the Modal component can be passed through the ModalProps object
          {...modal}
        >
          {modal.children}
        </Modal>
      ))}
    </>
  );
};

export default ModalManager;
