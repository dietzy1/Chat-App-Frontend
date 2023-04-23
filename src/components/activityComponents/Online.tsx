/** @format */

import { Activity } from "../../api/protos/chatroom/v1/chatroomgateway_service_pb";
import {
  GetUserResponse,
  GetUsersResponse,
} from "../../api/protos/user/v1/usergateway_service_pb";
import { useState } from "react";

function Online({
  users,
  activity,
}: {
  users: GetUsersResponse;
  activity: string;
}) {
  const onlineUser = users.users.find((user) => activity.includes(user.uuid));

  return (
    <div>
      {onlineUser?.name ? (
        <div className="max-w-xs ml-auto break-all w-40 shadow-inner">
          <div className="flex flex-row items-center hover:bg-gray-100  rounded-3xl mb-2">
            <div className="m-2 relative">
              <img
                className="w-10 h-10 border rounded-full border-customOrange"
                alt=""
                src={onlineUser.icon?.link}
              ></img>
              <div className="bg-green-500 rounded-full p-1.5  absolute bottom-0 right-0 z-2" />
            </div>
            <div className="text-gray-500"> {onlineUser.name}</div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default Online;
