import * as React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useIdentifyToken } from "../context/Auth";

export const AuthorizedRoute: React.VFC<RouteProps> = ({ ...props }) => {
  const identifyToken = useIdentifyToken();
  const isAuthorized = identifyToken != null;
  if (isAuthorized) {
    return <Route {...props} />;
  } else {
    return <Redirect to="/login" />;
  }
};
