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

import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import filter from "lodash.filter";

const HomeInvestor = (props) => {
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
    fetch(URLs.cn + "/investorrequest/sent/" + email)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        setsentdata(result);
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
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{ paddingHorizontal: 20, width: 100 }}
        />
      </View>
    );
  }

  function sendRequest(item) {
    const investorEmail = email;
    const startupId = item.br_number;
    console.log(investorEmail);
    fetch(URLs.cn + "/investorrequest/", {
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
          Alert.alert("Request Sent to the " + item.company_name);
        }
      });
  }
  function cancleRequest(item) {
    fetch(URLs.cn + "/investorrequest/" + item.br_number + "/" + email, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("successfuly deleted " + item.company_name);
      });
  }
  const startupList = (item) => {
    let sflag = false;
    let br_number = item.br_number;
    for (let i = 0; i < sentdata.length; i++) {
      const element = sentdata[i];
      if (item.br_number === element.startupId) {
        sflag = true;
      }
    }
    return (
      <TouchableWithoutFeedback
        onPress={async () => {
          await AsyncStorage.setItem("br", br_number);
          props.navigation.navigate("StartupProfile");
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
                  <Text style={{ fontSize: 17, textTransform: "uppercase" }}>
                    {item.company_name}
                  </Text>
                </View>

                <View>
                  <Text style={styles.cardTitle}>Business Category</Text>
                  <Text style={styles.result}>{item.category}</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row" }}>
                <View>
                  <Text
                    style={{
                      fontSize: 15,
                      marginTop: 15,
                      fontWeight: "bold",
                    }}
                  >
                    Startup Type
                  </Text>
                  <Text
                    style={styles.categoryBtn}
                    mode="outlined"
                    theme={theme}
                  >
                    {item.type}
                  </Text>
                </View>
                {sflag ? (
                  <View>
                    <Button
                      style={styles.cancelBtn}
                      icon="close"
                      mode="outlined"
                      theme={theme}
                      onPress={() => cancleRequest(item)}
                    >
                      Cancel Request
                    </Button>
                  </View>
                ) : (
                  <View>
                    <Button
                      style={styles.sendBtn}
                      icon="send"
                      mode="outlined"
                      theme={theme}
                      onPress={() => sendRequest(item)}
                    >
                      Send Request
                    </Button>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Card>
      </TouchableWithoutFeedback>
    );
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

const styles = StyleSheet.create({
  comDetails: {
    backgroundColor: "#fcfcfc",
    borderRadius: 10,
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  allCards: {
    flexDirection: "row",
    padding: 20,
  },

  cardTitle: {
    fontSize: 15,
    marginTop: 5,
    marginLeft: 100,
    fontWeight: "bold",
  },
  categoryBtn: {
    fontSize: 20,
    marginTop: 10,
    width: 100,
  },
  icon: {
    color: "dodgerblue",
    marginVertical: 20,
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
    marginTop: 35,
    marginLeft: 75,
    borderWidth: 1.25,
    borderColor: "#cee4f9",
    backgroundColor: "#cee4f9",
    borderRadius: 50,
  },
  cancelBtn: {
    marginTop: 35,
    marginLeft: 75,
    borderWidth: 1.25,
    borderColor: "#fff19d",
    backgroundColor: "#fff19d",
    borderRadius: 50,
  },

  searchBar: {
    alignItems: "center",
    borderColor: "dodgerblue",
    borderRadius: 35,
    borderWidth: 1,
    flexDirection: "row",
    height: 50,
    marginHorizontal: 10,
    marginTop: 24,
    paddingHorizontal: 10,
  },
  inputContainer: {
    alignItems: "center",
    borderColor: "dodgerblue",
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: "row",
    height: 45,
    marginHorizontal: 20,
  },
});

export default HomeInvestor;
