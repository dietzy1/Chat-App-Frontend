import React from "react";
import "../App.css";
import { defaultGlobalStateType, useGlobalState } from "../context/context";
import { Navigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";

//ICONS
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

//TEST DATA
import {
  testArrayMessage,
  testArrayUser,
  testUser,
  testArrayChatRoom,
  testChatRoom,
  testArrayChannel,
} from "./testData";

//COMPONENTS
import Online, { Offline } from "../components/Online";
import Navbar from "../components/Navbar";
import User from "../components/User";
import Channel from "../components/Channel";
import Chatroom, { CreateChatroom } from "../components/Chatroom";
import Chat from "../components/Chat";
import Searchbar from "../components/Searchbar";

//PORTALS
import { openAccountFunc, openSettingsFunc } from "../portals/Openportals";
import Account from "../portals/Account";
import Settings from "../portals/Settings";

//API
import { LogoutFunc } from "../api/Auth";

//WEBSOCKET
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Unmarshal } from "../websocket/Serialize";
import { MessageType } from "../types/interfaces";

//I need to make it so that every channel has a unique id which is the url path
//once every chatroom is attached to a url i can open and close websocket connections to each chatroom based on the user viewing the url

const Home = () => {
  const [state, dispatch] = useGlobalState();
  const [open, setOpen] = React.useState(false);

  //Searchbar logic and state
  const [input, setInput] = useState("");
  const dummy = useRef();

  //Chatroom and channel IDS
  const [chatroom, setChatroom] = useState("");
  const [channel, setChannel] = useState("");

  //I need to pass down the setChatroom and setChannel to chatroom and channel components

  //I need to write a function that loads in a set amount of prior messages incase the websocket connection is empty
  //The logic should probaly be placed within the useEffect hook

  //Portals
  const [openAccount, setOpenAccount] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);

  const [socketUrl, setSocketUrl] = useState(
    "ws://localhost:8000/ws?" + "chatroom=" + chatroom + "&channel" + channel
  );
  const [messageHistory, setMessageHistory] = useState([]) as any;

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  //Start listening for new messages
  useEffect(() => {
    if (lastMessage !== null) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(lastMessage.data);
      reader.onloadend = () => {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        //Call protobuf unmarshal function to convert the data into a message type object
        const message = Unmarshal(data);
        setMessageHistory((messageHistory: any) => [
          ...messageHistory,
          message,
        ]);
      };
      console.log(messageHistory);
      //convert lastMessage into a messageType object
    }
    dummy.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [lastMessage, setMessageHistory]);

  //UseEffect hook that updates the socket url when the chatroom or channel is changed
  useEffect(() => {
    console.log("YES I FCKING SWAPPED IT");
    console.log(channel);
    handleClickChangeSocketUrl();
    console.log(socketUrl);
  }, [chatroom, channel]);

  //This part doesn't work atm
  const handleClickChangeSocketUrl = useCallback(
    () =>
      setSocketUrl(
        "ws://localhost:8000/ws?" +
          "chatroom=" +
          chatroom +
          "&channel=" +
          channel
      ),
    [chatroom, channel]
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  const handleClickSendMessage = useCallback(
    (msg: Uint8Array) => sendMessage(msg, true),
    []
  );

  if (!state.user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    //I need to request a fuckton of data here
  }, []);

  return (
    <div className="h-screen w-screen wtf flex flex-row justify-between max-h-screen">
      <Navbar chatroom={testChatRoom} open={open} onClose={setOpen} />
      {/*TODO:*/}

      <div className="w-[30rem] flex flex-row">
        <div className=" flex flex-col">
          <div className="sm:w-28 h-[93vh] hidden sm:flex flex-col w-full overflow-y-scroll scrollbar-hide pt-24  justify-start  bg-blacky border-r border-gray-900">
            {testArrayChatRoom &&
              /*        testArrayChatRoom.map((chatroom) => <Card chatroom={chatroom} />)} */
              testArrayChatRoom.map((chatroom) => (
                <Chatroom chatroom={chatroom} setChatroom={setChatroom} />
              ))}
          </div>
          {/*   @ts-ignore */}
          {/*  <OpenWSConn stateYep={state} /> */}
          <div className="h-[7vh] flex border-gray-900 drop-shadow-2xl mx-auto">
            {/* <ArrowLeftOnRectangleIcon className="text-white w-10 h-10 my-auto mx-auto" /> */}

            <CreateChatroom />
          </div>
        </div>

        <div className="sm:w-full hidden sm:flex flex-col shrink bg-test  pt-28 drop-shadow-2xl border-gray-900 border-r">
          <div className="h-[92vh] flex flex-col overflow-y-scroll scrollbar-hide">
            <div>
              <Channel channels={testArrayChannel} setChannel={setChannel} />
            </div>
          </div>
          <div className="h-[8vh] border-t bg-test mt-4">
            <User user={testUser} />
          </div>
        </div>
      </div>

      {/*I might want to wrap this in a div with collum to fix the ref dummy issue*/}
      <div
        className={` sm:w-full w-full flex justify-center overflow-x-hidden border-gray-500 h-[96vh] overflow-y-scroll scrollbar-hide `}
      >
        {/*TODO: the magic number was mb-10 before */}
        <div className="sm:mb-6 sm:mt-20 mt-16 mb-10 sm:px-20 scrollbar-hide overflow-x-hidden max-w-[100%]">
          {messageHistory &&
            messageHistory.map((messageHistory: MessageType) => (
              <Chat msg={messageHistory} user={testUser} />
            ))}
          <span ref={dummy}></span>
        </div>
      </div>
      {/*I might want to wrap this in a div with collum to fix the ref dummy issue*/}

      <div className="sm:w-96 h-screen hidden sm:flex flex-col overflow-y-scroll  scrollbar-hide pt-28 bg-test border-l border-gray-900">
        {/*  <div className=" flex flex-row sm:visible invisible pb-1 mb-4"></div> */}
        <div className="h-[92rem]">
          <span className="text-2xl font-semibold text-white flex flex-col w-full">
            <span className=" max-w-xs ml-auto w-64">{"Online - 5"}</span>
          </span>

          <div className="w-[100%] ">
            {testArrayUser &&
              testArrayUser.map((test) => <Online props={test} />)}

            <span className="text-2xl font-semibold text-white flex flex-col w-full">
              <span className="max-w-xs ml-auto w-64"> {"Offline - 2"}</span>
            </span>
            {testArrayUser &&
              testArrayUser.map((test) => <Offline props={test} />)}
          </div>
        </div>
        <div className="h-[8vh]">
          <div className=" px-8 py-4 border-t flex flex-row justify-around">
            <UserCircleIcon
              className="w-10 h-10 opacity-80 z-[11]"
              onClick={() => openAccountFunc(setOpenAccount, setOpenSettings)}
            />
            <Cog8ToothIcon
              onClick={() => openSettingsFunc(setOpenAccount, setOpenSettings)}
              className="w-10 h-10 opacity-80 z-[11]"
            />
            <ArrowLeftOnRectangleIcon
              className="w-10 h-10 opacity-80 z-[11]"
              /*  TODO:I need to implement the logout function here */
              onClick={() => LogoutFunc(dispatch)}
            />
          </div>
        </div>
      </div>

      <Searchbar
        input={input}
        setInput={setInput}
        handleClickSendMessage={handleClickSendMessage}
        user={testUser}
      />
      {/* <Searchbar /> */}
      {/*REACT PORTALS */}
      <Account open={openAccount} onClose={() => setOpen(false)} />
      <Settings open={openSettings} onClose={() => setOpen(false)} />
    </div>
  );
};
export default Home;
