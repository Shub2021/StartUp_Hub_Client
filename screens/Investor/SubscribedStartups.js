import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Button } from "react-native-paper";
import { URLs } from "../../constants";

import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeInvestor = (props) => {
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
    fetch(URLs.cn + "/subscribe/recieved/" + email)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setsubscribedata(result);
      });
  };

  useEffect(() => {
    // .catch((error) => console.error(error))
    getData();
    console.log(data);
  }, []);

  function removeSubscription(item) {
    fetch(URLs.cn + "/subscribe/" + item.br_number + "/" + email, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("successfuly unsubscribed " + item.company_name);
      });
  }
  function removePostPlan(item) {
    fetch(URLs.cn + "/postplan/" + item.br_number + "/" + email, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("successfuly unsubscribed " + item.company_name);
      });
  }

  function unsubscribeRequest(item) {
    let flag = true;
    console.log(item);
    fetch(URLs.cn + "/postplan/" + email + "/" + item.br_number)
      .then((response) => response.json())
      .then((json) => {
        if (json.length > 0) {
          let investYear = parseInt(json[0].Startdate.slice(0, 4));
          let investMonth = parseInt(json[0].Startdate.slice(5, 7));
          let paybackTime = parseInt(json[0].time);
          let x = investMonth + paybackTime;
          const d = new Date();
          let currentMonth = d.getMonth() + 1;
          let currentYear = d.getFullYear();

          if (x > 12) {
            investYear = investYear + 1;
            x = x - 12;
          }
          if (investYear < currentYear) {
            removeSubscription(item);
            removePostPlan(item);
          } else if (investYear === currentYear) {
            if (currentMonth > x) {
              removeSubscription(item);
              removePostPlan(item);
            } else {
              Alert.alert("Plan agreement exist. Cannot delete! ❌");
            }
          } else {
            Alert.alert("Plan agreement exist. Cannot delete! ❌");
          }
        } else {
          removeSubscription(item);
        }
      });
  }

  const startupList = (item) => {
    let sflag = false;
    for (let i = 0; i < subscribedata.length; i++) {
      const element = subscribedata[i];
      if (item.br_number === element.startupId) {
        sflag = true;
      }
    }
    if (sflag) {
      return (
        <TouchableWithoutFeedback
          onPress={async () => {
            await AsyncStorage.setItem("br", item.br_number);
            props.navigation.navigate("StartupStatistics");
          }}
        >
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
                        onPress={() => unsubscribeRequest(item)}
                      >
                        UNSUBSCRIBE
                      </Button>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </TouchableWithoutFeedback>
      );
    }
  };

  return (
    <View style={{ marginBottom: 100 }}>
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

  result: {
    marginLeft: 100,
    fontSize: 20,
  },
  sendBtn: {
    marginTop: 43,
    marginLeft: 50,
    borderWidth: 1.25,
    borderColor: "#cee4f9",
    backgroundColor: "#cee4f9",
    borderRadius: 50,
  },
});

export default HomeInvestor;
