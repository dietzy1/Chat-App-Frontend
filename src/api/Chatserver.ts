//list of function that should exist
//Create a server
//Delete a server
//Update a server

export const createServer = async (e: React.MouseEvent) => {
  e.preventDefault();

  try {
    const res = await fetch(process.env.CREATESERVER!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    throw error;
  }
};

export const deleteServer = async (e: React.MouseEvent) => {
  e.preventDefault;

  try {
    const res = await fetch(process.env.DELETESERVER!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateServer = async (e: React.MouseEvent) => {
  e.preventDefault;

  try {
    const res = await fetch(process.env.UPDATESERVER!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};
