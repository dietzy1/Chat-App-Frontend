/** @format */

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { HashtagIcon } from "@heroicons/react/24/outline";

import React from "react";
import {
  GetRoomResponse,
  GetChannelResponse,
} from "../api/protos/chatroom/v1/chatroomgateway_service_pb";

const Channel = ({
  channelState,
  setChannel,
}: {
  channelState: GetRoomResponse;
  setChannel: React.Dispatch<React.SetStateAction<string>>;
}) => {
  //Based on which ever server is clicked I need to send the index of the array to the server
  channelState.channel;
  return (
    <div className="shadow-inner">
      <div className="border-b">
        <div className="ml-6 mt-6 mb-4 text-xl ">{channelState.name}</div>
      </div>

      <div className="flex flex-row ml-6 mt-8">
        <ChevronDownIcon className="h-6 w-6 text-white mr-2" />
        <div className="text-gray-500">CHANNEL</div>
      </div>
      <div>
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
      className="flex flex-row mx-4 rounded p-2 items-center hover:bg-white hover:text-blacky text-lg"
      onClick={() => {
        setChannel(channelState?.channelUuid!);
        console.log("Swapped to channel: " + channelState?.channelUuid!);
      }}
    >
      <HashtagIcon className="h-4 w-4 text-customOrange" />
      <div className="ml-4">{channelState?.name}</div>
    </div>
  );
};
