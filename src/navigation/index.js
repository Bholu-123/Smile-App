import React, { useEffect } from "react";
import { View, Text } from "react-native";
import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import Constant from "../constants/index";

const { MyDarkTheme, MyLightTheme } = Constant;

const RootNavigation = () => {
  return (
    <NavigationContainer theme={MyLightTheme}>
      <AuthStack />
    </NavigationContainer>
  );
};

export default RootNavigation;
