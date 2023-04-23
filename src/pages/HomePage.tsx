/** @format */

import logo from "../assets/logo.svg";

import React, { useMemo } from "react";
import "../App.css";
import { defaultGlobalStateType, useGlobalState } from "../context/context";
import { Navigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";

//ICONS
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

//API services
import { ChatroomGatewayService } from "../api/protos/chatroom/v1/chatroomgateway_service_connect";
import { UserGatewayService } from "../api/protos/user/v1/usergateway_service_connect";
import { MessageGatewayService } from "../api/protos/message/v1/messagegateway_service_connect";
import { AccountGatewayService } from "../api/protos/account/v1/accountgateway_service_connect";
import { AuthGatewayService } from "../api/protos/auth/v1/authgateway_service_connect";

//API requests
import {
  Activity,
  GetRoomRequest,
} from "../api/protos/chatroom/v1/chatroomgateway_service_pb";
import { GetRoomResponse } from "../api/protos/chatroom/v1/chatroomgateway_service_pb";

//COMPONENTS
import Activitybar from "../components/Activitybar";
import Navbar from "../components/Navbar";

import Chatroombar from "../components/Chatroombar";
import Channel from "../components/chatroomComponents/Channel";
import Footer from "../components/Footer";
import Chat from "../components/Chat";

import { useNavigate } from "react-router-dom";

//PORTALS
import { openAccountFunc, openSettingsFunc } from "../portals/Openportals";
import Account from "../portals/Account";
import Settings from "../portals/Settings";

//WEBSOCKET
import useWebSocket, { ReadyState } from "react-use-websocket";
import { Unmarshal, decodeMessage } from "../websocket/Serialize";
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
  GetUsersRequest,
  GetUsersResponse,
} from "../api/protos/user/v1/usergateway_service_pb";

import {
  GetRoomsRequest,
  GetRoomsResponse,
} from "../api/protos/chatroom/v1/chatroomgateway_service_pb";
import {
  CreateMessageResponse,
  GetMessagesRequest,
  GetMessagesResponse,
  Msg,
} from "../api/protos/message/v1/messagegateway_service_pb";
import { options } from "../websocket/options";

export function HomePage() {
  //State containing user ID
  const [userState, setUserState] = useState<GetUserResponse | undefined>(
    undefined
  );

  const authClient = new Client(AuthGatewayService);
  const userClient = new Client(UserGatewayService);

  const [state, dispatch] = useGlobalState();
  const navigate = useNavigate();

  //Request authentication
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
    })();
  }, []);

  useEffect(() => {
    console.log("Requesting user information...");
    (async function () {
      const req = new GetUserRequest();
      req.userUuid = document.cookie
        .split("; ")
        .find((row) => row.startsWith("uuid_token="))
        ?.split("=")[1]!;
      const res = (await userClient.fetch(req)) as GetUserResponse | undefined;
      if (typeof res !== "undefined") {
        console.log("User information received!");
        //Need to figure out some logic here prolly
        console.log(res);
        setUserState(res);
      }
    })();
  }, []);

  //If we fail to load user information, return an empty div
  //TODO: Implement a loading screen
  if (userState === undefined) {
    return <div></div>;
  }

  //If we are authenticated and know the userState return the home page., return the home page
  return <Home userState={userState}></Home>;
}
export default HomePage;

export function Home({ userState }: { userState: GetUserResponse }) {
  const [state, dispatch] = useGlobalState();
  const [open, setOpen] = React.useState(false);

  //Searchbar logic and state
  const ref = useRef<HTMLInputElement>(null);

  //State for chatrooms and channels
  const [chatroomState, setChatRoomState] = useState<
    GetRoomsResponse | undefined
  >(undefined);

  //Const to control users in a chatroom
  const [usersState, setUsersState] = useState<GetUsersResponse | undefined>(
    undefined
  );

  //State for messages in a channel
  const [messageState, setMessageState] = useState<
    GetMessagesResponse | undefined
  >();

  //State for activity in a channel
  const [activityState, setActivityState] = useState<Activity | undefined>(
    undefined
  );

  //Chatroom and channel IDS
  const [chatroom, setChatroom] = useState(
    "5cd69ca7-7fbf-4693-99a7-62ceb4e6a395"
  );
  const [channel, setChannel] = useState(
    "ce83fcaf-e1e1-43d7-9c28-1983b19b8ed8"
  );

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
    "ws://localhost:8000/ws?" +
      "chatroom=" +
      chatroom +
      "&channel" +
      channel +
      "&user=" +
      userState.uuid
  );

  const { sendMessage, lastMessage, readyState } = useWebSocket(
    socketUrl,
    options
  );

  //Use effect hook that requests array of chatrooms when the user logs in
  useEffect(() => {
    (async function () {
      /* if (typeof userState?.uuid === "undefined") {
        return;
      } */
      console.log("Requesting chatrooms...");

      const req = new GetRoomsRequest();
      req.chatroomUuids = userState.chatServers;
      const res = (await chatroomClient.fetch(req)) as
        | GetRoomsResponse
        | undefined;

      if (typeof res !== "undefined") {
        console.log("Chatrooms received!");
        console.log(res);
        setChatRoomState(res);

        //Here we can add some default chatroom and channel upload loading
        if (typeof channel === "undefined") {
          setChannel(res.rooms[0].channel[0].channelUuid);
          console.log("Channel set to: ", channel);
        }
        if (typeof chatroom === "undefined") {
          setChatroom(res.rooms[0].chatroomUuid);
          console.log("Chatroom set to: ", chatroom);
        }
      } else {
        console.log("Chatrooms not received!");
      }
    })();
  }, []);

  //Use effect hook that loads in the users in the chatroom
  useEffect(() => {
    (async function () {
      if (typeof chatroom === "undefined") {
        return;
      }
      if (typeof chatroomState === "undefined") {
        return;
      }

      let userUuids: string[] = [];

      //I need to identify which chatroom is currently selected and use that ID to get the users in that chatroom
      chatroomState?.rooms?.forEach((room) => {
        if (room.chatroomUuid === chatroom) {
          userUuids = room.userUuids;
        }
      });

      const req = new GetUsersRequest();
      req.userUuids = userUuids;
      console.log("Requesting user uuids: ", userUuids);

      const response = (await userClient.fetch(req)) as
        | GetUsersResponse
        | undefined;
      if (response !== undefined) {
        console.log("Users received!");
        setUsersState(response);
        console.log(response);
      } else {
        console.log("Users not received!");
      }
    })();
  }, [setChatRoomState, chatroomState]);

  /* useEffect(() => {
    if (typeof channel === "undefined") {
      return;
    }
    if (typeof chatroom === "undefined") {
      return;
    }
    //TODO: This is a temporary solution to the problem of the websocket not connecting
    setChatroom(chatroomState?.rooms[0].chatroomUuid!);
    setChannel(chatroomState?.rooms[0].channel[0].channelUuid!);

    console.log("Channel set to: ", channel);
    console.log("Chatroom set to: ", chatroom);
  }, [channel, chatroom]);  */

  //Start listening for new messages
  useEffect(() => {
    if (lastMessage !== null) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(lastMessage.data);
      reader.onloadend = () => {
        const data = new Uint8Array(reader.result as ArrayBuffer);

        console.log("Reciving input from the websocket");

        const decoded = decodeMessage(data);
        console.log(decoded);
        if (decoded instanceof CreateMessageResponse) {
          //append msg to messageState
          if (typeof messageState !== "undefined") {
            setMessageState((messageState) => {
              if (typeof messageState === "undefined") {
                return;
              }
              return {
                ...messageState, // Merge existing state with new messages array
                messages: [...messageState.messages, decoded],
              } as GetMessagesResponse;
            });

            console.log("Message received!");
            console.log(messageState);
            //I think I need some sort of function here which filters the messages for dubplicates and then sets the message state
          }
        } else if (decoded instanceof Activity) {
          console.log("YES THIS IS OF TYPE ACTIVITY");
          //Append activity to activityState

          //TODO:
          setActivityState(decoded);
          console.log("Activity received!");
        }
      };
    }
    ref!.current!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [lastMessage, setMessageState, setActivityState]);

  //UseEffect hook that updates the socket url when the chatroom or channel is changed
  useEffect(() => {
    //Change the socket URL to the new chatroom and channel
    handleClickChangeSocketUrl();
    console.log(socketUrl);

    //Reset the message history
    setMessageState(undefined);

    //perform a get request to get the last 100 messages from the chatroom and channel
    (async function () {
      if (typeof chatroom === "undefined" || typeof channel === "undefined") {
        return;
      }
      const req = new GetMessagesRequest();
      req.channelUuid = channel;
      req.chatRoomUuid = chatroom;

      const response = (await messageClient.fetch(req)) as
        | GetMessagesResponse
        | undefined;
      if (response !== undefined) {
        console.log("Messages received!");
        setMessageState(response);
        console.log(response);
      } else {
        console.log("Messages not received!");
      }
    })();
    //scroll to the bottum of the chat using ref
  }, [chatroom, channel]);

  useEffect(() => {
    ref!.current!.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [messageState]);

  //Function which is called when the socket url is changed - Closes the old socket and opens a new one

  const handleClickChangeSocketUrl = useCallback(() => {
    if (chatroom === undefined) {
      console.log("Chatroom is undefined");
      return;
    }
    if (!channel === undefined) {
      console.log("Channel is undefined");
      return;
    }
    setSocketUrl(
      "ws://localhost:8000/ws?" +
        "chatroom=" +
        chatroom +
        "&channel=" +
        channel +
        "&user=" +
        userState?.uuid
    );
    console.log("Changed socket URL to:", socketUrl);
  }, [chatroom, channel]);

  //This function is used to send messages to the websocket
  /*   const handleClickSendMessage = useCallback(
    (msg: Uint8Array) => sendMessage(msg, true),
    []
  ); */

  const handleClickSendMessage = useCallback(
    (msg: Uint8Array) => {
      console.log(readyState);
      if (readyState === WebSocket.OPEN) {
        sendMessage(msg, true);
      } else {
        console.log("Websocket is not open");

        //Reconnect to the websocket
        handleClickChangeSocketUrl();
        //save the chatroom and channel ids

        //Set the chatroom and channel ids to the saved ones

        setTimeout(() => {
          //@ts-ignore
          if (readyState !== WebSocket.OPEN) {
            sendMessage(msg, true);
          }
        }, 1000); // retry sending message after 1 second
      }
    },
    [readyState, sendMessage]
  );

  return (
    <div className="h-screen w-screen bg-spotify3 flex flex-row justify-between max-h-screen">
      {chatroomState && (
        <Navbar
          key={
            (
              chatroomState.rooms.find(
                (room) => room.chatroomUuid === chatroom
              ) as GetRoomResponse
            ).chatroomUuid
          }
          chatroomState={
            chatroomState.rooms.find(
              (room) => room.chatroomUuid === chatroom
            ) as GetRoomResponse
          }
          open={open}
          onClose={setOpen}
        />
      )}
      <Footer
        handleClickSendMessage={handleClickSendMessage}
        user={userState!}
        channeluuid={channel}
        chatroomuuid={chatroom}
      />

      <div className="w-[32rem] z-20">
        {chatroomState && (
          <Chatroombar
            chatroomsState={chatroomState}
            setChatroom={setChatroom}
            setChannel={setChannel}
          />
        )}
      </div>

      {/*I might want to wrap this in a div with collum to fix the ref dummy issue*/}
      <div
        className={` sm:w-full w-full flex justify-center overflow-x-hidden  h-[96vh] overflow-y-scroll scrollbar-hide `}
      >
        {/*TODO: the magic number was mb-10 before */}
        <div className="sm:mb-6 sm:mt-20 mt-16 mb-10 sm:px-4 scrollbar-hide overflow-x-hidden w-full pb-28">
          {messageState &&
            usersState &&
            messageState.messages.map((msg) => (
              <Chat
                msg={msg}
                user={userState!}
                users={usersState!}
                key={msg.messageUuid}
              />
            ))}
          <div ref={ref}></div>
        </div>
      </div>
      {/*I might want to wrap this in a div with collum to fix the ref dummy issue*/}

      <div className="sm:w-[14rem] h-screen hidden sm:flex flex-col overflow-y-scroll  scrollbar-hide pt-28 bg-spotify3 shadow-inner">
        {/*  <div className=" flex flex-row sm:visible invisible pb-1 mb-4"></div> */}

        {activityState && usersState && (
          <Activitybar
            activityState={activityState!}
            usersState={usersState!}
          />
        )}
      </div>

      {/*REACT PORTALS */}
      <Account open={openAccount} onClose={() => setOpen(false)} />
      <Settings open={openSettings} onClose={() => setOpen(false)} />
    </div>
  );
}

//TODO:
//Known issues:
// Its not correct defaulting to index 0 of the chatroom array
//Not scrolling to the botton on reload

//TODO:
//Shit I haven't implemented yet
//Everything
