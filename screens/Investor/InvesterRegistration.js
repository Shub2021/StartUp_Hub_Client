import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { URLs } from "../../constants";

const CompleteProfile = ({ navigation, route }) => {
  const [cName, setcName] = useState("");
  const [investArea, setinvestArea] = useState("");
  const [cAddress, setcAddress] = useState("");
  const [nic, setnic] = useState("");
  const [cTel, setcTel] = useState("");
  const [name, setName] = useState(route.params.name);
  const [email, setEmail] = useState(route.params.email);
  const [password, setPassword] = useState(route.params.password);
  const [type, setType] = useState(route.params.selected);

  const submitData = () => {
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
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Registered Successfully");
        navigation.navigate("Login");
      });
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <TextInput
          style={styles.inputStyles}
          label="Business Name"
          value={cName}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setcName(text)}
        />
        <TextInput
          style={styles.inputStyles}
          label="Investment Area"
          value={investArea}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setinvestArea(text)}
        />
        <TextInput
          style={styles.inputStyles}
          label="Business Address"
          value={cAddress}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setcAddress(text)}
        />
        <TextInput
          style={styles.inputStyles}
          label="Investor NIC"
          value={nic}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setnic(text)}
        />

        <TextInput
          style={styles.inputStyles}
          label="Business Telephone"
          value={cTel}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setcTel(text)}
        />

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
