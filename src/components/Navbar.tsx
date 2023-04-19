/** @format */

import { HomeIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { ChatroomType } from "../types/interfaces";
import { useGlobalState } from "../context/context";
import { GetRoomResponse } from "../api/protos/chatroom/v1/chatroomgateway_service_pb";

const Navbar = ({
  chatroomState,
  open,
  onClose,
}: {
  chatroomState: GetRoomResponse;
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div>
      <nav className="text-white flex flex-row h-20 w-full bg-spotify8 fixed top-0 justify-items-stretch z-20  shadow-lg">
        {/*  <div className="flex flex-row justify-center "> */}
        <div className="sm:w-[30rem] w-0 flex flex-row">
          <div className="w-28"></div>
          {/*  <div className="flex flex-row">
            <img src="src/assets/fire.png" className="" />
            <div className="whitespace-nowrap my-auto text-xl">Dev Chat</div>
          </div> */}
          <div className="sm:hidden flex">
            {/* <Hamburger
        direction="left"
        color="gray"
        toggle={setLeftHamburger}
        toggled={leftHamburger}
        onToggle={() => {
          setRightHamburger(false);
        }}
      /> */}
          </div>
        </div>

        <div className="w-full flex flex-row justify-center">
          <div className="my-auto text-3xl mx-auto  bold">
            {chatroomState.name}
          </div>

          {/*  <div className="sm:hidden flex"> */}
          {/*    <Hamburger
      direction="right"
      color="gray"
      toggle={setRightHamburger}
      toggled={rightHamburger}
      onToggle={() => {
        setLeftHamburger(false);
      }}
    /> */}
          {/*     </div> */}
        </div>
        <div className="sm:w-[30rem] w-0 flex flex-row" />

        {/*  <div className="w-0 flex flex-row justify-end px-6">
          <div className="my-auto relative justify-center flex group">
            <UserCircleIcon
              onClick={closeFunc}
              className="text-white h-10 w-10 mx-5 hover:border-4 rounded-full border-gray-600"
            ></UserCircleIcon>
            <span className="absolute w-auto mx-auto px-3 py-2 m-2 min-w-max top-16 rounded-2xl shadow-md text-white bg-gray-500 text-xs font-bold transition-all duration-100 origin-top scale-0 group-hover:scale-100">
              Account
            </span>
          </div>

          <div className="my-auto relative justify-center flex group">
            <ArrowLeftOnRectangleIcon
              onClick={Logoutfunc}
              className="text-white h-10 w-10 mx-5 hover:border-4 border-gray-600 rounded-full"
            ></ArrowLeftOnRectangleIcon>
            <span className="absolute w-auto mx-auto px-3 py-2 m-2 min-w-max top-16 rounded-2xl shadow-md text-white bg-gray-500 text-xs font-bold transition-all duration-100 origin-top scale-0 group-hover:scale-100">
              Logout
            </span>
          </div>
        </div> */}
      </nav>
    </div>
  );
};

export default Navbar;
