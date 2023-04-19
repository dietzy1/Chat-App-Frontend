/** @format */
import { PlusIcon } from "@heroicons/react/24/outline";
import Hover from "./Hover";
function CreateChatroom() {
  //I need to add some onclick function here

  const handleOnClick = () => {
    console.log("Clicked");

    /*    const client = new Client(ChatroomGatewayService);
  
      const req = new CreateRoomRequest();
      req.name = "Default Server";
      req.ownerUuid = "d542a0e0-48db-42f8-a1bb-0b0615821145";
      client.fetch(req); */
  };

  return (
    <div className="my-2 flex justify-center relative group shadow-inner">
      <div className="m-2 flex justify-center shadow-inner">
        <PlusIcon
          className="w-12 h-12 rounded-full bg-spotify2 text-customOrange"
          onClick={handleOnClick}
        />
      </div>

      <div className="fixed left-[4.5rem] my-2 w-auto p-3 m-4 min-w-max rounded-md shadow-md text-white bg-gradient-to-l from-red-400 to-orange-400 text-xs font-bold z-10 group-hover:scale-100 transition-all duration-100 scale-0 origin-left">
        {"Create chatroom!"}
      </div>
    </div>
  );
}

export default CreateChatroom;

{
  /* <div className="m-2 flex justify-center shadow-inner">
        <PlusIcon
          className="w-10 h-10 rounded-full bg-spotify2 text-customOrange"
          onClick={handleOnClick}
        />
      </div> */
}
