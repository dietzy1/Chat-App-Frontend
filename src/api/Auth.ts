//Login
//Register
//logout
//isAuthenticated

import { defaultGlobalStateType } from "../context/context";

export const LoginFunc = async (username: string, password: string) => {
  const data = JSON.stringify({ username, password });
  console.log("login func called client side");

  try {
    const res = await fetch(import.meta.env.VITE_LOGIN!, {
      method: "POST",
      credentials: "include",
      body: data,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
  console.log("returning true");
  return true;
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
    const res = await fetch(import.meta.env.VITE_LOGOUT!, {
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

export const isAuthenticatedFunc = async (
  uuid: string,
  dispatch: React.Dispatch<defaultGlobalStateType>
) => {
  const data = JSON.stringify({ uuid });

  try {
    const res = await fetch(import.meta.env.VITE_ISAUTHENTICATED!, {
      method: "POST",
      body: data,
      credentials: "include",
    });
    console.log(res);
    if (res.status === 200) {
      dispatch({ user: true });
      return true;
    } else {
      dispatch({ user: false });
      console.log("returning false because 401");
      return false;
    }
  } catch (error) {
    console.log(error);
    dispatch({ user: false });
    console.log("returning false because error");
    return false;
  }
};
