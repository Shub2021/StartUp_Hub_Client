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

export default function Register(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [notvisible, setVisible] = useState(true);

  const abortController = new AbortController();
  const type = "client";

  function submitData() {
    if (password == repassword) {
      props.navigation.navigate("postRegisterForm", { name, email, password });
    } else {
      Alert.alert("Password and re entered passwors does not match");
    }
    // abortController.abort();
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
        <View style={styles.inputContainer}>
          <TextInput
            style={{ paddingHorizontal: 10, color: "#306bff", fontSize: 20 }}
            placeholder="Re Enter Password"
            value={repassword}
            secureTextEntry={notvisible}
            onChangeText={(text) => setRePassword(text)}
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
          onPress={submitData}
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
    borderWidth: 1,
    marginTop: 24,
    paddingHorizontal: 10,
    borderColor: "#306bff",
    borderRadius: 10,
    paddingVertical: 2,
    height: 45,
  },
  topictxt: {
    fontSize: 30,
    fontWeight: "bold",
    // alignSelf: "center",
    padding: SIZES.padding * 2,
    marginTop: SIZES.body3,
    color: "#1255ff",
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
