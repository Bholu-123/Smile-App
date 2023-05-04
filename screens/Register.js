import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
// import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { Formik } from "formik";
import { registerUser } from "../components/api/Auth";
import Toast from "react-native-root-toast";

import { Dimensions } from "react-native";
// import EstyleSheet from "react-native-extended-stylesheet";
import { moderateScale } from "react-native-size-matters";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

export const styles = StyleSheet.create({
  loginMain: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(20),
  },
  headerContainer: {
    height: Dimensions.get("window").height / 4,
    justifyContent: "center",
  },
  welcomeText: {
    fontSize: 30,
    // fontWeight: 600,
    color: "#232323",
    lineHeight: 35,
    letterSpacing: 0.4,
  },
  signInText: {
    color: "#9ea9b3",
    fontSize: 15,
    letterSpacing: 0.5,
    // fontWeight: 500,
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
    // fontWeight: 500,
    fontSize: 15,
    letterSpacing: 0.2,
    lineHeight: 20,
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
    color: "#232323",
  },
});

const signUpValidationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, "Password must have a small letter")
    .matches(/\w*[A-Z]\w*/, "Password must have a capital letter")
    .matches(/\d/, "Password must have a number")
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      "Password must have a special character"
    )
    .min(8, ({ min }) => `Passowrd must be at least ${min} characters`)
    .required("Password is required"),
});

const Register = () => {
  const navigation = useNavigation();
  const [toastMessage, setToastMessage] = useState({
    show: false,
    msg: "",
  });
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const modeType = useSelector((state) => state.auth.appMode);

  return (
    <View style={styles.loginMain}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.signInText}>
            Sign up to access more features.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Formik
            validationSchema={signUpValidationSchema}
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              setShowSpinner(true);

              registerUser(values, modeType)
                .then((res) => {
                  setShowSpinner(false);
                  setToastMessage({
                    show: true,
                    msg: res.message,
                  });
                  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
                  setTimeout(function hideToast() {
                    setToastMessage({
                      show: false,
                      msg: "",
                    });
                  }, 1500);
                  navigation.navigate("Login");
                })
                .catch((err) => {
                  setToastMessage({
                    show: true,
                    msg: err.response.data.message,
                  });

                  // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
                  setTimeout(function hideToast() {
                    setToastMessage({
                      show: false,
                      msg: "",
                    });
                  }, 1500);
                  setShowSpinner(false);
                });
            }}
          >
            {({
              handleSubmit,
              isValid,
              values,
              errors,
              handleChange,
              touched,
            }) => (
              <>
                <View style={styles.inputContainer}>
                  <View style={styles.wrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Name"
                      name="name"
                      onChangeText={handleChange("name")}
                      placeholderTextColor={"#232323"}
                    />

                    {errors.name && touched.name && (
                      <Text
                        style={{
                          fontSize: scale(10),
                          color: "red",
                          marginTop: scale(5),
                        }}
                      >
                        {errors.name}
                      </Text>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter Email"
                      keyboardType="email-address"
                      name="email"
                      onChangeText={handleChange("email")}
                      placeholderTextColor={"#232323"}
                    />

                    {errors.email && touched.email && (
                      <Text
                        style={{
                          fontSize: scale(10),
                          color: "red",
                          marginTop: scale(5),
                        }}
                      >
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  <View style={styles.wrapper}>
                    <View style={styles.input}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <View style={{ width: "80%" }}>
                          <TextInput
                            placeholder="Enter Password"
                            secureTextEntry={showPassword}
                            style={{
                              height: scale(50),
                              width: "100%",
                              color: "#232323",
                              // fontWeight: "bold",
                              fontSize: 15,
                              letterSpacing: 0.5,
                              lineHeight: 20,
                            }}
                            name="password"
                            onChangeText={handleChange("password")}
                            placeholderTextColor={"#232323"}
                          />

                          {errors.password && touched.password && (
                            <Text
                              style={{
                                fontSize: scale(10),
                                color: "red",
                                marginTop: scale(5),
                              }}
                            >
                              {errors.password}
                            </Text>
                          )}
                        </View>

                        <TouchableOpacity
                          onPress={() =>
                            setShowPassword((prevState) => !prevState)
                          }
                          style={{ alignSelf: "center" }}
                        >
                          <Ionicons
                            name={showPassword ? "key-outline" : "key"}
                            size={20}
                            color={"#232323"}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={{
                      backgroundColor: "#182952",
                      height: scale(50),
                      borderRadius: scale(10),
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "#fff" }}>Register</Text>

                    {showSpinner && <ActivityIndicator color={"#fff"} />}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerContainerInner}>
            <Text style={styles.newUserText}>I am already a member,</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signText}>Sign In</Text>
            </TouchableOpacity>
            <Toast
              visible={toastMessage.show}
              position={-20}
              shadow={false}
              animation={false}
              hideOnPress={true}
              backgroundColor={"#182952"}
            >
              {toastMessage.msg}
            </Toast>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
