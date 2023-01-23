import React from "react";

import { PaperAirplaneIcon } from "@heroicons/react/24/outline";

import { useState } from "react";

//@ts-ignore
import InputEmoji from "react-input-emoji";

const Searchbar = () => {
  const [text, setText] = useState("");

  //Need to make the websocket read the text and send it to the server
  //const wsmsg = JSON.stringify(testMessage);

  //author and author id can be retrieved from the user context

  const onSubmit = (text: string) => {
    //also needs to be passed in user information and the channel ID
    let author = "bob";
    let chatroomuuid = "123";
    let message = text;
    let authoruuid = "456";

    const testMessage = {
      author,
      chatroomuuid,
      message,
      authoruuid,
    };
    console.log(testMessage);
    //sendMessage(JSON.stringify(testMessage));
  };

  return (
    <div>
      <footer className="fixed bottom-0 left-10 right-10  z-10 text-darky flex flex-row justify-center mx-auto w-full">
        <div className="bg-customgray w-[50vw] h-14 m-2 border rounded-xl flex items-center border-gray-500">
          <input
            /* onChange={(e) => setQuery(e.target.value)} */
            className="appearance-none bg-transparent border-none w-full text-white leading-tight focus:outline-none rounded-md text-sm mx-6"
            type="text"
            placeholder="Aa"
          />

          <PaperAirplaneIcon className="w-8 h-8 mx-6" />
        </div>
      </footer>
    </div>
  );
};

export default Searchbar;

{
  /*   <footer className="fixed bottom-0 left-0 right-0 z-10 text-darky flex flex-row justify-center mx-auto w-full">
  <div className="sm:w-[57.5%] w-full flex flex-row justify-center border-gray-500">
    <div className="rounded-lg sm:w-[60%] w-[80%]">
      <InputEmoji
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={onSubmit}
        placeholder="Aa"
        theme="dark"
        borderColor="#17141d"
        className="bg-red-500"
      />
    </div>
  </div>
</footer> */
}
