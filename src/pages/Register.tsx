/** @format */

import React from "react";

import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/context";
import { useState } from "react";

import { LoginError } from "../types/interfaces";

import { Client } from "../api/Client";
import { AuthGatewayService } from "../api/protos/auth/v1/authgateway_service_connect";
import { RegisterRequest } from "../api/protos/auth/v1/authgateway_service_pb";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<LoginError>({
    bool: false,
    error: "",
  } as LoginError);

  const navigate = useNavigate();

  const [state, dispatch] = useGlobalState();
  const client = new Client(AuthGatewayService);

  const onsubmitfunc = async (e: React.FormEvent) => {
    e.preventDefault();
    const request = new RegisterRequest();
    request.username = username;
    request.password = password;
    const res = await client.fetch(request);
    if (res !== undefined) {
      console.log("Registered");
      dispatch({ user: true });
      navigate("/login");
    } else {
      setError({ bool: true, error: "Wrong username or password" });
      navigate("/register");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-row justify-between max-h-screen login">
      <div className="w-[80%] bg-blacky m-20 rounded-3xl mx-auto flex flex-row justify-center">
        <div className="w-full mx-auto flex justify-center ">
          <div className="w-[90%] h-[90%] login2 mx-auto my-auto rounded-3xl flex flex-col justify-center">
            <h2 className="mx-auto text-7xl">Welcome!</h2>
            <span className="mx-auto max-w-[50%]">
              Sign up to get the full span of features this chat application has
              to offer!
            </span>
          </div>
        </div>

        <div className="w-full mx-auto flex justify-center my-auto">
          <form className="max-w-[450px] w-full mx-auto p-8 ">
            <img src="src/assets/fire.png" className="h-28 w-28 mx-auto" />
            <h2 className="text-4xl font-bold text-white text-center">
              Register
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label className="text-start " htmlFor="username">
                Username
              </label>
              <input
                className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-greeny focus:bg-gray-800 focus:outline-none border border-customgray"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label className="text-start" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-lg bg-gray-700  mt-2 p-2 focus:border-greeny focus:bg-gray-800 focus:outline-none border border-customgray"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              {error.bool && (
                <div className=" rounded-xl mx-auto p-1 text-lg text-red-500">
                  {error.error}
                </div>
              )}
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label className="text-start" htmlFor="password">
                Repeat password
              </label>
              <input
                className="rounded-lg bg-gray-700  mt-2 p-2 focus:border-greeny focus:bg-gray-800 focus:outline-none border border-customgray"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />

              {error.bool && (
                <div className=" rounded-xl mx-auto p-1 text-lg text-red-500">
                  {error.error}
                </div>
              )}
            </div>
            <div className=" text-gray-400 py-2">
              <p className="flex items-center">
                <input className="mr-2" type="checkbox" /> Remember Me
              </p>
            </div>
            <button
              className="w-full my-5 py-2 bg-greeny border border-customOrange shadow-lg shadow-blacky/50 hover:shadow-blacky/30 text-white font-semibold rounded-lg heading"
              type="submit"
              onClick={onsubmitfunc}
            >
              <h2>Create an account</h2>
            </button>
            <div className="flex flex-row text-gray-400 mb-4 justify-center">
              <p className="mr-1">Already registered? </p>
              <Link to="/register" className="underline text-customOrange">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

async function Registerfunc(username: string, password: string) {
  const formData = new FormData();
  formData.set("username", username);
  formData.set("password", password);

  const res = await fetch("localhost:3000/api/register", {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  if (!res.ok) {
    return false;
  }

  return true;
}

/* const checkPassword = (password: string) => {
  if (password.length < 8) {
    return { error: true, message: "Password must be at least 8 characters" };
  } else if (!/\d{3}/.test(password)) {
    return {
      error: true,
      message: "Password must contain at least three numbers",
    };
  } else {
    return { error: false, message: password };
  }
}; */
