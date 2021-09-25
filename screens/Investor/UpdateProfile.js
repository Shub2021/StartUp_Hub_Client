import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { URLs } from "../../constants";
import Input from "../components/Input";

const UpdateProfile = ({ navigation }) => {
  const [cName, setcName] = useState("");
  const [cNameValid, setcNameValid] = useState(true);
  const [investorId, setInvestorId] = useState("");
  const [investArea, setinvestArea] = useState("");
  const [investAreaValid, setinvestAreaValid] = useState(true);
  const [cAddress, setcAddress] = useState("");
  const [cAddressValid, setcAddressValid] = useState(true);
  const [nic, setnic] = useState("");
  const [nicValid, setnicValid] = useState(true);
  const [cTel, setcTel] = useState("");
  const [cTelValid, setcTelValid] = useState(true);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const submitData = () => {
    if (
      cNameValid &&
      investAreaValid &&
      cAddressValid &&
      nicValid &&
      cTelValid
    ) {
      fetch(URLs.cn + "/investor/update/" + investorId, {
        method: "PATCH",
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
    } else {
      Alert.alert("Please fill the required feilds");
    }
  };

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const userId = await AsyncStorage.getItem("userId");
    fetch(URLs.cn + "/investor/" + email)
      .then((response) => response.json())
      .then((json) => {
        setcName(json.cName);
        setInvestorId(json._id);
        setinvestArea(json.investArea);
        setcAddress(json.cAddress);
        setnic(json.nic.toString());
        setcTel(json.cTel.toString());
        setLoading(false);
      });
  };

  useEffect(() => {
    // .catch((error) => console.error(error))
    getData();

    console.log(data);
  }, []);
  return (
    <View style={styles.root}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
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
          <View style={{ marginHorizontal: 15, marginBottom: 15, height: 10 }}>
            {!cNameValid ? (
              <Text style={{ color: "tomato" }}>Company Name is Required</Text>
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
              onValidation={(isValid) => setinvestAreaValid(isValid)}
              onChangeText={(text) => setinvestArea(text)}
            />
          </View>
          <View style={{ marginHorizontal: 15, marginBottom: 15, height: 10 }}>
            {!investAreaValid ? (
              <Text style={{ color: "tomato" }}>
                Investment Area is Required
              </Text>
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
          <View style={{ marginHorizontal: 15, marginBottom: 15, height: 10 }}>
            {!cAddressValid ? (
              <Text style={{ color: "tomato" }}>Address is Required</Text>
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
          <View style={{ marginHorizontal: 15, marginBottom: 15, height: 10 }}>
            {!nicValid ? (
              <Text style={{ color: "tomato" }}>NIC is Required</Text>
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
          <View style={{ marginHorizontal: 15, marginBottom: 15, height: 10 }}>
            {!cTelValid ? (
              <Text style={{ color: "tomato" }}>
                Contanct Number is Required
              </Text>
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
  },
  inputStyles: {
    margin: 10,
    fontSize: 17,
    fontWeight: "300",
    marginBottom: 5,
  },
});

export default UpdateProfile;
