import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useIdentifyToken } from "../context/Auth";

export const AuthorizedRoute: React.VFC<RouteProps> = ({ ...props }) => {
  const identifyToken = useIdentifyToken();
  const isAuthorized = identifyToken != null;
  if (isAuthorized) {
    console.log("AuthorizedRoute not login");
    return <Route {...props} />;
  } else {
    console.log("AuthorizedRoute redirect to login");
    return <Redirect to="/login" />;
  }
};
