import React, { createContext, useContext, useState } from "react";
import { IdentifyToken } from "../model/IdentifyToken";

type Login = (token: IdentifyToken) => void;
const LoginContext = createContext<Login>((_) =>
  console.error("Unexpected not set login handler")
);
const IdentifyTokenContext = createContext<IdentifyToken | null>(null);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.VFC<Props> = ({ children }) => {
  const [identifyToken, setIdentifyToken] = useState<IdentifyToken | null>(
    null
  );

  console.log(`identifyToken: ${identifyToken}`);
  const login = (token: IdentifyToken) => {
    console.log(`called setIdentifyToken`);
    setIdentifyToken(token);
  };

  return (
    <LoginContext.Provider value={login}>
      <IdentifyTokenContext.Provider value={identifyToken}>
        {children}
      </IdentifyTokenContext.Provider>
    </LoginContext.Provider>
  );
};

export const useIdentifyToken = () => useContext(IdentifyTokenContext);
export const useLogin = () => useContext(LoginContext);
