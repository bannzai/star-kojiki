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

function generateRandomString(): string {
  const s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((n) => s[n % s.length])
    .join("");
}

export const LoginPage: React.VFC = () => {
  const login = useLogin();
  const generatedState = React.useMemo(() => generateRandomString(), []);
  const [request, _, promptAsync] = useAuthRequest(
    {
      clientId: Constants.manifest?.extra?.githubOAuthClientID,
      scopes: ["public_repo", "read:user"],
      state: generatedState,
      redirectUri: Constants.manifest?.extra?.githubOAuthCallbackURL,
    },
    discovery
  );

  const handleLogin = async (response: AuthSessionResult | null) => {
    console.log(`response: ${JSON.stringify(response)}`);
    if (response?.type === "success") {
      const { code, state } = response.params;
      console.log(
        `${JSON.stringify(state)}, ${JSON.stringify(generatedState)}`
      );
      if (state !== generatedState) {
        console.error(`unexpected state missmatch`);
        return;
      }

      console.log(
        `clientId: ${Constants.manifest?.extra?.githubOAuthClientID}, secret: ${Constants.manifest?.extra?.githubOAuthClientSecret}, code: ${code}`
      );
      try {
        const result = await fetch(
          "https://github.com/login/oauth/access_token",
          {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              client_id: Constants.manifest?.extra?.githubOAuthClientID,
              client_secret: Constants.manifest?.extra?.githubOAuthClientSecret,
              code: code,
            }),
          }
        );
        console.log(`${JSON.stringify(result.ok)}`);
        const json = await result.json();
        console.log(`${{ json: json }}`);
      } catch (error) {
        console.error(error);
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
