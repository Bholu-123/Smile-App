import React from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from "react-native";
import { connect } from "react-redux";

const Home = ({ ...props }) => {
  console.log("+++PROPS IN HOME", props);
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View>
        <Text className="text-2xl text-red-600">Home</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  AndroidSafeArea: {
    // a workaround for SafeAreaView in Android
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (disptach) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
