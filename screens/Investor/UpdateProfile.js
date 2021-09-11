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

const UpdateProfile = ({ navigation }) => {
  const [cName, setcName] = useState("");
  const [investorId, setInvestorId] = useState("");
  const [investArea, setinvestArea] = useState("");
  const [cAddress, setcAddress] = useState("");
  const [nic, setnic] = useState("");
  const [cTel, setcTel] = useState("");

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const submitData = () => {
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
  },
});

export default UpdateProfile;
