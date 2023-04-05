/** @format */

import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";

import { GetUserResponse } from "../api/protos/user/v1/usergateway_service_pb";

const User = ({ user }: { user: GetUserResponse }) => {
  return (
    <div>
      <div className="flex flex-row m-2 border-b-4 border-customOrange rounded-b-sm rounded-xl pb-2  p-3">
        <div>
          <img src={user.icon?.link} className="rounded-full h-10 w-10" />
        </div>
        <div className="my-auto">{user.name}</div>
      </div>
    </div>
  );
};

export default User;
