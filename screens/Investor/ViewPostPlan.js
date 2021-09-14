import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Image,
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
            <Title>i) Investment Amount</Title>
            <Text style={styles.filed}>{data.amount}</Text>

            <Title>ii) Investment Date</Title>
            <Text style={styles.filed}>{data.Startdate}</Text>

            <Title>iii) Payback Period</Title>
            <Text style={styles.filed}>{data.time}</Text>

            <Title>iv) Investment Rate</Title>
            <Text style={styles.filed}>{data.interestRate}%</Text>

            <Title>v) Investment Information</Title>
            <Text style={styles.filed}>{data.information}</Text>
          </Card>
          <Image
            style={styles.image}
            source={require("../../assets/images/post_agreement.png")}
          />
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
    backgroundColor: "#fff",
  },

  investCard: {
    borderRadius: 10,
    marginBottom: 30,
    marginHorizontal: 8,
    marginTop: 40,
    padding: 15,
    borderWidth: 1.25,
    borderColor: "#3857fd",
    backgroundColor: "#f1f3ff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  filed: {
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 20,
    marginLeft: 15,
  },

  descriptionStyle: {
    fontSize: 17,
    lineHeight: 23,
    marginBottom: 15,
  },
  image: {
    width: 315,
    height: 315,
    alignSelf: "center",
  },
});

export default ViewPostPlan;
