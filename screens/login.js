import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Platform,
  TouchableOpacity,
} from "react-native";
import Iconics from "react-native-vector-icons/MaterialCommunityIcons";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "@expo/vector-icons/AntDesign";
import { FONTS, URLs } from "../constants";
//import { useSelector, useDispatch } from "react-redux";

export default function Login(props) {
  //const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [notvisible, setVisible] = useState(true);

  const signin = async () => {
    fetch(URLs.cn + "/users/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then(async (result) => {
        console.log(result);
        if (result.message === "Auth successful") {
          Alert.alert("login successfull");
          try {
            await AsyncStorage.setItem("token", result.token);
            await AsyncStorage.setItem("email", email);
            await AsyncStorage.setItem("userId", result.userId);
            await AsyncStorage.setItem("type", result.type);

            if (result.type === "client") {
              props.navigation.navigate("LoadClientScreens");
            } else {
              props.navigation.navigate("LoadInvestor");
            }
            setEmail("");
            setPassword("");

            // dispatch({ type: "br", payload: result.br_number });
            // dispatch({ type: "email", payload: email });
            // dispatch({ type: "name", payload: result.name });
            // dispatch({ type: "set_loading", payload: false });
          } catch (e) {
            console.log(e);
          }
        } else {
          Alert.alert("login unsuccessfull");
        }
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/images/startup_logo_cover.png")}
        style={styles.header}
        imageStyle={{ borderBottomRightRadius: 65 }}
      >
        <View style={styles.welcomeContainer}></View>
      </ImageBackground>
      <Text style={styles.logintxt}>Login</Text>
      <View style={styles.inputContainer}>
        <Icons name="mail" color="#306bff" size={20} />
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 18 }}
          placeholder="Email"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>
      {/* <View style={styles.inputContainer}>
        <Icons name="lock" color="#306bff" size={20} />
        <TextInput
          style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 18 }}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View> */}
      <View style={styles.inputContainer}>
        <Icons name="lock" color="#306bff" size={25} />
        <TextInput
          style={{
            paddingHorizontal: 10,
            color: "#306bff",
            fontSize: 20,
          }}
          placeholder="Password"
          value={password}
          secureTextEntry={notvisible}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={{ marginLeft: 280, top: 6, position: "absolute" }}
          onPress={() => setVisible(!notvisible)}
        >
          {notvisible ? (
            <Iconics name="eye-outline" color="#306bff" size={25} />
          ) : (
            <Iconics name="eye-off-outline" color="#306bff" size={25} />
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.inputContainer, styles.btn]}
        onPress={signin}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Log in
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.registerbtn, styles.inputContainer]}
        onPress={() => props.navigation.navigate("Register")}
      >
        <Text style={{ color: "#306bff", fontSize: 20, fontWeight: "bold" }}>
          Register
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.resetPw, styles.resetbtn]}
        onPress={() => props.navigation.navigate("forgotPassword")}
      >
        <Text style={{ color: "dodgerblue", fontSize: 20, fontWeight: "bold" }}>
          Reset Password
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: Keyboard.height,
    // width: 400,
    height: 150,
    marginTop: 50,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 65,
    // borderBottomRightRadius: 70,
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "red",
  },
  welcome: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "bold",
    color: "red",
  },
  welcomeContainer: {
    justifyContent: "center",
    height: 250,
    width: "100%",
    marginLeft: 10,
  },
  logintxt: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 28,
    color: "#1255ff",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 1.5,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: "#306bff",
    borderRadius: 10,
    paddingVertical: 2,
    height: 45,
  },
  resetPw: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    marginTop: 24,
    paddingHorizontal: 10,
    paddingVertical: 2,
    height: 45,
  },
  btn: {
    backgroundColor: "#306bff",
    justifyContent: "center",
    marginTop: 40,
  },
  resetbtn: {
    justifyContent: "center",
    marginTop: 10,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
