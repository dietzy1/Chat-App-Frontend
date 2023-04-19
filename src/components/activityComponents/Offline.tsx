/** @format */

import { GetUserResponse } from "../../api/protos/user/v1/usergateway_service_pb";

function Offline({
  user,
}: //activity,
{
  user: GetUserResponse;
  //activity: Activity;
}) {
  /*  console.log(activity.onlineUsers);
    const offlineUser = users.users.find((user) =>
      activity.onlineUsers.includes(user.uuid)
    ); */
  console.log(user);

  return (
    <div>
      {user?.name ? (
        <div className="max-w-xs break-all ml-auto w-48 shadow-inner">
          <div className="flex flex-row items-center hover:bg-gray-100 rounded-3xl mb-2">
            <div className="m-2 relative">
              <img
                className="w-10 h-10 border border-customOrange rounded-full grayscale-[30%] "
                alt=""
                src={user?.icon?.link}
              ></img>
              <div className="bg-customOrange rounded-full p-1.5  absolute bottom-0 right-0 z-2 grayscale-0" />
            </div>
            <div className="text-gray-500 grayscale-[70%]"> {user?.name}</div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
export default Offline;
