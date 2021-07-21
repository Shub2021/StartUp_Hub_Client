import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SIZES, URLs } from "../constants";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { COLORS } from "../constants/index";

export default function postRegisterForm(props) {
  const [name, setName] = useState(props.route.params.name);
  const [email, setEmail] = useState(props.route.params.email);
  const [password, setPassword] = useState(props.route.params.password);
  const [type, setType] = useState("client");
  const [selected, setSelected] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const abortController = new AbortController();

  const submitData = () => {
    console.log(URLs.cn + " urllllllllll");
    console.log(email + " emaillllllll");
    console.log(
      JSON.stringify({
        name,
        email,
        type,
        password,
      })
    );
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

    abortController.abort();
  };

  const dataMap = [
    {
      value: "Client user",
      label: "Client user",
      discription:
        "Users gain access to all features connected to purchasing products " +
        "and services published by Sri Lankan startups, including the ability " +
        "to purchase items, request services, and access to all other " +
        "features relevant to purchasing products and services published by " +
        "Sri Lankan startups.",
    },
    {
      value: "Invester",
      label: "Invester",
      discription:
        "Investors may support Sri Lankan entrepreneurs by investing in them, " +
        "either by publishing their own investment plans or accepting the " +
        "investments that the startups have publicized. For investor users, " +
        "necessary information and analytical functions are also available.",
    },
    {
      value: "Both",
      label: "Both",
      discription:
        "You have access to both user rights and may use both accounts. You " +
        "can access the above-mentioned features by switching accounts from " +
        "the user account page.",
    },
  ];

  function selectAction(key) {
    let selectedButton = dataMap.find((e) => e.selected == true);
    // this.setSelected({ data });
    console.log("data awaaaaa  " + key);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ImageBackground
        source={require("../assets/img1.png")}
        style={styles.header}
        imageStyle={{ borderBottomRightRadius: 30 }}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity>
            <Ionicons
              name="arrow-back"
              size={28}
              color="white"
              onPress={() => props.navigation.navigate("Register")}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Setup your account</Text>
        </View>
      </ImageBackground>
      <ScrollView>
        <View style={styles.radiocontainer}>
          <TouchableWithoutFeedback onPress={() => selectAction}>
            <View
              style={{
                alignItems: "flex-start",
              }}
            >
              <RadioForm formHorizontal={false} animation={true}>
                {/* To create radio buttons, loop through your array of options */}
                {dataMap.map((data, i) => {
                  var onPress = (value, index) => {
                    setSelected(value);
                    setSelectedIndex(index);
                    selectAction(value);
                  };
                  return (
                    <RadioButton labelHorizontal={false} key={data.value}>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <RadioButtonInput
                          obj={data}
                          index={i}
                          isSelected={selectedIndex === i}
                          onPress={onPress}
                          borderWidth={1}
                          buttonInnerColor={"#0396FF"}
                          buttonOuterColor={
                            selectedIndex === i ? "#2196f3" : "#000"
                          }
                          buttonSize={20}
                          buttonOuterSize={25}
                          buttonStyle={{}}
                          buttonWrapStyle={{
                            marginRight: 10,
                          }}
                        />
                        <RadioButtonLabel
                          obj={data}
                          index={i}
                          labelHorizontal={false}
                          onPress={onPress}
                          labelStyle={{
                            fontSize: 20,
                          }}
                          labelWrapStyle={{
                            arginRight: 35,
                            fontSize: 20,
                            fontWeight: "bold",
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "auto",
                          minWidth: 50,
                        }}
                      >
                        {data.discription}
                      </Text>
                    </RadioButton>
                  );
                })}
              </RadioForm>
            </View>
          </TouchableWithoutFeedback>
        </View>
        {selectedIndex === 1 ? (
          <TouchableOpacity style={[styles.inputContainer, styles.btn]}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Proceed
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.inputContainer, styles.btn]}
            onPress={submitData}
          >
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>
              Register
            </Text>
          </TouchableOpacity>
        )}
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
  radiocontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.padding * 2,
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
});
