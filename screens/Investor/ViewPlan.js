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

const ViewPlan = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const userId = await AsyncStorage.getItem("userId");
    setEmail(email);

    fetch(URLs.cn + "/plan/" + email)
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
            <Title>01) Investment Area</Title>
            <Text style={styles.filed}>{data.title}</Text>

            <Title>02) Investment Amount</Title>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={styles.title}>Minimum</Text>
                <Text style={styles.filed}>{data.minInvest} LKR</Text>
              </View>

              <View>
                <Text style={styles.title}>Maximum</Text>
                <Text style={styles.filed}>{data.maxInvest} LKR</Text>
              </View>
            </View>

            <Title>03) Interest Rate</Title>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={styles.title}>Annual</Text>
                <Text style={styles.filed}>{data.interestTime}</Text>
              </View>
              <View>
                <Text style={{ fontWeight: "bold", marginTop: 3 }}>
                  Growth Rate
                </Text>
                <Text style={styles.filed}>{data.interestRate}%</Text>
              </View>
            </View>
            <Title>04) Description</Title>
            <Text style={styles.descriptionStyle}>{data.description}</Text>
            <Title>05) Terms and Conditions</Title>
            <Text style={styles.descriptionStyle}>{data.condition}</Text>
          </Card>
          <Button
            onPress={() => navigation.navigate("UpdatePlan", data)}
            style={{
              width: 300,
              padding: 3,
              marginTop: 50,
              marginLeft: 60,
            }}
            color="#0396FF"
            icon="square-edit-outline"
            mode="contained"
          >
            Edit Plan
          </Button>
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

  title: {
    marginRight: 150,
    fontWeight: "bold",
  },

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

export default ViewPlan;
