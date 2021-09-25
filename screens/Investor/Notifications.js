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
import filter from "lodash.filter";

const HomeInvestor = (navigation) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [sentdata, setsentdata] = useState([]);
  const [subscribedata, setsubscribedata] = useState([]);
  const [recieveddata, setrecieveddata] = useState([]);

  const [fulldata, setfulldata] = useState([]);
  const [query, setQuery] = useState("");

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const userId = await AsyncStorage.getItem("userId");
    setEmail(email);
    setLoading(false);
    fetch(URLs.cn + "/company/")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setfulldata(json);
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

  const handleSearch = (text) => {
    const formattedQuery = text;
    const filteredData = filter(fulldata, (user) => {
      return contains(user, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = (name, query) => {
    if (name.company_name.includes(query) || name.category.includes(query)) {
      return true;
    }
    return false;
  };
  function renderHeader() {
    return (
      <View
        style={[
          styles.inputContainer,
          { marginBottom: 15, marginTop: 20, width: 380 },
        ]}
      >
        <TextInput
          autoCorrect={false}
          // clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{ paddingHorizontal: 20, width: 100 }}
        />
      </View>
    );
  }

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

              <Text style={styles.businessCategory}>
                Business Category:{" "}
                <Text style={{ fontSize: 18, fontWeight: "normal" }}>
                  {item.category}
                </Text>
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Button
                    style={styles.deleteBtn}
                    icon="delete"
                    mode="outlined"
                    theme={deletetheme}
                    onPress={() => rejectRequest(item)}
                  >
                    Reject
                  </Button>
                </View>
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
              </View>
            </View>
          </View>
        </Card>
      );
    }
  };

  return (
    <View>
      <FlatList
        ListHeaderComponent={renderHeader}
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
const deletetheme = {
  colors: {
    primary: "tomato",
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
    borderColor: "#a9f3e4",
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
    marginTop: 20,
    borderWidth: 1.25,
    borderColor: "#a9f3e4",
    backgroundColor: "#a9f3e4",
    borderRadius: 10,
    width: 150,
  },
  deleteBtn: {
    marginTop: 20,
    borderWidth: 1.25,
    borderColor: "tomato",
    borderRadius: 10,
    width: 150,
  },

  businessCategory: {
    fontSize: 17,
    marginTop: 15,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "dodgerblue",
    borderRadius: 20,
    height: 45,
  },
});

export default HomeInvestor;
