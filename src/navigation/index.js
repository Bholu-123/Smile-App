import React, { useEffect } from "react";
import { View, Text } from "react-native";
import AuthStack from "./AuthStack";
import { NavigationContainer } from "@react-navigation/native";
import Constant from "../constants/index";
import axios from "axios";

const { MyDarkTheme, MyLightTheme, BASE_URL } = Constant;

const RootNavigation = () => {
  return (
    <NavigationContainer theme={MyLightTheme}>
      <AuthStack />
    </NavigationContainer>
  );
};

export default RootNavigation;
