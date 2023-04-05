/** @format */

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

//API services
import { ChatroomGatewayService } from "../api/protos/chatroom/v1/chatroomgateway_service_connect";
import { UserGatewayService } from "../api/protos/user/v1/usergateway_service_connect";
import { MessageGatewayService } from "../api/protos/message/v1/messagegateway_service_connect";
import { AccountGatewayService } from "../api/protos/account/v1/accountgateway_service_connect";
import { AuthGatewayService } from "../api/protos/auth/v1/authgateway_service_connect";

//API requests
import { GetRoomRequest } from "../api/protos/chatroom/v1/chatroomgateway_service_pb";
import { GetRoomResponse } from "../api/protos/chatroom/v1/chatroomgateway_service_pb";

//COMPONENTS
import Online, { Offline } from "../components/Online";
import Navbar from "../components/Navbar";
import User from "../components/User";
import Channel from "../components/Channel";
import Chatroom, { CreateChatroom } from "../components/Chatroom";
import Chat from "../components/Chat";
import Searchbar from "../components/Searchbar";
import { useNavigate } from "react-router-dom";

//PORTALS
import { openAccountFunc, openSettingsFunc } from "../portals/Openportals";
import Account from "../portals/Account";
import Settings from "../portals/Settings";

//WEBSOCKET
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Unmarshal } from "../websocket/Serialize";
import { MessageType } from "../types/interfaces";
import { Client } from "../api/Client";
import {
  AuthenticateRequest,
  AuthenticateResponse,
  LogoutRequest,
  LogoutResponse,
} from "../api/protos/auth/v1/authgateway_service_pb";
import {
  GetUserRequest,
  GetUserResponse,
} from "../api/protos/user/v1/usergateway_service_pb";

import {
  GetRoomsRequest,
  GetRoomsResponse,
} from "../api/protos/chatroom/v1/chatroomgateway_service_pb";

const Home = () => {
  const [state, dispatch] = useGlobalState();
  const [open, setOpen] = React.useState(false);

  //Searchbar logic and state
  const [input, setInput] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  //State for chatrooms and channels
  const [chatRoomState, setChatRoomState] = useState(null);
  const [channelState, setChannelState] = useState(null);

  //State for users in a chatroom
  const [userState, setUserState] = useState<GetUserResponse | undefined>(
    undefined
  );

  //Chatroom and channel IDS
  const [chatroom, setChatroom] = useState("");
  const [channel, setChannel] = useState("");

  const navigate = useNavigate();

  //API clients
  const chatroomClient = new Client(ChatroomGatewayService);
  const userClient = new Client(UserGatewayService);
  const accountClient = new Client(AccountGatewayService);
  const messageClient = new Client(MessageGatewayService);
  const authClient = new Client(AuthGatewayService);

  //Portals
  const [openAccount, setOpenAccount] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);

  const [socketUrl, setSocketUrl] = useState(
    "ws://localhost:8000/ws?" + "chatroom=" + chatroom + "&channel" + channel
  );
  const [messageHistory, setMessageHistory] = useState([]) as any;

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  //useEffect hook to handle authentication and redirecting to login page if not authenticated
  useEffect(() => {
    console.log("Authenticating...");
    (async function () {
      const req = new AuthenticateRequest();
      const response = (await authClient.fetch(req)) as
        | AuthenticateResponse
        | undefined;
      if (response !== undefined) {
        console.log("Authenticated!");
        navigate("/");
        dispatch({ user: true });
      } else {
        console.log("Not authenticated!");
        navigate("/login");
        dispatch({ user: false });
      }
      console.log("Current state of user logged in is: ", state.user);
    })();
  }, []);

  //Start listening for new messages
  useEffect(() => {
    if (lastMessage !== null) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(lastMessage.data);
      reader.onloadend = () => {
        const data = new Uint8Array(reader.result as ArrayBuffer);
        const message = Unmarshal(data);
        setMessageHistory((messageHistory: any) => [
          ...messageHistory,
          message,
        ]);
      };
      console.log(messageHistory);
    }
    ref!.current!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [lastMessage, setMessageHistory]);

  //UseEffect hook that updates the socket url when the chatroom or channel is changed
  useEffect(() => {
    //Change the socket URL to the new chatroom and channel
    handleClickChangeSocketUrl();
    console.log(socketUrl);

    //Reset the message history
    setMessageHistory([]);

    //perform a get request to get the last 100 messages from the chatroom and channel
  }, [chatroom, channel]);

  //Use effect hook that userState when the chatroom is changed (this is to get the users in the chatroom)
  //Later I need to hook it up with a websocket connection that reports who is online
  useEffect(
    () => {
      console.log("Requesting user information...");
      (async function () {
        const req = new GetUserRequest();
        req.userUuid = document.cookie
          .split("; ")
          .find((row) => row.startsWith("uuid_token="))
          ?.split("=")[1]!;
        const res = (await userClient.fetch(req)) as
          | GetUserResponse
          | undefined;
        if (res !== undefined) {
          console.log("User information received!");
          //Need to figure out some logic here prolly
          console.log(res);
          setUserState(res);
          //TODO:
          console.log("Requesting chatrooms...");

          (async function () {
            const req = new GetRoomsRequest();
            //req.chatroomUuids = userState?.chatServers!;
            req.chatroomUuids = ["5cd69ca7-7fbf-4693-99a7-62ceb4e6a395"];
            const res = (await chatroomClient.fetch(req)) as
              | GetRoomsResponse
              | undefined;
            if (res !== undefined) {
              console.log("Chatrooms received!");
              console.log(res);
            } else {
              console.log("Chatrooms not received!");
            }
          })();
          //TODO:
        }
      })();
      console.log("User state is: ", userState);

      /*   console.log("Requesting chatrooms...");
      const req = new GetRoomsRequest();
      req.chatroomUuids = userState?.chatServers!;
      (async function () {
        const res = (await chatroomClient.fetch(req)) as
          | GetRoomsRequest
          | undefined;
        if (res !== undefined) {
          console.log("Chatrooms received!");
        }
      })(); */

      console.log("Chatroom state is: ", chatRoomState);
    },
    [
      /* userState?.uuid */
    ]
  );

  //Use effect hook that requests array of chatrooms when the user logs in
  useEffect(() => {}, []);

  //Function which is called when the socket url is changed - Closes the old socket and opens a new one
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

  //Connection statuses not implemented yet
  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  //This function is used to send messages to the websocket
  const handleClickSendMessage = useCallback(
    (msg: Uint8Array) => sendMessage(msg, true),
    []
  );

  //If user is not authenticated navigate back to login page

  //The issue is that

  return (
    <div className="h-screen w-screen wtf flex flex-row justify-between max-h-screen">
      <Navbar chatroom={testChatRoom} open={open} onClose={setOpen} />
      {/*TODO:*/}

      <div className="w-[30rem] flex flex-row">
        <div className=" flex flex-col">
          <div className="sm:w-28 h-[93vh] hidden sm:flex flex-col w-full overflow-y-scroll scrollbar-hide pt-24  justify-start  bg-blacky border-r border-gray-900">
            {/* {userState?.chatServers &&
              userState?.chatServers.map((chatroom) => (
                <Chatroom chatroom={chatroom} setChatroom={setChatroom} />
              ))} */}
            {userState?.chatServers ? (
              userState.chatServers.map((chatroom) => (
                <Chatroom chatroom={chatroom} setChatroom={setChatroom} />
              ))
            ) : (
              <div>loading</div>
            )}
          </div>
          {/*   @ts-ignore */}
          {/*  <OpenWSConn stateYep={state} /> */}
          <div className="h-[7vh] flex border-gray-900 drop-shadow-2xl mx-auto z-20">
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
            {/* <User user={userState!} /> */}
          </div>
        </div>
      </div>

      {/*I might want to wrap this in a div with collum to fix the ref dummy issue*/}
      <div
        className={` sm:w-full w-full flex justify-center overflow-x-hidden border-gray-500 h-[96vh] overflow-y-scroll scrollbar-hide `}
      >
        {/*TODO: the magic number was mb-10 before */}
        <div className="sm:mb-6 sm:mt-20 mt-16 mb-10 sm:px-20 scrollbar-hide overflow-x-hidden max-w-[100%] pb-28">
          {/*  {messageHistory &&
            messageHistory.map((messageHistory: MessageType) => (
              <Chat msg={messageHistory} user={testUser} />
            ))} */}
          <div ref={ref}></div>
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
            {/*  {testArrayUser &&
              testArrayUser.map((test) => <Online props={test} />)} */}

            <span className="text-2xl font-semibold text-white flex flex-col w-full">
              <span className="max-w-xs ml-auto w-64"> {"Offline - 2"}</span>
            </span>
            {/*   {testArrayUser &&
              testArrayUser.map((test) => <Offline props={test} />)} */}
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
              onClick={() =>
                //Create anominous async function that logs out the user
                (async () => {
                  const req = new LogoutRequest();
                  const response = (await authClient.fetch(
                    req
                  )) as LogoutResponse;
                  navigate("/login");
                  dispatch({ user: false });
                })()
              }
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
