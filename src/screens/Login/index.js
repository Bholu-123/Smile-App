import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { styles } from "./styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { scale } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import * as yup from "yup";
import { Formik, Field } from "formik";
import { loginUser } from "../../api/Auth";
import { connect } from "react-redux";
import * as authActions from "../../redux/actions/authActions";
import PropTypes from "prop-types";
import { setTokenInterceptor } from "../../utils/setTokenInterceptor";
import Toast from "react-native-root-toast";

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is requred"),
  password: yup.string().required("Password is required"),
});

const Login = ({ ...props }) => {
  const { updateUserLogin, updateUserAccessToken, user, isLoggedIn } = props;

  const navigation = useNavigation();
  const [toastMessage, setToastMessage] = useState({
    show: false,
    msg: "",
  });
  const [showSpinner, setShowSpinner] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View style={styles().loginMain}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View style={styles().headerContainer}>
          <Text style={styles().welcomeText}>Welcome</Text>
          <Text style={styles().signInText}>
            Sign in to access more features.
          </Text>
        </View>

        <View style={styles().formContainer}>
          <Formik
            validationSchema={signInValidationSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              setShowSpinner(true);

              loginUser(values)
                .then((res) => {
                  console.log("RESPONSE IN LOGIN", res);
                  updateUserLogin(res, true);
                  updateUserAccessToken(res.token);
                  setTokenInterceptor(res);
                  setShowSpinner(false);
                  setToastMessage({
                    show: true,
                    msg: res.message,
                  });

                  setTimeout(function hideToast() {
                    setToastMessage({
                      show: false,
                      msg: "",
                    });
                  }, 1500);
                  navigation.navigate("Tabs");
                })
                .catch((err) => {
                  console.log("ERROR IN LOGIN", err.response.data.message);
                  setToastMessage({
                    show: true,
                    msg: err.response.data.message,
                  });

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
                <View style={styles().inputContainer}>
                  <View style={styles().wrapper}>
                    <TextInput
                      style={styles().input}
                      placeholder="Enter Email"
                      keyboardType="email-address"
                      name="email"
                      onChangeText={handleChange("email")}
                      placeholderTextColor={"#232323"}
                    />
                    {errors.email && touched.email && (
                      <Text
                        style={{
                          fontSize: 10,
                          color: "red",
                          marginTop: scale(5),
                        }}
                      >
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  <View style={styles().wrapper}>
                    <View style={styles().input}>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <TextInput
                          placeholder="Enter Password"
                          secureTextEntry={showPassword}
                          style={{
                            height: scale(50),
                            color: "#232323",
                            width: "93%",
                            color: "#232323",
                            fontWeight: "bold",
                            fontSize: 15,
                            letterSpacing: 0.2,
                            lineHeight: 20,
                          }}
                          name="password"
                          onChangeText={handleChange("password")}
                          placeholderTextColor={"#232323"}
                        />

                        {errors.password && touched.password && (
                          <Text
                            style={{
                              fontSize: 10,
                              color: "red",
                              marginTop: scale(5),
                            }}
                          >
                            {" "}
                            {errors.password}
                          </Text>
                        )}

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

                  <View style={styles().forgotPasswordContainer}>
                    <TouchableOpacity>
                      <Text style={styles().forgotPasswordText}>
                        Forgot Password
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles().btnContainer}>
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
                    <Text style={{ color: "#fff", marginLeft: scale(5) }}>
                      Login
                    </Text>
                    {showSpinner && <ActivityIndicator color={"#fff"} />}
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>

        <View style={styles().footerContainer}>
          <View style={styles().footerContainerInner}>
            <Text style={styles().newUserText}>I am new user,</Text>

            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={styles().signText}> Sign Up</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Tabs")}>
            <Text style={{ color: "#9ea9b3" }}>Skip</Text>
          </TouchableOpacity>
          <View>
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

Login.propTypes = {
  user: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  updateUserLogin: PropTypes.func.isRequired,
  updateUserAccessToken: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    isLoggedIn: state.auth.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => ({
  updateUserLogin: (user, isLoggedIn) =>
    dispatch(authActions.updateUserLogin(user, isLoggedIn)),
  updateUserAccessToken: (token) =>
    dispatch(authActions.updateUserAccessToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
