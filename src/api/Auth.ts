//Login
//Register
//logout
//isAuthenticated

export const LoginFunc = async (username: string, password: string) => {
  const data = JSON.stringify({ username, password });

  try {
    const res = await fetch(process.env.LOGIN!, {
      method: "POST",
      credentials: "include",
      body: data,
    });
  } catch (error) {
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
};

export const RegisterFunc = async (username: string, password: string) => {
  const data = JSON.stringify({ username, password });

  try {
    const res = await fetch(process.env.REGISTER!, {
      method: "POST",
      credentials: "include",
      body: data,
    });
  } catch (error) {
    return Promise.resolve(false);
  }
  return Promise.resolve(true);
};

export const LogoutFunc = async (dispatch: any) => {
  /*   e.preventDefault(); */
  try {
    const res = await fetch(process.env.LOGOUT!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    console.log("ok");
    throw error;
  } finally {
    dispatch({ user: false });
  }
};

export const isAuthenticatedFunc = async (dispatch: any) => {
  try {
    const res = await fetch(process.env.ISAUTHENTICATED!, {
      method: "POST",
      credentials: "include",
    });
  } catch (error) {
    dispatch({ user: false });
  }
  dispatch({ user: true });
};
