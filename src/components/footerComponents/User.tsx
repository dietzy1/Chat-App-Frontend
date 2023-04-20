/** @format */
import {
  Cog8ToothIcon,
  EllipsisVerticalIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";

import { GetUserResponse } from "../../api/protos/user/v1/usergateway_service_pb";

const User = ({ user }: { user: GetUserResponse }) => {
  return (
    <div className="flex flex-row m-1 my-auto rounded-b-sm rounded-xl pb-2  p-3">
      <div>
        <img
          src={user.icon?.link}
          className="border rounded-md border-customOrange p-1 h-12 w-12"
        />
      </div>
      <div className="flex flex-col justify-center">
        <div className="pl-2 ml-4 text-xl border-l border-spotify7">
          {user.name}
        </div>
        <div className="pl-2 ml-4 text-xs border-l border-spotify7">#3321</div>
      </div>
    </div>
  );
};

export default User;
