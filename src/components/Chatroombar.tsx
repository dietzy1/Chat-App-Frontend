/** @format */

import {
  GetRoomResponse,
  GetRoomsResponse,
} from "../api/protos/chatroom/v1/chatroomgateway_service_pb";
import Channel from "./chatroomComponents/Channel";
import Chatroom from "./chatroomComponents/Chatroom";
import CreateChatroom from "./chatroomComponents/CreateChatroom";

import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";

function Chatroombar({
  chatroomsState,

  setChatroom,

  setChannel,

  openModal,
  closeModal,
}: {
  chatroomsState: GetRoomsResponse;

  setChatroom: React.Dispatch<React.SetStateAction<string>>;

  setChannel: React.Dispatch<React.SetStateAction<string>>;

  openModal: any;
  closeModal: any;
}) {
  return (
    <div className="bg-spotify8 flex flex-col fixed left-0">
      <svg
        width="50.99999999999994"
        height="50.18129158594763"
        viewBox="0 0 389.77777777777777 135.18517676027324"
        className="mt-2 w-80 bg-spotify8"
      >
        <defs id="SvgjsDefs1213"></defs>
        <g
          id="id1"
          transform="matrix(1.6148796129481866,0,0,1.6148796129481866,-12.132872616436643,-3.1509148458173186)"
          fill="#ffaa64"
        >
          <g xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M50.023,52.662c8.141,0,20.761-8.777,13.741-23.499c-0.393-0.824,0.732-1.517,1.283-0.79    c11.625,15.355-1.063,32.072-15.024,32.072h-0.045c-13.961,0-26.649-16.717-15.024-32.072c0.551-0.728,1.676-0.034,1.283,0.79    C29.217,43.886,42.063,52.662,50.023,52.662L50.023,52.662z"></path>
              <path d="M60.879,65.505c9.612-4.494,19.223-0.315,19.223,9.098c0,6.348-5.974,14.285-15.584,9.534    c-0.664-0.328-0.323-1.321,0.405-1.183c5.695,1.082,9.701-2.839,9.701-7.259c0-6.563-7.359-6.012-11.733-3.508L39.121,83.852    c-9.612,4.494-19.223,0.315-19.223-9.098c0-6.348,5.974-14.285,15.584-9.534c0.664,0.328,0.323,1.321-0.405,1.183    c-5.695-1.082-9.701,2.839-9.701,7.259c0,6.563,7.359,6.012,11.733,3.508l23.771-11.667L60.879,65.505z"></path>
              <path d="M50,14.336c-9.557,0-11.465,14.069-5.809,19.744c0.591,0.593,1.536-0.166,1.086-0.872    C42.275,28.49,44.737,20.636,50,20.645c5.263-0.009,7.725,7.845,4.723,12.562c-0.45,0.707,0.495,1.466,1.086,0.872    C61.465,28.405,59.557,14.336,50,14.336z"></path>
            </g>
          </g>
        </g>
        <g
          id="id2"
          transform="matrix(1.8470226950877024,0,0,1.8470226950877024,131.72287320100386,7.891661903993658)"
          fill="#ff8264"
        >
          <path d="M24 11.428999999999998 l7.4286 0 l0 28.571 l-7.4286 0 l0 -16 l-5.0286 9.7143 l-3.7143 0 l-4.9714 -9.7143 l0 16 l-7.4286 0 l0 -28.571 l7.4286 0 l6.8571 12.971 z M36.285714285714285 40 l0 -5.7143 l2.2857 0 l0 -17.143 l-2.2857 0 l0 -5.7143 l12 0 l0 5.7143 l-2.2857 0 l0 17.143 l2.2857 0 l0 5.7143 l-12 0 z M69.71471428571428 17.714 l-9.1429 0 l0 16 l9.1429 0 l2.2857 -2.2857 l5.4286 0 l0 4.2857 l-4.2857 4.2857 l-15.714 0 l-4.2857 -4.2857 l0 -20 l4.2857 -4.2857 l15.714 0 l4.2857 4.2857 l0 4.2857 l-5.4286 0 z M108.85671428571428 15.713999999999999 l0 10 l-4.2857 4.2857 l4.2857 6.5714 l0 3.4286 l-6.8571 0 l-5.9429 -9.7143 l-5.4857 0 l0 9.7143 l-7.4286 0 l0 -28.571 l21.429 0 z M101.42871428571428 24 l0 -6.2857 l-10.857 0 l0 6.2857 l10.857 0 z M135.42828571428572 11.428999999999998 l4.2857 4.2857 l0 20 l-4.2857 4.2857 l-16.571 0 l-4.2857 -4.2857 l0 -20 l4.2857 -4.2857 l16.571 0 z M132.28528571428572 33.7143 l0 -16 l-10.286 0 l0 16 l10.286 0 z"></path>
        </g>
        <g
          id="SvgjsG1216"
          transform="matrix(1.2353062221239905,0,0,1.2353062221239905,133.46961640443138,77.88254884237102)"
          fill="#ff8264"
        >
          <path d="M19.429 17.714 l-9.1429 0 l0 16 l9.1429 0 l2.2857 -2.2857 l5.4286 0 l0 4.2857 l-4.2857 4.2857 l-15.714 0 l-4.2857 -4.2857 l0 -20 l4.2857 -4.2857 l15.714 0 l4.2857 4.2857 l0 4.2857 l-5.4286 0 z M50.629000000000005 11.428999999999998 l7.4286 0 l0 28.571 l-7.4286 0 l0 -11.143 l-10.286 0 l0 11.143 l-7.4857 0 l0.057143 -28.571 l7.4286 0 l0 11.143 l10.286 0 l0 -11.143 z M63.771385714285714 40 l0 -24.286 l4.2857 -4.2857 l16.571 0 l4.2857 4.2857 l0 24.286 l-7.4286 0 l0 -8 l-10.286 0 l0 8 l-7.4286 0 z M71.20028571428571 25.714 l10.286 0 l0 -8 l-10.286 0 l0 8 z M92.62856857142857 17.714 l0 -6.2857 l24.286 0 l0 6.2857 l-8.4571 0 l0 22.286 l-7.4286 0 l0 -22.286 l-8.4 0 z M120.62852857142857 40 l0 -24.286 l4.2857 -4.2857 l16.571 0 l4.2857 4.2857 l0 24.286 l-7.4286 0 l0 -8 l-10.286 0 l0 8 l-7.4286 0 z M128.05742857142857 25.714 l10.286 0 l0 -8 l-10.286 0 l0 8 z M151.48567142857144 40 l0 -28.571 l20.857 0 l4.2857 4.2857 l0 12 l-4.2857 4.2857 l-13.429 0 l0 8 l-7.4286 0 z M158.91457142857143 25.714 l10.286 0 l0 -8 l-10.286 0 l0 8 z M182.3428142857143 40 l0 -28.571 l20.857 0 l4.2857 4.2857 l0 12 l-4.2857 4.2857 l-13.429 0 l0 8 l-7.4286 0 z M189.7717142857143 25.714 l10.286 0 l0 -8 l-10.286 0 l0 8 z"></path>
        </g>
      </svg>

      <div className="flex flex-row mt-5">
        <div className="sm:w-28 h-[97vh] hidden sm:flex flex-col w-full overflow-y-scroll scrollbar-hide mt-0.5 pt-8  justify-start  bg-spotify6">
          <div className="border-b mx-3 border-spotify7 flex justify-center pb-2">
            <ChatBubbleBottomCenterIcon className="rounded-full  border-t-[4px] border-l-[1.7px] border-r-[1.7px] p-1.5 border-spotify7" />
            {/* <ChatBubbleBottomCenterIcon className="h-12 w-12 text-spotify7 border p-1 rounded-2xl border-spotify7" /> */}
          </div>

          {chatroomsState.rooms.map((chatroom) => (
            <Chatroom
              chatroomState={chatroom}
              setChatroom={setChatroom}
              key={chatroom.chatroomUuid}
            />
          ))}
          {/*Component for adding chatservers*/}
          <CreateChatroom openModal={openModal} closeModal={closeModal} />
        </div>

        <div className="sm:w-full hidden sm:flex flex-col shrink bg-spotify3  pt-[3rem] mt-0.5 drop-shadow-2xl shadow-inner opacity-95 border-gray-900">
          <div className="h-[92vh] flex flex-col overflow-y-scroll scrollbar-hide">
            <Channel
              channelState={chatroomsState.rooms[0]}
              setChannel={setChannel}
              openModal={openModal}
            />
          </div>
        </div>

        {/*    <Channel /> */}
      </div>
    </div>
  );
}
export default Chatroombar;

{
  /*    <div className="w-[20rem] flex flex-row">
        <div className="sm:w-28 h-[98vh] hidden sm:flex flex-col w-full overflow-y-scroll scrollbar-hide pt-24  justify-start  bg-spotify8">
          {chatroomState &&
            chatroomState.rooms.map((chatroom) => (
              <Chatroom
                chatroomState={chatroom}
                setChatroom={setChatroom}
                key={chatroom.chatroomUuid}
              />
            ))}
        </div>

        <div className="sm:w-full hidden sm:flex flex-col shrink bg-spotify8  pt-28 drop-shadow-2xl border-gray-900">
          <div className="h-[92vh] flex flex-col overflow-y-scroll scrollbar-hide">
            <div>
              {chatroomState &&
                chatroomState.rooms.map((chatroom, i) => (
                  <Channel
                    channelState={chatroom}
                    setChannel={setChannel}
                    key={chatroom.channel[i].channelUuid}
                  />
                ))}
            </div>
          </div>
        </div>
      </div> */
}
