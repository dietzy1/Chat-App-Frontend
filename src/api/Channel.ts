//list of function that should exist
//Create a channel
//Delete a channel
//Update a channel

export const createChannel = async (e: React.MouseEvent) => {
  e.preventDefault;

  try {
    const res = await fetch(process.env.CREATECHANNEL!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteChannel = async (e: React.MouseEvent) => {
  e.preventDefault;

  try {
    const res = await fetch(process.env.DELETECHANNEL!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const UpdateChannel = async (e: React.MouseEvent) => {};
