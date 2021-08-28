import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { Card, Button } from "react-native-paper";
import { URLs } from "../../constants";

import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeInvestor = (navigation) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [sentdata, setsentdata] = useState([]);
  const [subscribedata, setsubscribedata] = useState([]);
  const [recieveddata, setrecieveddata] = useState([]);

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const userId = await AsyncStorage.getItem("userId");
    setEmail(email);
    setLoading(false);
    fetch(URLs.cn + "/company/")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
    fetch(URLs.cn + "/startuprequest/recieved/" + email)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setrecieveddata(result);
      });
  };

  useEffect(() => {
    // .catch((error) => console.error(error))
    getData();
    console.log(data);
  }, []);

  function rejectRequest(item) {
    fetch(URLs.cn + "/startuprequest/" + item.br_number + "/" + email, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("successfuly deleted " + item.company_name);
      });
  }
  function acceptInvestment(item) {
    fetch(URLs.cn + "/startuprequest/" + item.br_number + "/" + email, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("successfuly Accepted");
      });
    const investorEmail = email;
    const startupId = item.br_number;

    fetch(URLs.cn + "/subscribe/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        investorEmail,
        startupId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.message === "Request exists") {
          Alert.alert("Request exists");
        } else {
          Alert.alert("Accepted");
        }
      });
  }
  const startupList = (item) => {
    let sflag = false;
    for (let i = 0; i < recieveddata.length; i++) {
      const element = recieveddata[i];
      if (item.br_number === element.startupId) {
        sflag = true;
      }
    }
    if (sflag) {
      return (
        <Card style={styles.comDetails}>
          <View style={styles.allCards}>
            <View>
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      marginTop: 5,
                      fontWeight: "bold",
                    }}
                  >
                    Startup Name
                  </Text>
                  <Text style={{ fontSize: 20 }}>{item.company_name}</Text>
                </View>

                <View>
                  <Text style={styles.cardTitle}>Startup Type</Text>
                  <Text style={styles.result}>{item.type}</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text
                    style={{
                      fontSize: 17,
                      marginTop: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Business Category
                  </Text>
                  <Button
                    style={styles.categoryBtn}
                    mode="outlined"
                    theme={theme}
                  >
                    {item.category}
                  </Button>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <View>
                    <Button
                      style={styles.sendBtn}
                      icon="checkbox-marked-circle-outline"
                      mode="outlined"
                      theme={theme}
                      onPress={() => acceptInvestment(item)}
                    >
                      Accept Request
                    </Button>
                  </View>

                  <View>
                    <MaterialIcons
                      name="delete"
                      color="tomato"
                      size={24}
                      onPress={() => rejectRequest(item)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Card>
      );
    }
  };

  return (
    <View style={{ marginBottom: 100 }}>
      <View style={styles.searchBar}>
        <MaterialIcons style={styles.icon} name="search" size={25} />
        <TextInput style={styles.input} placeholder="Search" />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return startupList(item);
        }}
        keyExtractor={(item) => `${item._id}`}
        onRefresh={() => getData()}
        refreshing={isLoading}
      />
    </View>
  );
};

const theme = {
  colors: {
    primary: "#313cfb",
  },
};

const styles = StyleSheet.create({
  comDetails: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    shadowColor: "#000",
    backgroundColor: "#fcfcfc",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  allCards: {
    padding: 15,
  },

  cardTitle: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 100,
    fontWeight: "bold",
  },
  categoryBtn: {
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffc211",
    marginTop: 10,
    width: 130,
  },

  input: {
    color: "black",
    fontSize: 18,
    borderRadius: 20,
  },
  result: {
    marginLeft: 100,
    fontSize: 20,
  },
  sendBtn: {
    marginTop: 43,
    marginLeft: 10,
    borderWidth: 1.25,
    borderColor: "#cee4f9",
    backgroundColor: "#cee4f9",
    borderRadius: 50,
  },

  searchBar: {
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "dodgerblue",
    marginTop: 24,
    marginBottom: 20,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 35,
    height: 50,
  },
});

export default HomeInvestor;
