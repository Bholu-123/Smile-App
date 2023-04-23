import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./Tabs";
import SplashScreen from "../screens/SplashScreen/index";
import Login from "../screens/Login/index";
import Register from "../screens/Register/index";
import Onboarding from "../screens/Onboarding/index";

import { connect } from "react-redux";
import PropTypes from "prop-types";

const AuthStack = ({ ...props }) => {
  const { isOnboardingDisabled } = props;
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={isOnboardingDisabled ? "Splash" : "Onboarding"}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
    </Stack.Navigator>
  );
};

AuthStack.propTypes = {
  isOnboardingDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isOnboardingDisabled: state.auth.isOnboardingDisabled,
  };
};

export default connect(mapStateToProps)(AuthStack);
