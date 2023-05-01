/** @format */

import React from "react";
import { createPortal } from "react-dom";
import { useState } from "react";

//Should be able to change profile picture, username, password, and delete accounts

const Settings = ({
  open,
  onClose,
}: {
  open: Boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const closeFunc = () => {
    onClose(false);
  };

  if (!open) return null;
  return createPortal(
    <div
      className="top-0 bottom-0 right-0 left-0 fixed z-[10] backdrop-blur-md shadow-xl flex justify-center"
      onClick={closeFunc}
    >
      <div className="h-[90vh] w-[90vh] flex flex-row  max-h-screen">
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          //this is where I need to add the background image
          className="w-[80%] h-[80%] my-auto account m-20 rounded-3xl mx-auto"
        >
          <div className="m-16">
            <div className="text-3xl">Account</div>

            <div className="mt-6">Avatar</div>

            <div className="flex flex-row">
              <img
                className="rounded-full w-20 h-20 object-cover mr-4"
                src="src/assets/react.svg"
                alt="profile picture"
              />
              <div className="border rounded-lg my-auto p-2 px-4 m-2 text-customOrange">
                Upload
              </div>
              <div className="border rounded-lg my-auto p-2 px-4 m-2 text-gray-400">
                Remove
              </div>
            </div>

            <div className="pb-4 border-b w-full" />

            <div className="flex flex-row">
              <div className="text-xs ">Display name</div>

              <div className="text-xs text-gray-400">Password</div>
            </div>

            <div className="flex flex-row justify-center">
              <div className="border p-2 m-2 w-[14rem] rounded-lg mr-auto">
                {"Bob"}
              </div>
              <div className="border p-2 m-2 w-[14rem] rounded-lg">
                {"Password"}
              </div>
            </div>

            <div className="pb-4 border-b w-full" />

            <div className="flex flex-row">
              <div className="flex flex-col">
                <div className="text-sm">Delete account</div>
                <div className="text-xs text-gray-400">
                  By deleting your account you will loose all your data
                </div>
              </div>
              <div className="text-xs text-gray-400 my-auto ml-auto">
                Delete account...
              </div>
            </div>
            <div className="pb-4 border-b w-full" />

            <div className="border mt-8 rounded-lg w-40 ml-auto my-auto px-4 p-2 m-2 text-white">
              Save changes
            </div>
            <div>
              {/*  <input type="file" onChange={} />
              <button onClick={}>Upload!</button> */}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")!
  );
};

export default Settings;
