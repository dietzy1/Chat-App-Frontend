import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import { ChatroomType } from "../types/interfaces";

const Chatroom = ({ chatroom }: { chatroom: ChatroomType }) => {
  return (
    <div className="m-2 flex justify-center">
      {/*   <img className="rounded-full w-16 h-16" src={chatroom.icon}></img> */}

      <a className="author-avatar" href="">
        <img src={chatroom.icon} />

        <svg className="half-circle" viewBox="0 0 106 57">
          <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
        </svg>
      </a>
    </div>
  );
};

export default Chatroom;

export const CreateChatroom = () => {
  return (
    <div className="m-2 flex justify-center">
      <PlusIcon className="w-16 h-16 rounded-full bg-customgray text-customOrange" />
    </div>
  );
};

{
  /* <div className="my-auto relative justify-center flex group">
            <UserCircleIcon
              onClick={closeFunc}
              className="text-white h-10 w-10 mx-5 hover:border-4 rounded-full border-gray-600"
            ></UserCircleIcon>
            <span className="absolute w-auto mx-auto px-3 py-2 m-2 min-w-max top-16 rounded-2xl shadow-md text-white bg-gray-500 text-xs font-bold transition-all duration-100 origin-top scale-0 group-hover:scale-100">
              Account
            </span>
          </div> */
}
