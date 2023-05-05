/** @format */
import {
  Cog8ToothIcon,
  EllipsisVerticalIcon,
  UserCircleIcon,
  UserIcon,
  ChevronUpIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import React from "react";

import { GetUserResponse } from "../../api/protos/user/v1/usergateway_service_pb";
import { LogoutRequest } from "../../api/protos/auth/v1/authgateway_service_pb";
import { Client } from "../../api/Client";
import { AuthGatewayService } from "../../api/protos/auth/v1/authgateway_service_connect";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/context";
import { OpenModal } from "../../hooks/useModalState";

const User = ({
  user,
  openModal,
}: {
  user: GetUserResponse;
  openModal: OpenModal;
}) => {
  const [toggle, setToggle] = React.useState(false);
  const [state, dispatch] = useGlobalState();

  const navigate = useNavigate();

  const toggleUserInformation = () => {
    console.log("opening user information");

    //wait 300ms before toggling
    setTimeout(() => {
      setToggle(!toggle);
    }, 50);
  };

  const handleOpenUserSettings = (e: React.MouseEvent) => {
    e.preventDefault;

    openModal("openUser");
  };

  const handleOpenAccountSettings = (e: React.MouseEvent) => {
    e.preventDefault;

    openModal("openAccount");
  };

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault;

    const authClient = new Client(AuthGatewayService);

    const request = new LogoutRequest();
    const res = await authClient.fetch(request);

    if (res !== undefined) {
      console.log("Logged out");

      navigate("/login");
    } else {
      console.log("Something went wrong");
    }
  };

  return (
    <div
      onClick={toggleUserInformation}
      className="flex flex-row m-1 my-auto rounded-xl  py-1 p-3 hover:bg-spotify7"
    >
      {toggle && (
        <div className="bg-spotify2 rounded-2xl absolute border-spotify8 border  bottom-24 left-2 p-5 flex flex-col shadow-2xl">
          <div className="flex flex-row">
            <img
              className="h-20 w-20 rounded-full border border-customOrange p-2"
              src={user.icon?.link}
            />
            <div className="heading ml-4">
              <h2 className="text-3xl">{user.name}</h2>
              <div className="text-xs">#3321</div>
            </div>
          </div>

          <div className="w-full mb-2 border-b mt-2"> </div>

          <div className="bg-spotify3 p-4 rounded-xl mb-2 mt-2">
            <div className="text-xs font-extrabold">ChatApp member since</div>
            <div className="text-sm text-spotify5 mb-4">{user.joinDate}</div>

            <div className="text-xs font-extrabold">User description </div>
            <div className="text-sm text-spotify5 mb-2">{user.description}</div>
          </div>

          <div className="flex flex-row heading border-b border-spotify4 pb-2">
            <h2
              onClick={handleOpenUserSettings}
              className="bg-spotify6 w-36 border text-sm border-spotify4 rounded-lg text-center p-1 m-1"
            >
              Manage user
            </h2>
            <h2
              onClick={handleOpenAccountSettings}
              className="bg-spotify6 w-36 border text-sm border-spotify4 rounded-lg text-center p-1 m-1"
            >
              Manage account
            </h2>
            <h2
              onClick={handleLogout}
              className="bg-spotify6 w-36 text-sm border border-spotify4 rounded-lg text-center p-1 m-1"
            >
              Logout
            </h2>
          </div>
        </div>
      )}

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

      <div className="ml-4 my-auto">
        <ChevronUpDownIcon className="h-6 w-6" />
      </div>
    </div>
  );
};

export default User;

function userModal() {
  return <div></div>;
}
