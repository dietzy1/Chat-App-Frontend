/** @format */
import { createPortal } from "react-dom";
import { useState } from "react";
import {
  CreateRoomRequest,
  CreateRoomResponse,
} from "../api/protos/chatroom/v1/chatroomgateway_service_pb";
import { Client } from "../api/Client";
import { ChatroomGatewayService } from "../api/protos/chatroom/v1/chatroomgateway_service_connect";
import { GetUserResponse } from "../api/protos/user/v1/usergateway_service_pb";

function CreateChatroomModal({
  open,
  onClose,
  user,
}: {
  open: Boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  user: GetUserResponse;
}) {
  const closeFunc = () => {
    onClose(false);
  };

  const [serverName, setServerName] = useState(`${user.name}` + "'s server");

  const submitCreateChatroom = () => {
    console.log("submitting");
    (async function () {
      const chatroomClient = new Client(ChatroomGatewayService);
      const req = new CreateRoomRequest();
      req.name = serverName;
      req.ownerUuid = user.uuid;
      const response = (await chatroomClient.fetch(req)) as
        | CreateRoomResponse
        | undefined;
      if (response !== undefined) {
        console.log("Succesfully created chatroom!");
        //Perhabs we want to manually force a refresh of the chatroom list here?

        //TODO: THERE IS AN ISSUE WITH THE BACKEND NOT ADDING THE NEWLY CREATED CHATROOM TO THE OWNERS LIST OF CHATROOMS
        //FIXME: THERE IS ANOTHER ISSUE WITH THE BACKEND GENERATING 2 CHANNELS FOR THE SAME CHATROOM

        //A BUG
      } else {
        console.log("Failed to create chatroom!");
      }
    })();
  };

  if (!open) return null;
  return createPortal(
    <div
      className="top-0 bottom-0 right-0 left-0 fixed z-[30] backdrop-blur-sm shadow-xl flex justify-center"
      onClick={closeFunc}
    >
      <div className="h-[50vh] mt-60 w-[50vh] flex flex-row  max-h-screen">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          //this is where I need to add the background image
          className="my-auto bg-spotify8 m-10 rounded-3xl mx-auto"
        >
          <div className="m-16 flex flex-col">
            <div className="text-3xl text-center border-b border-spotify2 pb-4 mb-4">
              Create a chatserver
            </div>

            <div className="bg-spotify3 rounded-xl p-5 px-10 flex flex-col">
              <div className="text-sm mb-12 mx-4 font-light border-b pb-4 border-spotify7">
                Your own personal chatserver to hangout with whoever you want!
              </div>

              <label
                className="text-start font-extrabold px-4"
                htmlFor="username"
              >
                Server name
              </label>
              <input
                className="rounded-lg bg-spotify6 mt-2 p-2 px-4 mb-12  focus:border-greeny focus:bg-spotify7 focus:outline-none border border-customOrange"
                type="text"
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
              />

              <div
                onClick={submitCreateChatroom}
                className="rounded-lg bg-spotify6 mt-2 p-2 px-4 mb-4 focus:border-greeny focus:bg-spotify7 focus:outline-none border border-spotify4"
              >
                Click here to Create your chatserver!
              </div>
            </div>

            <div className="border-b border-white p-4"></div>
            <div className="flex flex-col heading">
              <div className="text-center text-white mt-8">
                Already got an invite?
              </div>
              <h2 className="rounded-lg mt-2 p-2 px-4 text-center focus:border-greeny focus:bg-spotify7 focus:outline-none border border-customOrange">
                Join a server
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
}
export default CreateChatroomModal;
