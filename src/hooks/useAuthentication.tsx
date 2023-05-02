/** @format */

import { useEffect } from "react";
import { useGlobalState } from "../context/context";
import { AuthenticateRequest } from "../api/protos/auth/v1/authgateway_service_pb";
import { AuthenticateResponse } from "../api/protos/auth/v1/authgateway_service_pb";
import { useNavigate } from "react-router-dom";
import { AuthGatewayService } from "../api/protos/auth/v1/authgateway_service_connect";
import { Client } from "../api/Client";

export const useAuthentication = (authClient: Client) => {
  const [state, dispatch] = useGlobalState();

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Authenticating...");
    (async function () {
      const req = new AuthenticateRequest();
      const response = (await authClient.fetch(req)) as
        | AuthenticateResponse
        | undefined;
      if (response !== undefined) {
        console.log("Authenticated!");
        navigate("/");
        dispatch({ type: "SET_USER", payload: true });
      } else {
        console.log("Not authenticated!");
        navigate("/login");
        dispatch({ type: "SET_USER", payload: false });
      }
    })();
  }, []);
};
