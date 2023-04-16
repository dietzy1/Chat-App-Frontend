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

const Home = () => {
  const [state, dispatch] = useGlobalState();
  const [open, setOpen] = React.useState(false);

  //Searchbar logic and state
  const [input, setInput] = useState("");
  const ref = useRef<HTMLInputElement>(null);

  //State for chatrooms and channels
  const [chatroomState, setChatRoomState] = useState<
    GetRoomsResponse | undefined
  >(undefined);

  //State for user itself
  const [userState, setUserState] = useState<GetUserResponse | undefined>(
    undefined
  );

  //Const to control users in a chatroom
  const [usersState, setUsersState] = useState<GetUsersResponse | undefined>(
    undefined
  );

  //State for messages in a channel
  const [messageState, setMessageState] = useState<
    GetMessagesResponse | undefined
  >();

  //State for activity in a chatroom
  const [activityState, setActivityState] = useState<Activity | undefined>(
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
    "ws://localhost:8000/ws?" +
      "chatroom=" +
      chatroom +
      "&channel" +
      channel +
      "&user=" +
      userState?.uuid
  );

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

  //Use effect hook that userState when the chatroom is changed (this is to get the users in the chatroom)
  //Later I need to hook it up with a websocket connection that reports who is online
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

  //Use effect hook that requests array of chatrooms when the user logs in
  useEffect(() => {
    (async function () {
      if (typeof userState?.uuid === "undefined") {
        return;
      }
      const req = new GetRoomsRequest();
      req.chatroomUuids = userState?.chatServers!;
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
  }, [userState?.uuid]);

  useEffect(() => {
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
  }, [channel, chatroom]);

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

  //Use effect hook that loads in the users in the chatroom
  useEffect(() => {
    (async function () {
      if (typeof chatroom === "undefined") {
        return;
      }
      const req = new GetUsersRequest();
      let userUuids: string[] = [];

      //I need to identify which chatroom is currently selected and use that ID to get the users in that chatroom
      chatroomState?.rooms?.forEach((room) => {
        if (room.chatroomUuid === chatroom) {
          userUuids = room.userUuids;
        }
      });

      console.log("Requesting user uuids: ", userUuids);

      req.userUuids = userUuids;

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
  }, [chatroom]);

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
  const handleClickSendMessage = useCallback(
    (msg: Uint8Array) => sendMessage(msg, true),
    []
  );

  return (
    <div className="h-screen w-screen wtf flex flex-row justify-between max-h-screen">
      {/* {chatroomState && (
        <Navbar
          key={chatroomState.rooms[0].chatroomUuid}
          chatroomState={chatroomState.rooms[0]}
          open={open}
          onClose={setOpen}
        />
      )} */}
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

      <div className="w-[30rem] flex flex-row">
        <div className=" flex flex-col">
          <div className="sm:w-28 h-[93vh] hidden sm:flex flex-col w-full overflow-y-scroll scrollbar-hide pt-24  justify-start  bg-blacky border-r border-gray-900">
            {chatroomState &&
              chatroomState.rooms.map((chatroom) => (
                <Chatroom
                  chatroomState={chatroom}
                  setChatroom={setChatroom}
                  key={chatroom.chatroomUuid}
                />
              ))}
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
              {chatroomState &&
                chatroomState.rooms.map((chatroom, i) => (
                  <Channel
                    channelState={chatroom}
                    setChannel={setChannel}
                    key={chatroom.channel[i].channelUuid}
                  />
                ))}

              {/*  <Channel channelState={chatroomState} setChannel={setChannel} /> */}
            </div>
          </div>
          <div className="h-[8vh] border-t bg-test mt-4">
            {userState && <User user={userState!} />}
          </div>
        </div>
      </div>

      {/*I might want to wrap this in a div with collum to fix the ref dummy issue*/}
      <div
        className={` sm:w-full w-full flex justify-center overflow-x-hidden border-gray-500 h-[96vh] overflow-y-scroll scrollbar-hide `}
      >
        {/*TODO: the magic number was mb-10 before */}
        <div className="sm:mb-6 sm:mt-20 mt-16 mb-10 sm:px-20 scrollbar-hide overflow-x-hidden max-w-[100%] pb-28">
          {messageState &&
            usersState &&
            messageState.messages.map((msg) => (
              <Chat msg={msg} user={usersState!} key={msg.messageUuid} />
            ))}
          <div ref={ref}></div>
        </div>
      </div>
      {/*I might want to wrap this in a div with collum to fix the ref dummy issue*/}

      <div className="sm:w-96 h-screen hidden sm:flex flex-col overflow-y-scroll  scrollbar-hide pt-28 bg-test border-l border-gray-900">
        {/*  <div className=" flex flex-row sm:visible invisible pb-1 mb-4"></div> */}
        <div className="h-[92rem]">
          <span className="text-2xl font-semibold text-white flex flex-col w-full">
            <span className=" max-w-xs ml-auto w-64">
              {"Online - " + activityState?.onlineUsers.length!}
            </span>
          </span>

          <div className="w-[100%] ">
            {activityState?.onlineUsers &&
              usersState?.users &&
              activityState.onlineUsers.map((ac, i) => (
                <Online activity={ac} users={usersState!} key={i} />
              ))}

            <span className="text-2xl font-semibold text-white flex flex-col w-full">
              <span className="max-w-xs ml-auto w-64">
                {" "}
                {"Offline - " +
                  (usersState?.users.length! -
                    activityState?.onlineUsers.length!)}
              </span>
            </span>
            {activityState?.onlineUsers &&
              usersState?.users &&
              usersState.users
                .filter(
                  (user) => !activityState.onlineUsers.includes(user.uuid)
                )
                .map((user, i) => (
                  <Offline /* activity={activityState} */ user={user} key={i} />
                ))}
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
        /* input={input}
        setInput={setInput} */
        handleClickSendMessage={handleClickSendMessage}
        user={userState!}
        channeluuid={channel}
        chatroomuuid={chatroom}
      />
      {/* <Searchbar /> */}
      {/*REACT PORTALS */}
      <Account open={openAccount} onClose={() => setOpen(false)} />
      <Settings open={openSettings} onClose={() => setOpen(false)} />
    </div>
  );
};
export default Home;

//TODO:
//Known issues:
// Its not correct defaulting to index 0 of the chatroom array
//Not scrolling to the botton on reload

//TODO:
//Shit I haven't implemented yet
//Everything
