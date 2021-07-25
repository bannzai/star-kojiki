import * as React from "react";
import { Button } from "react-native";

export const HomePage: React.VFC = () => {
  return (
    <Button
      title="Home"
      onPress={() => {
        console.log(`Home page`);
      }}
    />
  );
};
