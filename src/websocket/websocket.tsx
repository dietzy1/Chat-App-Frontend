import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { defaultGlobalStateType } from "../context/context";

//I will recieve the uuid of the websocket connection from the global state of the chat server you are on
//Its probaly going to be something along with trying to hit up an URL that contains the uuid of the specific channel

//TODO: https://github.com/bufbuild/protobuf-es

export const OpenWSConn = (stateYep: defaultGlobalStateType) => {
  //The URL of the websocket I am trying to connect to
  const [socketUrl, setSocketUrl] = useState(
    "ws://localhost:8000/ws?" + stateYep.channel
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
    () => setSocketUrl("ws://localhost:8000/ws?" + stateYep.channel),
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

  /*   return (
    <div>
      <button onClick={handleClickChangeSocketUrl}>
        Click Me to change Socket Url
      </button>
      <button
        onClick={handleClickSendMessage}
        disabled={readyState !== ReadyState.OPEN}
      >
        Click Me to send 'Hello'
      </button>
      <span>The WebSocket is currently {connectionStatus}</span>
      {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
      <ul>
        {messageHistory.map((message: any, idx: any) => (
          <span key={idx}>{message ? message.data : null}</span>
        ))}
      </ul>
    </div>
  ); */
};
