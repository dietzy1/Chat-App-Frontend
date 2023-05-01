/** @format */
import { useState, useEffect } from "react";

import {
  EditMessageRequest,
  EditMessageResponse,
  Msg,
} from "../../api/protos/message/v1/messagegateway_service_pb";
import { GetUserResponse } from "../../api/protos/user/v1/usergateway_service_pb";
import { GetUsersResponse } from "../../api/protos/user/v1/usergateway_service_pb";
import DateSeperator from "./DateSeperator";
import { MessageTimestamp } from "./MessageTimestamp";
import { FormatMessages } from "./FormatMessage";

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Client } from "../../api/Client";
import { MessageGatewayService } from "../../api/protos/message/v1/messagegateway_service_connect";

function Message({
  msg,
  user,
  users,
  firstMsg,
}: {
  msg: Msg;
  user: GetUserResponse;
  users: GetUsersResponse;
  firstMsg: boolean;
}) {
  const sendEdited = (msg: Msg) => {
    const messageClient = new Client(MessageGatewayService);
    (async function () {
      const req = new EditMessageRequest();
      req.authorUuid = msg.authorUuid;
      req.content = text;
      req.messageUuid = msg.messageUuid;
      req.timestamp = msg.timestamp;
      req.channelUuid = msg.channelUuid;
      req.chatRoomUuid = msg.chatRoomUuid;
      req.author = msg.author;

      console.log(req);

      const response = (await messageClient.fetch(req)) as
        | EditMessageResponse
        | undefined;
      if (response !== undefined) {
        console.log("Messages received!");
        //Set the msg equal to the response
      } else {
        console.log("Messages not received!");
      }
    })();
  };

  const [timestamp, setTimestamp] = useState("");
  const [firstMsgTimeStamp, setFirstMsgTimeStamp] = useState("");
  const [icon, setIcon] = useState("");

  useEffect(() => {
    //Find a match uuid between the message and the user
    //Then set the icon to the icon of the user
    for (let i = 0; i < users.users.length; i++) {
      //console.log(user);
      if (msg.authorUuid === users.users[i].uuid) {
        setIcon(users.users[i].icon?.link!);
        //console.log(user.users[i].icon?.link!);
      }
    }

    MessageTimestamp({ msg, setTimestamp, firstMsg, setFirstMsgTimeStamp });
  }, []);

  const [text, setText] = useState(msg.content);
  const [editing, setEditing] = useState(false);

  const editMessage = (e: any) => {
    if (e.key === "Enter" || e.keyCode === 13) {
      console.log("editing message");
      e.preventDefault();

      confirmEditing();
    }
  };
  const confirmEditing = () => {
    console.log("editing message");
    editingToggle();

    sendEdited(msg);
  };

  const revertEditing = () => {
    setText(msg.content);
    editingToggle();
  };

  const editingToggle = () => {
    setEditing(!editing);
    console.log("editing: " + editing);
  };

  return (
    <div>
      {firstMsg && (
        <div>
          <DateSeperator timestamp={firstMsgTimeStamp} />
        </div>
      )}
      <div className="flex flex-row m-2 justify-start w-full relative mb-10 group/icon">
        <div className="flex flex-col">
          <div className="flex flex-row heading">
            <h2 className="ml-14 mr-8 text-lg my-0.5 font-sans font-semibold">
              {msg.author}
            </h2>
            <div className=" my-2  text-xs font-mono font-light opacity-50 text-[#A3A6AA]">
              {timestamp}
            </div>
          </div>

          <div className="block break-all pl-8 mx-6 p-3 break-words bg-spotify2   border border-customgray  rounded-2xl shadow-2xl">
            {editing ? (
              <div
                contentEditable="true"
                suppressContentEditableWarning={true}
                onKeyDown={editMessage}
                onKeyUp={(e) => setText(e.currentTarget.textContent!)}
              >
                {FormatMessages(msg.content)}
              </div>
            ) : (
              <div>{FormatMessages(msg.content)}</div>
            )}

            <div className="absolute border border-customOrange bg-blacky top-2 left-0 z-10 rounded-2xl">
              <img
                className="w-12 h-12  flex-shrink-0 rounded-full border-4 border-blacky z-10"
                alt=""
                src={icon!}
              ></img>
            </div>
          </div>
        </div>
        <span
          onClick={() => editingToggle()}
          className="my-auto place-self-end border-opacity-30 border rounded-3xl border-spotify4  shadow-md  transition-all duration-100 origin-top scale-0 group-hover/icon:scale-100"
        >
          <EllipsisVerticalIcon className="h-8 w-8 rounded-3xl text-white " />
        </span>
        {editing ? (
          <div className="flex-none my-auto">
            <span className="flex flex-row my-auto">
              <XMarkIcon
                onClick={revertEditing}
                className="h-8 w-8 ml-1 rounded-2xl text-white border-customOrange border "
              />
              <CheckIcon
                onClick={confirmEditing}
                className="h-8 w-8 ml-1 rounded-2xl text-white border-customOrange border"
              />
            </span>
          </div>
        ) : (
          <div className="flex-none my-auto invisible">
            <span className="flex flex-row my-auto">
              <XMarkIcon
                onClick={revertEditing}
                className="h-8 w-8 ml-1 rounded-2xl text-white border-customOrange border "
              />
              <CheckIcon
                onClick={confirmEditing}
                className="h-8 w-8 ml-1 rounded-2xl text-white border-customOrange border"
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
export default Message;
