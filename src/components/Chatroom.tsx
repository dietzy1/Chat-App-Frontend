/** @format */

import React, { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { GetRoomResponse } from "../api/protos/chatroom/v1/chatroomgateway_service_pb";

import { Client } from "../api/Client";
import { ChatroomGatewayService } from "../api/protos/chatroom/v1/chatroomgateway_service_connect";
import {
  CreateRoomRequest,
  GetRoomRequest,
} from "../api/protos/chatroom/v1/chatroomgateway_service_pb";

const Chatroom = ({
  chatroomState,
  setChatroom,
}: {
  chatroomState: GetRoomResponse;
  setChatroom: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div
      className="my-2 flex justify-center relative group shadow-inner"
      onClick={() => {
        setChatroom(chatroomState?.chatroomUuid!);
        console.log("Swapped to chatroom: " + chatroomState?.chatroomUuid!);
      }}
    >
      {/*   <img className="rounded-full w-16 h-16" src={chatroom.icon}></img> */}

      <div className="w-[60%] h-[60%]">
        <img
          className="rounded-full  border-b-[4px] border-l-[1.7px] border-r-[1.7px] p-1.5 border-customOrange"
          src={chatroomState?.icon}
        />
      </div>

      <div className="fixed left-20 w-auto p-3 m-4 min-w-max rounded-md shadow-md text-white bg-gradient-to-l from-red-400 to-orange-400 text-xs font-bold z-10 group-hover:scale-100 transition-all duration-100 scale-0 origin-left">
        {chatroomState.name}
      </div>
    </div>
  );
};

//transition-all duration-100 scale-0 origin-left

export default Chatroom;

export const CreateChatroom = () => {
  //I need to add some onclick function here

  const handleOnClick = () => {
    console.log("Clicked");

    /*    const client = new Client(ChatroomGatewayService);

    const req = new CreateRoomRequest();
    req.name = "Default Server";
    req.ownerUuid = "d542a0e0-48db-42f8-a1bb-0b0615821145";
    client.fetch(req); */
  };

  return (
    <div className="m-2 flex justify-center shadow-inner">
      <PlusIcon
        className="w-14 h-14 rounded-full bg-customgray text-customOrange"
        onClick={handleOnClick}
      />
    </div>
  );
};

{
  /* <div className="my-auto relative justify-center flex group">
            <UserCircleIcon
              onClick={closeFunc}
              className="text-white h-10 w-10 mx-5 hover:border-4 rounded-full border-gray-600"
            ></UserCircleIcon>
            <span className="absolute w-auto mx-auto px-3 py-2 m-2 min-w-max top-16 rounded-2xl shadow-md text-white bg-gray-500 text-xs font-bold transition-all duration-100 origin-top scale-0 group-hover:scale-100">
              Account
            </span>
          </div> */
}
