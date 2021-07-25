import * as React from "react";
import {
  AuthSessionResult,
  resolveDiscoveryAsync,
  useAuthRequest,
} from "expo-auth-session";
import { Button } from "react-native";
import Constants from "expo-constants";
import { useTopQuery } from "../../generated-types";
import { useLogin } from "../../context/Auth";
import { IdentifyToken } from "../../model/IdentifyToken";

const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/${Constants.manifest?.extra?.githubOAuthClientID}`,
};
export const LoginPage: React.VFC = () => {
  const login = useLogin();
  const [request, _, promptAsync] = useAuthRequest(
    {
      clientId: Constants.manifest?.extra?.githubOAuthClientID,
      redirectUri: Constants.manifest?.extra?.githubOAuthCallbackURL,
    },
    discovery
  );

  const handleLogin = (response: AuthSessionResult | null) => {
    if (response?.type === "success") {
      const authentication = response.authentication;
      if (authentication != null) {
        const accessToken = authentication.accessToken;
        const refreshToken = authentication.refreshToken;
        login({ accessToken, refreshToken });
      }
    }
  };

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={async () => {
        handleLogin(await promptAsync());
      }}
    />
  );
};
