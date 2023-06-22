/** @format */

import { GetUserResponse } from "../api/protos/user/v1/usergateway_service_pb";
import { CloseModal, OpenModal } from "../hooks/useModalState";
import Logos from "./footerComponents/Logos";

import Searchbar from "./footerComponents/Searchbar";
import User from "./footerComponents/User";

function Footer({
  handleClickSendMessage,
  user,
  chatroomuuid,
  channeluuid,
  openModal,
  closeModal,
}: {
  handleClickSendMessage: (msg: Uint8Array) => void;
  user: GetUserResponse;
  chatroomuuid: string;
  channeluuid: string;
  openModal: OpenModal;
  closeModal: CloseModal;
}) {
  return (
    <div>
      <footer className="fixed bottom-0 left-0 right-0 h-[5rem] z-30 text-darky flex flex-row justify-between mx-auto w-full bg-spotify6 border border-spotify7">
        <User user={user} openModal={openModal} closeModal={closeModal} />
        <Searchbar
          handleClickSendMessage={handleClickSendMessage}
          user={user}
          channeluuid={channeluuid}
          chatroomuuid={chatroomuuid}
        />
        <Logos />
      </footer>
    
    </div>
  );
}

export default Footer;
