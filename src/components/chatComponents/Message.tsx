/** @format */
import { useState, useEffect } from "react";

import { Msg } from "../../api/protos/message/v1/messagegateway_service_pb";
import { GetUserResponse } from "../../api/protos/user/v1/usergateway_service_pb";
import { GetUsersResponse } from "../../api/protos/user/v1/usergateway_service_pb";
import DateSeperator from "./DateSeperator";

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

    const parts = msg.timestamp.split(/[ :-]+/);
    const year = parseInt(parts[2]);
    const month = parseInt(parts[1]) - 1; // months are zero-indexed
    const day = parseInt(parts[0]);
    const hour = parseInt(parts[3]);
    const minute = parseInt(parts[4]);

    const date = new Date(year, month, day, hour, minute);
    console.log(date);

    const today = new Date();
    const yesterday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    );

    if (firstMsg) {
      setFirstMsgTimeStamp(
        date.toLocaleDateString([], {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      );
    }

    if (date.toDateString() === today.toDateString()) {
      setTimestamp(
        `Today at ${date.toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        })}`
      );
    } else if (date.toDateString() === yesterday.toDateString()) {
      setTimestamp(
        `Yesterday at ${date.toLocaleTimeString([], {
          hour: "numeric",
          minute: "numeric",
        })}`
      );
    } else {
      //potentially a bug here
      setTimestamp(date.toLocaleDateString());
    }
  }, []);

  return (
    <div>
      {firstMsg && (
        <div>
          <DateSeperator timestamp={firstMsgTimeStamp} />
        </div>
      )}
      <div className="flex flex-row m-2 justify-start w-full relative mb-10">
        <div className="flex flex-col">
          <div className="flex flex-row heading">
            <h2 className="ml-14 mr-8 text-lg my-0.5 font-sans font-semibold">
              {msg.author}
            </h2>
            <div className=" my-2  text-xs font-mono font-light opacity-50 text-[#A3A6AA]">
              {timestamp}
            </div>
          </div>

          <div className="block grow-0 pl-8 mx-6 p-3 break-words overflow-x-hidden  bg-spotify2   border border-customgray  rounded-2xl shadow-2xl">
            {msg.content}

            <div className="absolute border border-customOrange bg-blacky top-2 left-0 z-10 rounded-2xl">
              <img
                className="w-12 h-12  flex-shrink-0 rounded-full border-4 border-blacky z-10"
                alt=""
                src={icon!}
              ></img>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Message;
