import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ActivityIndicator,
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

export default function Recover(props) {
  //const dispatch = useDispatch();
  const [newpassword, setNPassword] = useState("");
  const [newpasswordvalid, setNPasswordvalid] = useState(false);
  const [repassword, setRPassword] = useState("");
  const [repasswordvalid, setRPasswordvalid] = useState(false);
  const [notvisible1, setVisible1] = useState(true);
  const [notvisible2, setVisible2] = useState(true);
  const [email, setEmail] = useState("");
  const [loading, setloading] = useState(true);
  const [emailvalid, setEmailvalid] = useState(true);
  const resetPassword = () => {
    if (newpassword === repassword) {
      fetch(URLs.cn + "/users/forgot/" + email, {
        method: "patch",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newpass: newpassword,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Reset successful") {
            console.log(data);
            Alert.alert("Password reset successfull");
            props.navigation.navigate("Login");
          } else {
            Alert.alert("Password reset unsuccessfull");
          }
        });
    } else {
      Alert.alert("New passwords does not match");
    }
  };
  const getData = async () => {
    const e = await AsyncStorage.getItem("email");
    setEmail(e);
    console.log(e);
    setloading(false);
  };
  useEffect(() => {
    getData();

    //console.log(data[0]);
  }, []);
  const sendCode = () => {};
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "position"}
      style={styles.container}
    >
      {!loading ? (
        <>
          <ImageBackground
            // source={require("../assets/login.png")}
            style={styles.header}
          >
            <View style={styles.welcomeContainer}></View>
          </ImageBackground>
          <Text style={styles.logintxt}>Recover Password</Text>
          <View style={styles.inputContainer}>
            <Input_2
              style={{
                paddingHorizontal: 10,
                color: "green",
                fontSize: 20,
              }}
              placeholder="New Password"
              value={newpassword}
              pattern={"^[a-zA-Z0-9]{8,}$"}
              onValidation={(isValid) => setNPasswordvalid(isValid)}
              secureTextEntry={notvisible1}
              onChangeText={(text) => setNPassword(text)}
            />
            <TouchableOpacity
              style={{ marginLeft: 250, top: 6, position: "absolute" }}
              onPress={() => setVisible1(!notvisible1)}
            >
              {notvisible1 ? (
                <Iconics name="eye-outline" color={"green"} size={30} />
              ) : (
                <Iconics name="eye-off-outline" color={"green"} size={30} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 40, height: 10 }}>
            {newpassword === "" ? (
              <Text style={{ color: "red" }}>Required</Text>
            ) : !newpasswordvalid ? (
              <Text style={{ color: "red" }}>
                Password must contain at least 8 characters
              </Text>
            ) : (
              <Text style={{ color: "red" }}></Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Input_2
              style={{
                paddingHorizontal: 10,
                color: "green",
                fontSize: 20,
              }}
              placeholder="Re Enter Password"
              value={repassword}
              pattern={"^[a-zA-Z0-9]{8,}$"}
              onValidation={(isValid) => setRPasswordvalid(isValid)}
              secureTextEntry={notvisible2}
              onChangeText={(text) => setRPassword(text)}
            />
            <TouchableOpacity
              style={{ marginLeft: 250, top: 6, position: "absolute" }}
              onPress={() => setVisible2(!notvisible2)}
            >
              {notvisible2 ? (
                <Iconics name="eye-outline" color="green" size={30} />
              ) : (
                <Iconics name="eye-off-outline" color="green" size={30} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 40, height: 10 }}>
            {repassword === "" ? (
              <Text style={{ color: "red" }}>Required</Text>
            ) : !repasswordvalid ? (
              <Text style={{ color: "red" }}>
                Password must contain at least 8 characters
              </Text>
            ) : (
              <Text style={{ color: "red" }}></Text>
            )}
          </View>
          <TouchableOpacity
            style={[styles.inputContainer2, styles.btn]}
            onPress={resetPassword}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
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
    marginTop: 30,
    marginBottom: 20,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
