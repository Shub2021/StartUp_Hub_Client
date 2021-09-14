import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";

import { URLs } from "../../constants";
import Input from "../components/Input";

const CompleteProfile = ({ navigation }) => {
  const [cName, setcName] = useState("");
  const [cNameValid, setcNameValid] = useState(false);
  const [investArea, setinvestArea] = useState("");
  const [investAreaValid, setinvestAreaValid] = useState(false);
  const [cAddress, setcAddress] = useState("");
  const [cAddressValid, setcAddressValid] = useState(false);
  const [nic, setnic] = useState("");
  const [nicValid, setnicValid] = useState(false);
  const [cTel, setcTel] = useState("");
  const [cTelValid, setcTelValid] = useState(false);

  const submitData = () => {
    fetch(URLs.cn + "/investor/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cName,
        investArea,
        cAddress,
        nic,
        cTel,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Profile Updated Succesfully");
        navigation.navigate("Profile");
      });
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <View>
          <Input
            style={styles.inputStyles}
            label="Business Name"
            value={cName}
            theme={theme}
            mode="outlined"
            pattern={"[^s]"}
            onValidation={(isValid) => setcNameValid(isValid)}
            onChangeText={(text) => setcName(text)}
          />
        </View>
        <View style={{ marginHorizontal: 15, height: 10 }}>
          {!cNameValid ? (
            <Text style={{ color: "tomato" }}>Title is Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View>
          <Input
            style={styles.inputStyles}
            label="Investment Area"
            value={investArea}
            theme={theme}
            mode="outlined"
            pattern={"[^s]"}
            onValidation={(isValid) => setcAddressValid(isValid)}
            onChangeText={(text) => setinvestArea(text)}
          />
        </View>
        <View style={{ marginHorizontal: 15, height: 10 }}>
          {!investAreaValid ? (
            <Text style={{ color: "tomato" }}>Title is Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View>
          <Input
            style={styles.inputStyles}
            label="Business Address"
            value={cAddress}
            theme={theme}
            mode="outlined"
            pattern={"[^s]"}
            onValidation={(isValid) => setcAddressValid(isValid)}
            onChangeText={(text) => setcAddress(text)}
          />
        </View>
        <View style={{ marginHorizontal: 15, height: 10 }}>
          {!cAddressValid ? (
            <Text style={{ color: "tomato" }}>Title is Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>
        <View>
          <Input
            style={styles.inputStyles}
            label="Investor NIC"
            value={nic}
            theme={theme}
            mode="outlined"
            pattern={"[^s]"}
            onValidation={(isValid) => setnicValid(isValid)}
            onChangeText={(text) => setnic(text)}
          />
        </View>
        <View style={{ marginHorizontal: 15, height: 10 }}>
          {!nicValid ? (
            <Text style={{ color: "tomato" }}>Title is Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>

        <View>
          <Input
            style={styles.inputStyles}
            label="Business Telephone"
            value={cTel}
            theme={theme}
            mode="outlined"
            pattern={"[^s]"}
            onValidation={(isValid) => setcTelValid(isValid)}
            onChangeText={(text) => setcTel(text)}
          />
        </View>
        <View style={{ marginHorizontal: 15, height: 10 }}>
          {!cTelValid ? (
            <Text style={{ color: "tomato" }}>Title is Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>

        <View>
          <Button
            style={{ margin: 50 }}
            color="#79c7ff"
            icon="content-save-outline"
            mode="contained"
            onPress={() => submitData()}
          >
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#0396FF",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputStyles: {
    margin: 10,
    fontSize: 17,
    fontWeight: "300",
  },
});

export default CompleteProfile;
