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
import { URLs } from "../../constants";

export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const abortController = new AbortController();
  const type = "client";

  const submitData = () => {
    if (password == repassword) {
      console.log("aoffffaaaaaaaaa");
      console.log(
        JSON.stringify({
          name,
          email,
          type,
          password,
        })
      );
      console.log(URLs.cn);
      fetch(URLs.cn + "/users/signup", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          type,
          password,
        }),
      });

      Alert.alert("Registered Successfully");
      props.navigation.navigate("Login");
    } else {
      Alert.alert("Password and re entered passwors does not match");
    }
    abortController.abort();
  };

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
          <Text style={styles.title}>Register</Text>
        </View>
      </ImageBackground>
      <ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Re Enter Password"
            value={repassword}
            onChangeText={(text) => setRePassword(text)}
          />
        </View>
        <TouchableOpacity
          style={[styles.inputContainer, styles.btn]}
          onPress={submitData}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.inputContainer, styles.btn]}
          onPress={() => props.navigation.navigate("postRegisterForm")}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
            Next
          </Text>
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
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  headerContainer: {
    height: 70,
    width: "100%",
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 35,
    borderWidth: 2,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: "#306bff",
    borderRadius: 23,
    paddingVertical: 2,
    height: 45,
  },
  btn: {
    backgroundColor: "#306bff",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  registerbtn: {
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
