import React from "react";
import "../App.css";
import { useGlobalState } from "../context/context";
import { Navigate } from "react-router-dom";

//ICONS
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

//TEST DATA
import {
  testArrayMessage,
  testArrayUser,
  testUser,
  testArrayChatRoom,
  testChatRoom,
  testArrayChannel,
} from "./testData";

//COMPONENTS
import Online, { Offline } from "../components/Online";
import Navbar from "../components/Navbar";
import User from "../components/User";
import Channel from "../components/Channel";
import Chatroom, { CreateChatroom } from "../components/Chatroom";
import Chat from "../components/Chat";
import Searchbar from "../components/Searchbar";

//PORTALS
import { openAccountFunc, openSettingsFunc } from "../portals/Openportals";
import Account from "../portals/Account";
import Settings from "../portals/Settings";

//API
import { Logoutfunc } from "../api/Auth";

//I need to make it so that every channel has a unique id which is the url path
//once every chatroom is attached to a url i can open and close websocket connections to each chatroom based on the user viewing the url

const Home = () => {
  const [state, dispatch] = useGlobalState();
  const [open, setOpen] = React.useState(false);

  //Portals
  const [openAccount, setOpenAccount] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);

  if (!state.user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="h-screen w-screen wtf flex flex-row justify-between max-h-screen">
      <Navbar chatroom={testChatRoom} open={open} onClose={setOpen} />
      {/*TODO:*/}

      <div className="w-[30rem] flex flex-row">
        <div className=" flex flex-col">
          <div className="sm:w-28 h-[93vh] hidden sm:flex flex-col w-full overflow-y-scroll scrollbar-hide pt-24  justify-start  bg-blacky border-r border-gray-900">
            {testArrayChatRoom &&
              /*        testArrayChatRoom.map((chatroom) => <Card chatroom={chatroom} />)} */
              testArrayChatRoom.map((chatroom) => (
                <Chatroom chatroom={chatroom} />
              ))}
          </div>

          <div className="h-[7vh] flex border-gray-900 drop-shadow-2xl mx-auto">
            {/* <ArrowLeftOnRectangleIcon className="text-white w-10 h-10 my-auto mx-auto" /> */}

            <CreateChatroom />
          </div>
        </div>

        <div className="sm:w-full hidden sm:flex flex-col shrink bg-test  pt-28 drop-shadow-2xl border-gray-900 border-r">
          <div className="h-[92vh] flex flex-col overflow-y-scroll scrollbar-hide">
            <div>
              <Channel channels={testArrayChannel} />
            </div>
          </div>
          <div className="h-[8vh] border-t bg-test mt-4">
            <User user={testUser} />
          </div>
        </div>
      </div>

      <div
        className={` sm:w-full w-full flex justify-center overflow-x-hidden border-gray-500 h-[96vh] overflow-y-scroll scrollbar-hide`}
      >
        {/*TODO:*/}
        <div className="sm:mb-10 sm:mt-24 mt-16 mb-10 sm:px-20 scrollbar-hide overflow-x-hidden max-w-[100%]">
          {testArrayMessage &&
            testArrayMessage.map((test) => <Chat msg={test} user={testUser} />)}
        </div>
      </div>

      <div className="sm:w-96 h-screen hidden sm:flex flex-col overflow-y-scroll  scrollbar-hide pt-28 bg-test border-l border-gray-900">
        {/*  <div className=" flex flex-row sm:visible invisible pb-1 mb-4"></div> */}
        <div className="h-[92rem]">
          <span className="text-2xl font-semibold text-white flex flex-col w-full">
            <span className=" max-w-xs ml-auto w-64">{"Online - 5"}</span>
          </span>

          <div className="w-[100%]">
            {testArrayUser &&
              testArrayUser.map((test) => <Online props={test} />)}

            <span className="text-2xl font-semibold text-white flex flex-col w-full">
              <span className="max-w-xs ml-auto w-64"> {"Offline - 2"}</span>
            </span>
            {testArrayUser &&
              testArrayUser.map((test) => <Offline props={test} />)}
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
              onClick={() => Logoutfunc(dispatch)}
            />
          </div>
        </div>
      </div>

      <Searchbar />
      {/*REACT PORTALS */}
      <Account open={openAccount} onClose={() => setOpen(false)} />
      <Settings open={openSettings} onClose={() => setOpen(false)} />
    </div>
  );
};
export default Home;
