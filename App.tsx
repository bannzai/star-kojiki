import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import { Button } from "react-native";
import Constants from "expo-constants";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint: `https://github.com/settings/connections/applications/${Constants.manifest?.extra?.githubOAuthClientID}`,
};

export default function App() {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: Constants.manifest?.extra?.githubOAuthClientID,
      redirectUri: Constants.manifest?.extra?.githubOAuthCallbackURL,
    },
    discovery
  );

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;
      console.log(`success code: ${code}`);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
