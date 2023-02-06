//list of functions that should exist
//Change a user's settings
//Change a user's password

export const changeAvatar = async (e: React.MouseEvent) => {
  e.preventDefault();
  try {
    const res = await fetch(process.env.CHANGESERVER!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const changeName = async (e: React.MouseEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(process.env.CHANGENAME!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (e: React.MouseEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(process.env.CHANGEPASSWORD!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    throw error;
  }
};

export const JoinChatroom = async (e: React.MouseEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(process.env.JOINCHATROOM!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    throw error;
  }
};

export const LeaveChatroom = async (e: React.MouseEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(process.env.CHANGEPASSWORD!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    throw error;
  }
};
