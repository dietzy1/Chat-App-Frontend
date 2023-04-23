/** @format */
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../../context/context";
import { Client } from "../../api/Client";
import { AuthGatewayService } from "../../api/protos/auth/v1/authgateway_service_connect";
import {
  LogoutRequest,
  LogoutResponse,
} from "../../api/protos/auth/v1/authgateway_service_pb";

function Icons() {
  const navigate = useNavigate();
  const [state, dispatch] = useGlobalState();
  const authClient = new Client(AuthGatewayService);

  return <div className=" px-8 py-4 flex flex-row justify-around"></div>;
}
export default Icons;
