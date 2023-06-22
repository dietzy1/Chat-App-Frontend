/** @format */

import React, { useEffect } from "react";

import { GetRoomResponse } from "../../api/protos/chatroom/v1/chatroomgateway_service_pb";

import { Client } from "../../api/Client";
import { ChatroomGatewayService } from "../../api/protos/chatroom/v1/chatroomgateway_service_connect";
import {
  CreateRoomRequest,
  GetRoomRequest,
} from "../../api/protos/chatroom/v1/chatroomgateway_service_pb";

const Chatroom = ({
  chatroomState,
  setChatroom,
  setChannel,
}: {
  chatroomState: GetRoomResponse;
  setChatroom: React.Dispatch<React.SetStateAction<string>>;
  setChannel: React.Dispatch<React.SetStateAction<string>>;
}) => {

  return (
    <div
      className="flex justify-center relative group shadow-inner mt-4"
      onClick={() => {
        setChatroom(chatroomState?.chatroomUuid!);
        setChannel(chatroomState?.channel[0].channelUuid!);
        console.log("Swapped to chatroom: " + chatroomState?.chatroomUuid!);
        console.log("Swapped to channel: " + chatroomState?.channel[0].channelUuid!)
      }}
    >
      <div className="w-[60%] h-[60%]">
        <img
          className="rounded-full  border-t-[4px] border-l-[1.7px] border-r-[1.7px] p-1.5 border-customOrange"
          src={chatroomState?.icon}
        />
      </div>

      <div className="fixed left-[4.5rem] my-2 w-auto p-3 m-4 min-w-max rounded-md shadow-md text-white bg-gradient-to-l from-red-400 to-orange-400 text-xs font-bold z-10 group-hover:scale-100 transition-all duration-100 scale-0 origin-left">
        {chatroomState.name}
      </div>
    </div>
  );
};
export default Chatroom;
//transition-all duration-100 scale-0 origin-left

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
