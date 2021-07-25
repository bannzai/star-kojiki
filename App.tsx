import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { AuthorizedRoute } from "./src/route/AuthorizedRoute";
import { HomePage } from "./src/usecase/home/HomePage";
import { UnAuthorizedRoute } from "./src/route/UnauthorizedRoute";
import { LoginPage } from "./src/usecase/login/LoginPage";
import { AuthProvider } from "./src/context/Auth";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  if (Platform.OS === "web") {
    return (
      <AuthProvider>
        <BrowserRouter>
          <Switch>
            <AuthorizedRoute exact path="/" component={HomePage} />
            <UnAuthorizedRoute exact path="/login" component={LoginPage} />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </AuthProvider>
    );
  } else {
    return <p> Comming soon...</p>;
  }
}
