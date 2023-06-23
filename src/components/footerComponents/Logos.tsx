/** @format */

import { BsGithub } from "react-icons/bs";
import { SiGrafana } from "react-icons/si";

function Logos() {
  return (
    <div className="flex flex-row my-auto mx-4">
      <a
        className="flex flex-col mx-2"
        href="https://github.com/dietzy1/Chat-App-Frontend"
        target="_blank"
      >
        <BsGithub
          className="text-white mx-auto hover:text-customOrange"
          size={26}
        />
        <div className="text-xs text-white hover:text-customOrange">
          SourceCode{" "}
        </div>
      </a>

      <a
        className="flex flex-col mx-2 "
        target="_blank"
        href="https://grafana.com/grafana/dashboards/13633"
      >
        <SiGrafana
          className="text-white mx-auto hover:text-customOrange"
          size={26}
        />
        <div className="text-xs text-white hover:text-customOrange">
          Methrics{" "}
        </div>
      </a>
    </div>
  );
}

export default Logos;
