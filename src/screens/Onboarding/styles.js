import EStyleSheet from "react-native-extended-stylesheet";
import Constant from "../../constants/index";

const {
  THEME: { primary, secondary },
} = Constant;

export const styles = () =>
  EStyleSheet.create({
    slide: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#3EB489",
    },
    titleContainer: {
      flex: 1,
      justifyContent: "flex-end",
      paddingStart: "8%",
      paddingRight: "8%",
    },
    title: {
      color: secondary,
      fontSize: 25,
      fontWeight: "bold",
      textAlign: "center",
      fontWeight: 600,
      color: "#ffffff",
      lineHeight: 30,
      letterSpacing: 0.6,
      textTransform: "uppercase",
    },
    imageContainer: {
      flex: 3,
      justifyContent: "center",
    },
    image: {
      width: 300,
      height: 300,
      resizeMode: "contain",
    },
    textContainer: {
      flex: 1,
      justifyContent: "flex-start",
      paddingStart: "8%",
      paddingRight: "8%",
    },

    text: {
      textAlign: "center",
      fontWeight: 400,
      color: "#ffffff",
      fontSize: 15,
      lineHeight: 20,
      letterSpacing: 0.4,
    },
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(255, 255, 255, .2)",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    skipTextColor: {
      color: "#ffffff",
      fontWeight: 500,
      fontSize: 12,
      lineHeight: 20,
    },
    skipView: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
  });
