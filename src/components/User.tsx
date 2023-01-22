import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { UserType } from "../types/interfaces";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

const User = ({ user }: { user: UserType }) => {
  return (
    <div>
      <div className="flex flex-row justify-between m-2 border-b-4 border-customOrange rounded-b-sm rounded-xl pb-2  p-3">
        <div>
          <img src={user.icon} className="rounded-full h-10 w-10" />
        </div>
        <div className="my-auto">{user.author}</div>
        <Cog8ToothIcon className="h-6 w-6 my-auto" />
      </div>
    </div>
  );
};

export default User;
