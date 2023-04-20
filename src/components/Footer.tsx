/** @format */

import { GetUserResponse } from "../api/protos/user/v1/usergateway_service_pb";
import Icons from "./footerComponents/Icons";

import Searchbar from "./footerComponents/Searchbar";
import User from "./footerComponents/User";

function Footer({
  handleClickSendMessage,
  user,
  chatroomuuid,
  channeluuid,
}: {
  handleClickSendMessage: (msg: Uint8Array) => void;
  user: GetUserResponse;
  chatroomuuid: string;
  channeluuid: string;
}) {
  return (
    <div>
      <footer className="fixed bottom-0 left-0 right-0 h-[5rem] z-30 text-darky flex flex-row justify-between mx-auto w-full bg-spotify6 border border-spotify7">
        <User user={user} />
        <Searchbar
          handleClickSendMessage={handleClickSendMessage}
          user={user}
          channeluuid={channeluuid}
          chatroomuuid={chatroomuuid}
        />
        <Icons />
      </footer>
    </div>
  );
}

export default Footer;