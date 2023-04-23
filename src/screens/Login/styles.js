import { Dimensions } from "react-native";
import EstyleSheet from "react-native-extended-stylesheet";
import { moderateScale } from "react-native-size-matters";

export const styles = (background, text, lightGray5, primary, dark) =>
  EstyleSheet.create({
    loginMain: {
      flex: 1,
      backgroundColor: background,
      paddingLeft: moderateScale(20),
      paddingRight: moderateScale(20),
    },
    headerContainer: {
      height: Dimensions.get("window").height / 4,
      justifyContent: "center",
    },
    welcomeText: {
      fontSize: 30,
      fontWeight: 600,
      color: "#232323",
      lineHeight: 35,
      letterSpacing: 0.4,
    },
    signInText: {
      color: "#9ea9b3",
      fontSize: 15,
      letterSpacing: 0.5,
      fontWeight: 500,
      lineHeight: 20,
    },
    formContainer: {},
    inputContainer: {},
    wrapper: {
      marginTop: moderateScale(20),
    },

    input: {
      height: moderateScale(55),
      color: "#232323",
      borderWidth: moderateScale(1),
      borderColor: "#9ea9b3",
      borderRadius: moderateScale(8),
      paddingHorizontal: moderateScale(10),
      fontWeight: "bold",
      fontSize: 15,
      letterSpacing: 0.2,
      lineHeight: 20,
    },
    forgotPasswordContainer: {
      alignItems: "flex-end",
    },
    forgotPasswordText: {
      fontSize: moderateScale(12),
    },
    btnContainer: {
      marginTop: "10%",
    },
    footerContainer: {
      height: Dimensions.get("window").height / 5,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    },
    footerContainerInner: {
      flexDirection: "row",
    },
    signText: {
      marginLeft: moderateScale(5),
      color: dark ? text : primary,
    },
  });
