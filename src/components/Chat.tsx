import React from "react";
import { MessageType, UserType } from "../types/interfaces";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useCallback } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Chat = ({ msg, user }: { msg: MessageType; user: UserType }) => {
  const [query, setQuery] = useState("");
  const onSubmit = (e: any) => {
    e.preventDefault();
  };
  const [text, setText] = useState(msg.message);
  const [editing, setEditing] = useState(false);

  const editMessage = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      console.log("editing message");
      e.preventDefault();
      editingToggle();
    }
  };
  const confirmEditing = () => {
    console.log("editing message");
    editingToggle();
  };

  const revertEditing = () => {
    setText(msg.message);
    editingToggle();
  };

  const editingToggle = () => {
    setEditing(!editing);
    console.log("editing: " + editing);
  };

  //Websocket logic
  const [socketUrl, setSocketUrl] = useState(
    "ws://localhost:8000/ws?" + channel + "&" + chatroom
  );
  const [messageHistory, setMessageHistory] = useState([]) as any;

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  //Start listening for new messages
  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev: any) => prev.concat(lastMessage));
    }
  }, [lastMessage, setMessageHistory]);

  //If a new channel is selected this function should be called
  const handleClickChangeSocketUrl = useCallback(
    () => setSocketUrl("ws://localhost:8000/ws?" + channel + "&" + chatroom),
    []
  );

  //Send a message to the server
  //Needs to be a protobuf message
  const handleClickSendMessage = useCallback(() => sendMessage("Hello"), []);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className="mb-10 text-lg">
      {msg.authoruuid === "12345" && (
        <div className="flex flex-row m-2  justify-end w-full relative ">
          <div className="flex flex-col group/icon">
            <div className="flex flex-row ml-auto heading">
              <h2 className="mx-14 text-lg my-0.5"> {msg.author}</h2>
            </div>
            <div className="flex flex-row ">
              <span
                onClick={() => editingToggle()}
                className=" my-auto rounded-2xl  shadow-md bg-blacky border transition-all duration-100 origin-top scale-0 group-hover/icon:scale-100"
              >
                <EllipsisHorizontalIcon className="h-10 w-10 rounded-3xl text-white " />
              </span>
              {editing ? (
                <div className="flex-none my-auto">
                  <span className="flex flex-row my-auto">
                    <XMarkIcon
                      onClick={revertEditing}
                      className="h-10 w-10 ml-2 rounded-2xl text-white border-customOrange border "
                    />
                    <CheckIcon
                      onClick={confirmEditing}
                      className="h-10 w-10 ml-2 rounded-2xl text-white border-customOrange border"
                    />
                  </span>
                </div>
              ) : (
                <div className="flex-none my-auto invisible">
                  <span className="flex flex-row my-auto">
                    <XMarkIcon
                      onClick={revertEditing}
                      className="h-10 w-10 ml-2 rounded-2xl text-white border-customOrange border "
                    />
                    <CheckIcon
                      onClick={confirmEditing}
                      className="h-10 w-10 ml-2 rounded-2xl text-white border-customOrange border"
                    />
                  </span>
                </div>
              )}

              {editing ? (
                <div
                  contentEditable="true"
                  suppressContentEditableWarning={true}
                  onKeyDown={editMessage}
                  className="block grow-0 mx-6 p-4  overflow-x-hidden break-words w-[40vw] text-react bg-gradient-to-l from-red-400 to-orange-400 bg-opacity-50 border border-customgray  rounded-2xl shadow-2xl"
                >
                  {msg.message}
                </div>
              ) : (
                <div className="block grow-0 mx-6 p-4  overflow-x-hidden break-words w-[40vw] text-react bg-gradient-to-l from-red-400 to-orange-400 bg-opacity-50 border border-customgray  rounded-2xl shadow-2xl">
                  {msg.message}
                </div>
              )}
            </div>

            <div className="absolute border border-customOrange bg-blacky top-2 right-0  z-10 rounded-2xl">
              <img
                className="w-12 h-12  flex-shrink-0 rounded-full border-4 border-blacky z-10"
                alt=""
                src={user.icon}
              ></img>
            </div>
            {/* </div> */}
            {/*  <div className="sm:ml-60 ml-32 font-medium text-xs text-[#A3A6AA]">
              {msg.timestamp}
            </div> */}
            <div className="absolute -bottom-4 left-[30%] font-medium text-xs text-[#A3A6AA]">
              {msg.timestamp}
            </div>
          </div>
        </div>
      )}
      {/*Breakpoint*/}

      {msg.authoruuid !== "12345" && (
        <div className="flex flex-row m-2 justify-start w-full relative">
          <div className="flex flex-col">
            <div className="flex flex-row heading">
              <h2 className="mx-14 text-lg my-0.5"> {msg.author}</h2>
            </div>

            <div className="block grow-0 pl-8 mx-6 p-4 break-words overflow-x-hidden w-[40vw]  bg-test   border border-customgray  rounded-2xl shadow-2xl">
              {msg.message}

              <div className="absolute border border-customOrange bg-blacky top-2 left-0 z-10 rounded-2xl">
                <img
                  className="w-12 h-12  flex-shrink-0 rounded-full border-4 border-blacky z-10"
                  alt=""
                  src={user.icon}
                ></img>
              </div>
            </div>
            {/*  <div className="ml-[14rem] sm:ml-[35rem] font-medium text-xs text-[#A3A6AA] bg-green-500">
              {msg.timestamp}
            </div> */}
            <div className="absolute -bottom-4 right-[30%] font-medium text-xs text-[#A3A6AA]">
              {msg.timestamp}
            </div>
          </div>

          {/*  <div className=" font-medium text-xs my-2 text-[#A3A6AA]">
            {msg.timestamp}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default Chat;
