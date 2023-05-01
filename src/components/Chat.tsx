/** @format */

import { useEffect } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

import {
  GetUserResponse,
  GetUsersResponse,
} from "../api/protos/user/v1/usergateway_service_pb";
import {
  GetMessagesResponse,
  Msg,
} from "../api/protos/message/v1/messagegateway_service_pb";

import Message from "./chatComponents/Message";

function Chat({
  messages,
  user,
  users,
}: {
  messages: GetMessagesResponse;
  user: GetUserResponse;
  users: GetUsersResponse;
}) {
  //Function that loops through messages and adds the uuid to an array, of messages that are the first message of the day
  function getFirstMessagesOfDay(messages: Msg[]) {
    let firstMsgs: string[] = [];
    let currentDate: string | null = null;

    messages.forEach((msg) => {
      const msgDate = new Date(msg.timestamp).toDateString();
      if (currentDate !== msgDate) {
        firstMsgs.push(msg.messageUuid);
        currentDate = msgDate;
      }
    });

    return firstMsgs;
  }
  const firstMsgs = getFirstMessagesOfDay(messages.messages);

  return (
    <div>
      {messages.messages.map((msg) => (
        <Message
          msg={msg}
          user={user}
          users={users}
          key={msg.messageUuid}
          firstMsg={firstMsgs.includes(msg.messageUuid)}
        />
      ))}
    </div>
  );
}
export default Chat;
