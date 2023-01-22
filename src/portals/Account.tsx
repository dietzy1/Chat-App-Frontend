import React from "react";
import { createPortal } from "react-dom";
import { ChangeEvent, useState } from "react";

//Should be able to change profile picture, username, password, and delete accounts

const Account = ({
  open,
  onClose,
}: {
  open: Boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const closeFunc = () => {
    onClose(false);
  };

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (!file) {
      return;
    }
    /*   ChangeAvatar(file, "uuid"); */
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

export default Account;

async function ChangeName(newUsername: string, uuid: string) {
  // convert to json
  const data = JSON.stringify({ newUsername, uuid });

  //! is used to tell typescript that the variable is not null even though it might be null incase the env file is not found
  const res = await fetch(process.env.REACT_APP_CHANGENAME!, {
    method: "POST",
    body: data,
    credentials: "include",
  });
  if (!res.ok) {
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
}

async function ChangePassword(newPassword: string, uuid: string) {
  // convert to json
  const data = JSON.stringify({ newPassword, uuid });

  //! is used to tell typescript that the variable is not null even though it might be null incase the env file is not found
  const res = await fetch(process.env.REACT_APP_CHANGEPASSWORD!, {
    method: "POST",
    body: data,
    credentials: "include",
  });
  if (!res.ok) {
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
}

async function ChangeAvatar(uuid: string) {
  // convert to json
  const data = JSON.stringify({ uuid });

  //accept image file
  const file = document.getElementById("file") as HTMLInputElement;
  const fileData = file.files![0];

  //! is used to tell typescript that the variable is not null even though it might be null incase the env file is not found
  const res = await fetch(process.env.REACT_APP_CHANGEAVATAR!, {
    method: "POST",
    body: fileData + data,
    credentials: "include",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const res1 = await fetch(process.env.REACT_APP_CHANGEAVATAR!, {
    method: "POST",
    body: data,
    credentials: "include",
  });

  if (!res.ok) {
    return Promise.resolve(false);
  }
}

//I want to send 2 seperate requests
