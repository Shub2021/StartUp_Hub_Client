import React, { useState, useEffect, useCallback } from "react";
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
import Input from "../components/Input";

const PostAgreement = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [amount, setAmount] = useState("");
  const [amountValid, setAmountValid] = useState(false);
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [timeValid, setTimeValid] = useState(false);
  const [interestRate, setInterestRate] = useState("");
  const [interestRateValid, setInterestRateValid] = useState(false);
  const [information, setInformation] = useState("");
  const [informationValid, setInformationValid] = useState(false);
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
    if (amountValid && interestRateValid && informationValid) {
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
    } else {
      Alert.alert("Please fill the required feilds");
    }
  };

  return (
    <View style={styles.root}>
      {!isLoading ? (
        <ScrollView>
          <View>
            <Input
              style={styles.inputStyles}
              label="Investment Amount"
              value={amount}
              theme={theme}
              keyboardType="number-pad"
              mode="outlined"
              pattern={"[^s]"}
              onValidation={(isValid) => setAmountValid(isValid)}
              onChangeText={(Number) => setAmount(Number)}
            />
          </View>
          <View style={{ marginHorizontal: 15, height: 10 }}>
            {!amountValid ? (
              <Text style={{ color: "tomato" }}>Title is Required</Text>
            ) : (
              <Text></Text>
            )}
          </View>

          <View>
            <Input
              style={styles.inputStyles}
              label="Investment Rate"
              value={interestRate}
              theme={theme}
              keyboardType="number-pad"
              mode="outlined"
              pattern={"[^s]"}
              onValidation={(isValid) => setInterestRateValid(isValid)}
              onChangeText={(Number) => setInterestRate(Number)}
            />
          </View>
          <View style={{ marginHorizontal: 15, height: 10 }}>
            {!interestRateValid ? (
              <Text style={{ color: "tomato" }}>Title is Required</Text>
            ) : (
              <Text></Text>
            )}
          </View>

          <Card style={{ margin: 10 }}>
            <View style={styles.card}>
              <Picker
                selectedValue={time}
                style={{ height: 30, width: 150 }}
                onValueChange={(value) => setTime(value)}
              >
                <Picker.Item label="3 Months" value="3" />
                <Picker.Item label="6 Months" value="6" />
                <Picker.Item label="9 Months" value="9" />
                <Picker.Item label="12 Months" value="12" />
              </Picker>
            </View>
          </Card>

          <View>
            <Input
              style={{ margin: 10 }}
              label="Additional Information"
              value={information}
              theme={theme}
              mode="outlined"
              pattern={"[^s]"}
              onValidation={(isValid) => setInformationValid(isValid)}
              multiline={true}
              numberOfLines={6}
              maxLength={600}
              onChangeText={(text) => setInformation(text)}
            />
          </View>
          <View style={{ marginHorizontal: 15, height: 10 }}>
            {!informationValid ? (
              <Text style={{ color: "tomato" }}>Title is Required</Text>
            ) : (
              <Text></Text>
            )}
          </View>

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
