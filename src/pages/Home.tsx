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
      <div className="sm:w-[20%] hidden sm:flex flex-col w-full h-[94vh] overflow-y-scroll scrollbar-hide pt-24 pl-4">
        {testArrayChatRoom &&
          testArrayChatRoom.map((test) => <Card chatroom={test} />)}
      </div>

      <div
        className={` sm:w-[60%] w-full flex justify-center overflow-x-hidden  border-gray-500 h-[98vh] overflow-y-scroll scrollbar-hide`}
      >
        {/*TODO:*/}
        <div className="sm:mb-10 sm:mt-16 mt-16 mb-10 sm:px-20 scrollbar-hide overflow-x-hidden max-w-[100%]">
          {testArrayMessage &&
            testArrayMessage.map((test) => (
              <Middlechat msg={test} user={testUser} />
            ))}
        </div>
      </div>

      <div className="sm:w-[20%] hidden sm:flex flex-col overflow-y-scroll h-screen scrollbar-hide pt-20">
        <div className=" flex flex-row sm:visible invisible pb-1 mb-4"></div>
        <span className="text-2xl font-semibold text-white mx-6">
          {"Online - 5"}
        </span>
        <div className="w-[90%]">
          {testArrayUser &&
            testArrayUser.map((test) => <Online props={test} />)}

          <span className="text-2xl font-semibold text-gray-white mx-6">
            {"Offline - 2"}
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
