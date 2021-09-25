import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Header,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Alert,
  Platform,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Picker,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Iconics from "react-native-vector-icons/MaterialCommunityIcons";
import { URLs } from "../../constants";
import { SIZES } from "../../constants/index";
import Input_2 from "../components/Input_2";

export default function Register(props) {
  const [name, setName] = useState("");
  const [nameValid, setNameValid] = useState(false);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [repassword, setRePassword] = useState("");
  const [repasswordValid, setRePasswordValid] = useState(false);
  const [notvisible, setVisible] = useState(true);

  const abortController = new AbortController();
  const type = "client";

  function submitData() {
    if (nameValid && emailValid && passwordValid) {
      if (password == repassword) {
        props.navigation.navigate("postRegisterForm", {
          name,
          email,
          password,
        });
      } else {
        Alert.alert("Password and re entered passwors does not match");
      }
      // abortController.abort();
    } else {
      Alert.alert("Pleace fill the required field");
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require("../../assets/img1.png")}
        style={styles.header}
        imageStyle={{ borderBottomRightRadius: 30 }}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={28}
              color="white"
              onPress={() => props.navigation.navigate("Login")}
            />
          </TouchableOpacity>
          <Text style={styles.title}>User Registration</Text>
        </View>
      </ImageBackground>
      <ScrollView>
        <Text style={styles.topictxt}>User details</Text>
        <View style={styles.inputContainer}>
          <Input_2
            style={styles.inputField}
            placeholder="Name"
            value={name}
            pattern={"[^s]"}
            onValidation={(isValid) => setNameValid(isValid)}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.errMesg}>
          {!nameValid ? (
            <Text style={{ color: "tomato" }}>User name is Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input_2
            style={styles.inputField}
            placeholder="Email"
            value={email}
            pattern={"[^s]"}
            onValidation={(isValid) => setEmailValid(isValid)}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.errMesg}>
          {!emailValid ? (
            <Text style={{ color: "tomato" }}>Email is Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input_2
            style={styles.inputField}
            placeholder="Password"
            value={password}
            pattern={"[^s]"}
            onValidation={(isValid) => setPasswordValid(isValid)}
            secureTextEntry={notvisible}
            onChangeText={(text) => setPassword(text)}
          />

          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setVisible(!notvisible)}
          >
            {notvisible ? (
              <Iconics name="eye-outline" color="#306bff" size={25} />
            ) : (
              <Iconics name="eye-off-outline" color="#306bff" size={25} />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.errMesg}>
          {!passwordValid ? (
            <Text style={{ color: "tomato" }}>Password is Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <Input_2
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Re Enter Password"
            value={repassword}
            pattern={"[^s]"}
            onValidation={(isValid) => setRePasswordValid(isValid)}
            secureTextEntry={notvisible}
            onChangeText={(text) => setRePassword(text)}
          />

          <TouchableOpacity
            style={styles.eyeIcon}
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
          onPress={submitData}
        >
          <Text style={styles.nextBtn}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 70,
    width: "100%",
    borderBottomRightRadius: 70,
    borderBottomLeftRadius: 70,
  },
  title: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 70,
    justifyContent: "flex-start",
    marginLeft: 10,
    width: "100%",
  },

  inputContainer: {
    alignItems: "center",
    borderColor: "#306bff",
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: "row",
    height: 45,
    marginHorizontal: 35,
    marginTop: 24,
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  topictxt: {
    // alignSelf: "center",
    color: "#1255ff",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: SIZES.body3,
    padding: SIZES.padding * 2,
  },
  btn: {
    backgroundColor: "#306bff",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: 40,
  },
  nextBtn: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  eyeIcon: {
    marginLeft: 280,
    position: "absolute",
    top: 6,
  },

  errMesg: {
    height: 10,
    marginHorizontal: 35,
    marginVertical: 5,
  },
  inputField: {
    color: "#306bff",
    fontSize: 20,
    paddingHorizontal: 10,
  },
});
