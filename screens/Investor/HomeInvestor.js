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

const HomeInvestor = (navigation) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getData = () => {
    fetch(URLs.cn + "/company/")
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
  };

  useEffect(() => {
    // .catch((error) => console.error(error))
    getData();
    setLoading(false);
    console.log(data);
  }, []);

  const startupList = (item) => {
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

              <View>
                <Button
                  style={styles.sendBtn}
                  icon="send"
                  mode="outlined"
                  theme={theme}
                  onPress={() => Alert.alert("Request Sent")}
                >
                  Send Request
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Card>
    );
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
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#ffc211",
    marginTop: 10,
    width: 150,
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
    marginTop: 43,
    marginLeft: 25,
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
