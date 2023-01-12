import { UserType } from "../types/interfaces";

const Online = ({ props }: { props: UserType }) => {
  return (
    <div>
      {props.online ? (
        <div className=" w-full break-all ml-4">
          <div className="flex flex-row items-center hover:bg-gray-100  rounded-3xl mb-2">
            <div className="m-2 relative">
              <img
                className="w-10 h-10 border rounded-full"
                alt=""
                src={props.icon}
              ></img>
              <div className="bg-green-500 rounded-full p-1.5 border-white border-2 absolute bottom-0 right-0 z-2" />
            </div>
            <div className="text-gray-500"> {props.author}</div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Online;

export const Offline = ({ props }: { props: UserType }) => {
  return (
    <div>
      {!props.online ? (
        <div className=" w-full break-all ml-4 ">
          <div className="flex flex-row items-center hover:bg-gray-100 rounded-3xl mb-2">
            <div className="m-2 relative">
              <img
                className="w-10 h-10 border rounded-full grayscale-[50%] "
                alt=""
                src={props.icon}
              ></img>
              <div className="bg-customOrange rounded-full p-1.5 border-white border-2 absolute bottom-0 right-0 z-2 grayscale-0" />
            </div>
            <div className="text-gray-500 grayscale-[70%]"> {props.author}</div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};
