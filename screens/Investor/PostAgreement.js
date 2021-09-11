import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Picker,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { URLs } from "../../constants";

const PostAgreement = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [information, setInformation] = useState("");
  const [br_number, setBrNumber] = useState("");
  const [startupName, setStartupName] = useState("");

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const userId = await AsyncStorage.getItem("userId");
    const br = await AsyncStorage.getItem("br");
    const sName = await AsyncStorage.getItem("startupName");
    setEmail(email);
    setBrNumber(br);
    setStartupName(sName);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const submitData = () => {
    let Startdate = new Date().toISOString().slice(0, 10);
    console.log(email);
    fetch(URLs.cn + "/postplan/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        interestRate,
        time,
        information,
        email,
        Startdate,
        br_number,
        startupName,
      }),
    }).then((res) => res.json());
    Alert.alert("Post Agreement Created Succesfully");
    // props.navigation.navigate("ViewPlan");
  };

  return (
    <View style={styles.root}>
      {!isLoading ? (
        <ScrollView>
          <TextInput
            style={styles.inputStyles}
            label="Investment Amount"
            value={amount}
            theme={theme}
            keyboardType="number-pad"
            mode="outlined"
            onChangeText={(Number) => setAmount(Number)}
          />

          <TextInput
            style={styles.inputStyles}
            label="Investment Rate"
            value={interestRate}
            theme={theme}
            keyboardType="number-pad"
            mode="outlined"
            onChangeText={(Number) => setInterestRate(Number)}
          />
          <TextInput
            style={styles.inputStyles}
            label="Payback Period"
            value={time}
            theme={theme}
            mode="outlined"
            onChangeText={(text) => setTime(text)}
          />

          <TextInput
            style={{ margin: 10 }}
            label="Additional Information"
            value={information}
            theme={theme}
            mode="outlined"
            multiline={true}
            numberOfLines={6}
            maxLength={600}
            onChangeText={(text) => setInformation(text)}
          />

          <View style={{ alignItems: "center", marginTop: 30 }}>
            <Button
              style={{ backgroundColor: "#0396FF", width: 200, padding: 3 }}
              icon=""
              mode="contained"
              onPress={() => submitData()}
            >
              Save Data
            </Button>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
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
    // backgroundColor: "red",
  },
  inputStyles: {
    margin: 10,
    fontSize: 17,
    fontWeight: "300",
  },
  label: {
    marginLeft: -110,
    marginTop: 8,
  },

  result: {
    marginRight: 30,
    marginTop: 8,
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default PostAgreement;
