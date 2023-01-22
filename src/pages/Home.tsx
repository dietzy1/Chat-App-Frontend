import React from "react";
import "../App.css";
import Card from "../components/Card";
import Middlechat from "../components/Chat";
import Searchbar from "../components/Searchbar";
import { useGlobalState } from "../context/context";
import { Navigate } from "react-router-dom";

import {
  testArrayMessage,
  testArrayUser,
  testUser,
  testArrayChatRoom,
  testChatRoom,
} from "./testData";

import Online, { Offline } from "../components/Online";
import Navbar from "../components/Navbar";
import Account from "../portals/Account";
import Chatroom, { CreateChatroom } from "../components/Chatroom";
import Channel from "../components/Channel";
import User from "../components/User";

//I need to make it so that every channel has a unique id which is the url path
//once every chatroom is attached to a url i can open and close websocket connections to each chatroom based on the user viewing the url

const Home = () => {
  const [state, dispatch] = useGlobalState();
  const [open, setOpen] = React.useState(false);

  if (!state.user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="h-screen w-screen flex flex-row justify-between max-h-screen">
      <Navbar chatroom={testChatRoom} open={open} onClose={setOpen} />
      {/*TODO:*/}

      <div className="w-[30rem] flex flex-row">
        <div className="sm:w-28 hidden sm:flex flex-col w-full overflow-y-scroll scrollbar-hide pt-24  justify-start drop-shadow-2xl bg-blacky border-r border-gray-900">
          {testArrayChatRoom &&
            /*        testArrayChatRoom.map((chatroom) => <Card chatroom={chatroom} />)} */
            testArrayChatRoom.map((chatroom) => (
              <Chatroom chatroom={chatroom} />
            ))}
          <CreateChatroom />
        </div>
        <div className="sm:w-full hidden sm:flex flex-col shrink overflow-y-scroll scrollbar-hide pt-32 bg-test drop-shadow-2xl border-gray-900 border-r">
          <div className="h-[93vh] flex flex-col">
            <div className="mx-auto underline-offset-4 underline text-xl ">
              BOBS CHATSERVER
            </div>
            <div>
              <Channel />
            </div>
          </div>
          <div className="h-[7vh] border-t">
            <User user={testUser} />
          </div>
        </div>
      </div>

      <div
        className={` sm:w-full w-full flex justify-center overflow-x-hidden border-gray-500 h-[96vh] overflow-y-scroll scrollbar-hide`}
      >
        {/*TODO:*/}
        <div className="sm:mb-10 sm:mt-16 mt-16 mb-10 sm:px-10 scrollbar-hide overflow-x-hidden max-w-[100%]">
          {testArrayMessage &&
            testArrayMessage.map((test) => (
              <Middlechat msg={test} user={testUser} />
            ))}
        </div>
      </div>

      <div className="sm:w-96 hidden sm:flex flex-col overflow-y-scroll h-screen scrollbar-hide pt-20 pl-4 bg-test border-l border-gray-900">
        {/*  <div className=" flex flex-row sm:visible invisible pb-1 mb-4"></div> */}
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
      <Searchbar />
      <Account open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

/* function open1(setOpen: any) {
  console.log("im getting called XD");
  setOpen(false);
} */

export default Home;
