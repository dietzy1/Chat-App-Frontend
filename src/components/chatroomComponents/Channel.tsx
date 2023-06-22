/** @format */

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { HashtagIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";
import { OpenModal } from "../../hooks/useModalState";
import {Cog6ToothIcon} from "@heroicons/react/24/outline";
import { useGlobalState } from "../../context/context";

import React from "react";
import {
  GetRoomResponse,
  GetChannelResponse,
} from "../../api/protos/chatroom/v1/chatroomgateway_service_pb";
import { channel } from "diagnostics_channel";

const Channel = ({
  channelState,
  setChannel,
  openModal,
}: {
  channelState: GetRoomResponse;
  setChannel: React.Dispatch<React.SetStateAction<string>>;
  openModal: OpenModal;
}) => {
  //Onclick function for creating new channel




  
  const handleModal = () => {
    console.log("clicked");

    openModal("openCreateChannel");
  };

  const [state, dispatch] = useGlobalState();

  //Based on which ever server is clicked I need to send the index of the array to the server
  return (
    <div className="shadow-inner">
      <div className="border-b border-spotify5 flex flex-row">
        <div className="mx-auto mb-4 text-l ">{channelState.name}</div>
        {(state.id === channelState.ownerUuid!) && <Cog6ToothIcon className="h-5 w-5 text-white mr-2 mb-4 my-auto" /> }
      </div>

      <div className="flex flex-row mt-8">
        <div className="flex flex-row ml-2">
          <ChevronDownIcon className="h-5 w-5 text-white mr-2 " />
          <div className="text-gray-500">CHANNEL</div>
        </div>

        {/*FIXME:*/}
        <div className="flex flex-row justify-end w-full mr-2 relative group ">
          <div onClick={handleModal} className="">
            <PlusIcon className="text-white w-5 h-5" />
          </div>
          <div className="fixed left-[14.5rem] top-[7.5rem] my-2 w-auto p-3 m-4 min-w-max rounded-md shadow-md text-white bg-gradient-to-l from-red-400 to-orange-400 text-xs font-bold z-10 group-hover:scale-100 transition-all duration-100 scale-0 origin-left">
            {"Create channel!"}
          </div>
        </div>
      </div>
      <div className="">
        {channelState &&
          channelState.channel.map((c) => (
            <MapChannel
              channelState={c}
              setChannel={setChannel}
              key={c.channelUuid}
            />
          ))}
      </div>
    </div>
  );
};

export default Channel;

const MapChannel = ({
 channelState,
  setChannel,
}: {
  channelState: GetChannelResponse;
  setChannel: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div
      className="flex flex-row mx-1 rounded p-2 items-center hover:bg-white hover:text-blacky text-lg"
      onClick={() => {
        setChannel(channelState?.channelUuid!);
        console.log("Swapped to channel: " + channelState?.channelUuid!);
      }}
    >
      <HashtagIcon className="h-4 w-4 text-customOrange" />
      <div className="ml-3">{channelState?.name}</div>
    </div>
  );
};
