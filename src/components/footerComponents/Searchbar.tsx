/** @format */

import React from "react";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { FaceSmileIcon } from "@heroicons/react/24/outline";

import { Marshal } from "../../websocket/Serialize";

import { MessageType, UserType } from "../../types/interfaces";
import { GetUserResponse } from "../../api/protos/user/v1/usergateway_service_pb";
import { ReadyStateState } from "react-use-websocket/dist/lib/types";
import Emotebar from "./Emotebar";

export const Searchbar = ({
  handleClickSendMessage,
  user,
  chatroomuuid,
  channeluuid,
}: {
  handleClickSendMessage: (msg: Uint8Array) => void;
  user: GetUserResponse;
  chatroomuuid: string;
  channeluuid: string;
}) => {
  const [input, setInput] = React.useState<string>("");
  const sendInput = (e: any) => {
    e.preventDefault();
    console.log(input);

    const message: MessageType = {
      author: user.name,
      content: input,
      authoruuid: user.uuid,
      chatroomuuid: chatroomuuid,
      channeluuid: channeluuid,
    };

    const msg = Marshal(message);

    setInput("");
    e.target.reset();
    handleClickSendMessage(msg);

    // I might need to pass in the websocket send Function here
  };

  const [toggle, setToggle] = React.useState<boolean>(false);

  const toggleEmotebar = () => {
    console.log("toggle");
    setToggle(!toggle);
  };

  return (
    <div>
      <footer className="text-darky flex flex-row justify-center mx-auto w-full">
        <form
          className="bg-spotify2 w-[50vw] h-14 m-2 border rounded-xl flex items-center border-spotify7"
          onSubmit={sendInput}
        >
          <input
            /* onChange={(e) => setQuery(e.target.value)} */
            className="appearance-none bg-transparent border-none w-full text-white leading-tight focus:outline-none rounded-md text-sm mx-6"
            type="text"
            placeholder="Aa"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            /*  onSubmit={() => sendInput} */
          />
          <div className="flex flex-row">
            <FaceSmileIcon
              onClick={toggleEmotebar}
              className="w-8 h-8 text-white"
            />

            <Emotebar
              toggle={toggle}
              setToggle={setToggle}
              input={input}
              setInput={setInput}
            />
          </div>
          <button
            className=" px-0 py-0 rounded-full  outline-none border-none focus:border-none"
            type="submit"
          >
            <PaperAirplaneIcon className="mr-1 w-8 h-8 ml-1 text-customOrange " />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Searchbar;

/* * w-8 h-8 mr-6 mx-2 */
{
  /*   <footer className="fixed bottom-0 left-0 right-0 z-10 text-darky flex flex-row justify-center mx-auto w-full">
  <div className="sm:w-[57.5%] w-full flex flex-row justify-center border-gray-500">
    <div className="rounded-lg sm:w-[60%] w-[80%]">
      <InputEmoji
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={onSubmit}
        placeholder="Aa"
        theme="dark"
        borderColor="#17141d"
        className="bg-red-500"
      />
    </div>
  </div>
</footer> */
}
