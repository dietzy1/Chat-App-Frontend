import { GetRoomsResponse } from "../api/protos/chatroom/v1/chatroomgateway_service_pb";

import { useEffect, useState } from "react";

function useChatRoomState(userState) {
  const [chatRoomState, setChatRoomState] = useState(null);



  useEffect(() => {
    (async function () {
      if (typeof userState?.uuid === "undefined") {
        return;
      }
      const req = new GetRoomsRequest();
      req.chatroomUuids = userState?.chatServers!;
      const res = (await chatroomClient.fetch(req)) as
        | GetRoomsResponse
        | undefined;
      if (typeof res !== "undefined") {
        console.log("Chatrooms received!");
        console.log(res);
        setChatRoomState(res);
  
        //Here we can add some default chatroom and channel upload loading
        if (typeof channel === "undefined") {
          setChannel(res.rooms[0].channel[0].channelUuid);
          console.log("Channel set to: ", channel);
        }
        if (typeof chatroom === "undefined") {
          setChatroom(res.rooms[0].chatroomUuid);
          console.log("Chatroom set to: ", chatroom);
        }
      } else {
        console.log("Chatrooms not received!");
      }
    })();
  }, [userState?.uuid]);

  return chatRoomState;
}

export default useChatRoomState;





