/** @format */

import { Activity } from "../api/protos/chatroom/v1/chatroomgateway_service_pb";
import { GetUsersResponse } from "../api/protos/user/v1/usergateway_service_pb";
import Online from "./activityComponents/Online";
import Offline from "./activityComponents/Offline";

function Activitybar({
  activityState,
  usersState,
}: {
  activityState: Activity;
  usersState: GetUsersResponse;
}) {
  //Calculate online users

  //Calculate offline users

  return (
    <div className="">
      <span className="text-base font-semibold text-white flex flex-col w-full ">
        <span className="">
          {"Online - " + activityState?.onlineUsers.length!}
        </span>
      </span>

      <div className=" flex justify-start flex-col">
        <div className="flex justify-start">
          {activityState.onlineUsers &&
            usersState.users &&
            activityState.onlineUsers.map((ac, i) => (
              <Online activity={ac} users={usersState} key={i} />
            ))}
        </div>

        <span className="text-base font-semibold text-white flex flex-col w-full">
          <span className="">
            {" "}
            {"Offline - " +
              (usersState?.users.length! - activityState?.onlineUsers.length!)}
          </span>
        </span>
        <div className="flex justify-start">
          {activityState?.onlineUsers &&
            usersState?.users &&
            usersState.users
              .filter((user) => !activityState.onlineUsers.includes(user.uuid))
              .map((user, i) => <Offline user={user} key={i} />)}
        </div>
      </div>
    </div>
  );
}

export default Activitybar;

{
  /* <div className="w-[20rem] self-start">
<span className="text-base font-semibold text-white flex flex-col w-full ">
  <span className=" max-w-xs ml-auto w-64 ">
    {"Online - " + activityState?.onlineUsers.length!}
  </span>
</span>

<div className="w-[100%] ">
  {activityState.onlineUsers &&
    usersState.users &&
    activityState.onlineUsers.map((ac, i) => (
      <Online activity={ac} users={usersState} key={i} />
    ))}

  <span className="text-base font-semibold text-white flex flex-col w-full">
    <span className="max-w-xs ml-auto w-64">
      {" "}
      {"Offline - " +
        (usersState?.users.length! - activityState?.onlineUsers.length!)}
    </span>
  </span>
  {activityState?.onlineUsers &&
    usersState?.users &&
    usersState.users
      .filter((user) => !activityState.onlineUsers.includes(user.uuid))
      .map((user, i) => <Offline user={user} key={i} />)}
</div>
</div> */
}
