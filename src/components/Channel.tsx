import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { HashtagIcon } from "@heroicons/react/24/outline";

import { ChannelType } from "../types/interfaces";

import React from "react";

const Channel = ({
  channels,
  setChannel,
}: {
  channels: ChannelType[];
  setChannel: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="shadow-inner">
      <div className="border-b">
        <div className="ml-6 mt-6 mb-4 text-xl ">BOBS CHATSERVER</div>
      </div>

      <div className="flex flex-row ml-6 mt-8">
        <ChevronDownIcon className="h-6 w-6 text-white mr-2" />
        <div className="text-gray-500">CHANNEL</div>
      </div>
      <div>
        {channels &&
          /*        testArrayChatRoom.map((chatroom) => <Card chatroom={chatroom} />)} */
          channels.map((c) => (
            <MapChannel channel={c} setChannel={setChannel} />
          ))}
      </div>
    </div>
  );
};

export default Channel;

const MapChannel = ({
  channel,
  setChannel,
}: {
  channel: ChannelType;
  setChannel: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div
      className="flex flex-row mx-4 rounded p-2 items-center hover:bg-white hover:text-blacky text-lg"
      onClick={() => {
        setChannel(channel.channeluuid);
        console.log("Swapped to channel: " + channel.channeluuid);
      }}
    >
      <HashtagIcon className="h-4 w-4 text-customOrange" />
      <div className="ml-4">{channel.channeluuid}</div>
    </div>
  );
};
