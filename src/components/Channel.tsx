import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { HashtagIcon } from "@heroicons/react/24/outline";

import { ChannelType } from "../types/interfaces";

import React from "react";

const Channel = ({ channel }: { channel: ChannelType }) => {
  return <div></div>;
};

export default Channel;

const idk = () => {
  return (
    <div className="flex flex-row mx-4 rounded p-2 items-center hover:bg-white hover:text-blacky text-lg">
      <HashtagIcon className="h-4 w-4 text-customOrange" />
      <div className="ml-4">General</div>
    </div>
  );
};

{
  /* <div className="mx-auto underline-offset-4 underline text-xl ">
BOBS CHATSERVER
</div>
<div>
<Channel />
</div> */
}
