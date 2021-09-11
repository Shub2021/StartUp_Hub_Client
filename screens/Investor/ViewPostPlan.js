import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Title, Card, Button, ActivityIndicator } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { URLs } from "../../constants";

const ViewPostPlan = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [br_number, setbrNumber] = useState("");
  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const br = await AsyncStorage.getItem("br");
    const userId = await AsyncStorage.getItem("userId");
    setEmail(email);
    setbrNumber(br);

    fetch(URLs.cn + "/postplan/" + email + "/" + br)
      .then((response) => response.json())
      .then((json) => {
        setData(json[0]);
      });
    setLoading(false);
  };

  useEffect(() => {
    getData();
    console.log(data);
  }, []);

  return (
    <View style={styles.root}>
      {!isLoading ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => getData()}
              refreshing={isLoading}
            />
          }
        >
          <Card style={styles.investCard}>
            <Text></Text>
            <Title>01) Investment Amount</Title>
            <Text style={styles.filed}>{data.amount}</Text>

            <Title>02) Investment Date</Title>
            <Text style={styles.filed}>{data.Startdate}</Text>

            <Title>03) Payback Period</Title>
            <Text style={styles.filed}>{data.time}</Text>

            <Title>04) Investment Rate</Title>
            <Text style={styles.filed}>{data.interestRate}</Text>

            <Title>05) Investment Information</Title>
            <Text style={styles.filed}>{data.information}</Text>
          </Card>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#faf8f7",
  },

  investCard: {
    padding: 15,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  // title: {
  //   marginRight: 150,
  //   fontWeight: "bold",
  // },

  filed: {
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 10,
  },

  descriptionStyle: {
    fontSize: 17,
    lineHeight: 23,
    marginBottom: 15,
  },
});

export default ViewPostPlan;
