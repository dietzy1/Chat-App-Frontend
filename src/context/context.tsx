import React, { useReducer } from "react";
import { createContext, useContext } from "react";

export const defaultglobalState = {
  user: true,
  avatar: "", //This should simply be a default value similar to the discord icon
  chatserver: "",
  channel: "",
};

export interface defaultGlobalStateType {
  user: boolean; //Logged in or not
  avatar: string;
  chatserver: string;
  channel: string;
}

export const GlobalStateContext = createContext(defaultglobalState);
export const DispatchStateContext = createContext<any>(undefined);

export const GlobalStateProvider = ({
  children,
}: React.PropsWithChildren<{}>) => {
  const [state, dispatch] = useReducer(
    (state: defaultGlobalStateType, newValue: defaultGlobalStateType) => ({
      ...state,
      ...newValue,
    }),
    defaultglobalState
  );
  return (
    <GlobalStateContext.Provider value={state as defaultGlobalStateType}>
      <DispatchStateContext.Provider
        value={dispatch as React.Dispatch<defaultGlobalStateType>}
      >
        {children}
      </DispatchStateContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => [
  useContext(GlobalStateContext),
  useContext(DispatchStateContext),
];
