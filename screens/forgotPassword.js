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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icons from "@expo/vector-icons/AntDesign";
import Iconics from "react-native-vector-icons/MaterialCommunityIcons";
import { FONTS, URLs } from "../constants";
import Input_2 from "./components/Input_2";
//import { useSelector, useDispatch } from "react-redux";

export default function Forgot(props) {
  //const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [notvisible, setVisible] = useState(true);
  const [recode, setRecode] = useState("");
  const [code, setcode] = useState("");
  const [email, setEmail] = useState("");
  const [emailvalid, setEmailvalid] = useState(true);
  function randnum() {
    const max = 99999;
    const min = 10000;
    return Math.floor(Math.random() * (max - min)) + min;
  }
  const sendCode = async () => {
    var cd = randnum().toString();
    setcode(cd);
    await AsyncStorage.setItem("email", email);
    fetch(URLs.cn + "/mail", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: cd,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        Alert.alert("Email Sent");
      });
    console.log(cd);
  };

  const verifyCode = () => {
    console.log(code);
    if (code === recode) {
      props.navigation.navigate("recovery");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={styles.container}
    >
      <ImageBackground
        // source={require("../assets/login.png")}
        style={styles.header}
      >
        <View style={styles.welcomeContainer}></View>
      </ImageBackground>
      <Text style={styles.logintxt}>Forgot Password</Text>
      <View style={styles.inputContainer}>
        <Input_2
          style={{ paddingHorizontal: 10, color: "green", fontSize: 20 }}
          placeholder="Email"
          value={email}
          pattern={"^[^@]+@[^@]+.[^@]+$"}
          onChangeText={(text) => setEmail(text)}
          onValidation={(isValid) => setEmailvalid(isValid)}
        />
      </View>
      <View style={{ marginHorizontal: 40, height: 10 }}>
        {!emailvalid ? (
          <Text style={{ color: "red" }}>Enter a valid email</Text>
        ) : (
          <Text></Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.inputContainer2, styles.btn]}
        onPress={sendCode}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
          Send Code
        </Text>
      </TouchableOpacity>
      <View style={styles.inputContainer}>
        <TextInput
          style={{
            paddingHorizontal: 10,
            color: "green",
            fontSize: 20,
          }}
          placeholder="Code"
          value={recode}
          onChangeText={(text) => setRecode(text)}
        />
      </View>

      <TouchableOpacity
        style={[styles.registerbtn, styles.inputContainer2]}
        onPress={verifyCode}
      >
        <Text style={{ color: "green", fontSize: 20, fontWeight: "bold" }}>
          Verify
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    height: Keyboard.height,
    width: "100%",
    borderBottomRightRadius: 70,
  },
  title: {
    marginTop: 250,
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  welcome: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: "bold",
    color: "white",
  },
  welcomeContainer: {
    justifyContent: "center",
    height: 250,
    width: "100%",
    marginLeft: 10,
    marginTop: 10,
  },
  logintxt: {
    fontSize: 40,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 28,
    color: "green",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 1,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: "green",
    borderRadius: 8,
    paddingVertical: 2,
    height: 45,
  },
  inputContainer2: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: "green",
    borderRadius: 8,
    paddingVertical: 2,
    height: 45,
  },
  btn: {
    backgroundColor: "green",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
