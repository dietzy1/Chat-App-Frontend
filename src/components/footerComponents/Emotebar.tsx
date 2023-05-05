/** @format */

import React, { useState } from "react";
import { staticEmojis } from "../chatComponents/emoteData";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

//We need to pass in the list of emotes avaible
//We need to pass in the input state from the searchbar so we can add the emote to the input
//We need to out how to render the emote in the search bar without it being shit for the backend
function Emotebar({
  toggle,
  setToggle,
  input,
  setInput,
}: {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [filteredEmojis, setFilteredEmojis] = useState(staticEmojis);

  const handleInsertEmoji = (code: string) => {
    //Check state of input and then we append the emote
    let newInput = input + code.toUpperCase();
    console.log(newInput);
    setInput(newInput);
  };
  /* 
  const handleSearch = (input: string) => {
    const filtered = staticEmojis.filter((emoji) => {
      return emoji.emote.code.toUpperCase().includes(input.toUpperCase());
    });
    console.log(filtered);
  }; */

  const handleSearch = (input: string) => {
    if (input.trim().length === 0) {
      setFilteredEmojis(staticEmojis);
    } else {
      const filtered = staticEmojis.filter((emoji) => {
        return emoji.emote.code.toUpperCase().includes(input.toUpperCase());
      });
      console.log(filtered);
      setFilteredEmojis(filtered);
    }
  };

  return (
    <div>
      {toggle && (
        <div className="bg-spotify7 rounded-2xl absolute border-spotify8 border right-40 bottom-24 p-5 shadow-2xl flex flex-col">
          <div>
            <div className="text-darky flex flex-row justify-center mx-auto w-full border-b mb-4 border-spotify4">
              <div
                className="bg-spotify2 w-[20vw] h-14 m-2 border rounded-xl flex items-center border-spotify7"
                /*  onSubmit={sendInput} */
              >
                <input
                  onChange={(e) => handleSearch(e.target.value)}
                  className="appearance-none bg-transparent border-none w-full text-white leading-tight focus:outline-none rounded-md text-sm mx-6"
                  type="text"
                  placeholder="Aa"

                  /*  onSubmit={() => sendInput} */
                />
                <div className="flex flex-row mr-4">
                  <MagnifyingGlassIcon
                    /* onClick={toggleEmotebar} */
                    className="w-8 h-8 text-white"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-8 bg-spotify3 rounded-xl border p-2 border-spotify3 overflow-y-auto max-h-80 h-80 w-96">
            {/* {staticEmojis.map((emoji) => (
              <img
                onClick={() => handleInsertEmoji(emoji.emote.code)}
                src={
                  "https://cdn.betterttv.net/emote/" + emoji.emote.id + "/1x"
                }
                alt={emoji.emote.id}
                key={emoji.emote.id}
                className="h-12 w-12 object-cover rounded-full cursor-pointer"
              />
            ))} */}
            {filteredEmojis.length === 0 && (
              <div className="text-center text-white py-2">No emojis found</div>
            )}
            {filteredEmojis.map((emoji) => (
              <img
                onClick={() => handleInsertEmoji(emoji.emote.code)}
                src={
                  "https://cdn.betterttv.net/emote/" + emoji.emote.id + "/1x"
                }
                alt={emoji.emote.id}
                key={emoji.emote.id}
                className="h-12 w-12 object-cover rounded-full cursor-pointer"
              />
            ))}
          </div>
          <div className="border-b border-spotify4 mt-4"></div>
        </div>
      )}
    </div>
  );
}
export default Emotebar;
