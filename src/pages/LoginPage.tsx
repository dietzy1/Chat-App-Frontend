/** @format */

import React from "react";

import { Navigate, Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../context/context";
import { useState } from "react";

import { LoginError } from "../types/interfaces";

import { Client } from "../api/Client";
import { AuthGatewayService } from "../api/protos/auth/v1/authgateway_service_connect";
import { LoginRequest } from "../api/protos/auth/v1/authgateway_service_pb";

/* const navigate = useNavigate(); */

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<LoginError>({
    bool: false,
    error: "",
  } as LoginError);

  const client = new Client(AuthGatewayService);

  const [state, dispatch] = useGlobalState();
  const navigate = useNavigate();

  /*   const onsubmittestfunc = async (e: any) => {
    e.preventDefault();
    try {
      //const ok = await LoginFunc(username, password);
      const ok = await client.fetch(request);
      if (ok) {
        dispatch({ user: true });
        console.log("Logged in");
        console.log(state.User);
        return <Navigate to="/" replace />;
      }
    } catch (err) {
      console.log("Idk what the fuck is going on here");
      console.log(error);
    }
  }; */

  const onsubmitfunc = async (e: React.FormEvent) => {
    e.preventDefault();
    const request = new LoginRequest();
    request.username = username;
    request.password = password;
    const res = await client.fetch(request);
    if (res !== undefined) {
      console.log("Logged in");
      dispatch({ user: true });
      navigate("/");
    } else {
      setError({ bool: true, error: "Wrong username or password" });
      navigate("/login");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-row justify-between max-h-screen login">
      <div className="w-[90%] bg-spotify8 m-20 rounded-3xl mx-auto flex flex-row justify-center">
        <div className="w-full mx-auto flex justify-center my-auto">
          <form className="max-w-[450px] w-full mx-auto p-8 ">
            <svg
              width="250"
              height="250"
              viewBox="0 0 150 150"
              className="flex justify-center mx-auto w-20 h-20 mb-10 text-customOrange"
            >
              <defs id="SvgjsDefs1213"></defs>
              <g
                id="id1"
                transform="matrix(1.6148796129481866,0,0,1.6148796129481866,-12.132872616436643,-3.1509148458173186)"
                fill="#ff8a00"
              >
                <g xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M50.023,52.662c8.141,0,20.761-8.777,13.741-23.499c-0.393-0.824,0.732-1.517,1.283-0.79    c11.625,15.355-1.063,32.072-15.024,32.072h-0.045c-13.961,0-26.649-16.717-15.024-32.072c0.551-0.728,1.676-0.034,1.283,0.79    C29.217,43.886,42.063,52.662,50.023,52.662L50.023,52.662z"></path>
                    <path d="M60.879,65.505c9.612-4.494,19.223-0.315,19.223,9.098c0,6.348-5.974,14.285-15.584,9.534    c-0.664-0.328-0.323-1.321,0.405-1.183c5.695,1.082,9.701-2.839,9.701-7.259c0-6.563-7.359-6.012-11.733-3.508L39.121,83.852    c-9.612,4.494-19.223,0.315-19.223-9.098c0-6.348,5.974-14.285,15.584-9.534c0.664,0.328,0.323,1.321-0.405,1.183    c-5.695-1.082-9.701,2.839-9.701,7.259c0,6.563,7.359,6.012,11.733,3.508l23.771-11.667L60.879,65.505z"></path>
                    <path d="M50,14.336c-9.557,0-11.465,14.069-5.809,19.744c0.591,0.593,1.536-0.166,1.086-0.872    C42.275,28.49,44.737,20.636,50,20.645c5.263-0.009,7.725,7.845,4.723,12.562c-0.45,0.707,0.495,1.466,1.086,0.872    C61.465,28.405,59.557,14.336,50,14.336z"></path>
                  </g>
                </g>
              </g>
            </svg>
            <h2 className="text-4xl font-bold text-white text-center">
              Welcome back
            </h2>
            <h2 className="text-sm mb-6 font-extralight text-center">
              Sign in to continue
            </h2>
            <div className="flex flex-col text-gray-400 py-2">
              <label className="text-start " htmlFor="username">
                Username
              </label>
              <input
                className="rounded-lg bg-spotify6 mt-2 p-2 focus:border-greeny focus:bg-spotify7 focus:outline-none border border-spotify2"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col text-gray-400 py-2">
              <label className="text-start" htmlFor="password">
                Password
              </label>
              <input
                className="rounded-lg bg-spotify6  mt-2 p-2 focus:border-greeny focus:bg-spotify7 focus:outline-none border border-spotify2"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className=" text-gray-400 py-2">
                <p className="flex items-center">
                  <input className="mr-2" type="checkbox" /> Remember Me
                </p>
              </div>

              {!error.bool && (
                <div className="invisible mx-auto p-1 text-lg text-green-500">
                  t
                </div>
              )}

              {error.bool && (
                <div className=" rounded-xl mx-auto p-1 text-lg text-red-500">
                  {error.error}
                </div>
              )}
            </div>

            <button
              className="w-full my-5 py-2 border border-customOrange shadow-lg shadow-blacky/50 hover:shadow-blacky/30 text-white font-semibold rounded-lg heading"
              type="submit"
              onClick={onsubmitfunc}
            >
              <h2>Login</h2>
            </button>
            <div className="flex flex-row text-gray-400 mb-4 justify-center border-b pb-10 border-spotify2">
              <p className="mr-1 text-sm">Not registered yet? </p>
              <Link
                to="/register"
                className="underline text-customOrange text-sm"
              >
                Create an Account
              </Link>
            </div>
          </form>
        </div>

        <div className="w-full mx-auto flex justify-center">
          <div className="w-[100%] h-[80%] login2 mx-auto my-auto rounded-3xl flex flex-col justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
