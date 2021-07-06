import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Card, Button, IconButton, Colors } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const SubscribedStartups = (props) => {
  const data = [
    { id: 1, addedDate: "2021-10-12", cType: "Retail Business" },
    { id: 2, addedDate: "2021-10-12", cType: "Retail Business" },
    { id: 3, addedDate: "2021-10-12", cType: "Retail Business" },
    // { id: 4, addedDate: "2021-10-12", cType: "Retail Business" },
    // { id: 5, addedDate: "2021-10-12", cType: "Retail Business" },
  ];
  const startupList = (item) => {
    return (
      <Card style={styles.comDetails} kety={item.id}>
        <View style={styles.allCards}>
          <Image
            style={{ width: 80, height: 80, borderRadius: 40, marginTop: 10 }}
            source={{
              uri: "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            }}
          />

          <View style={{ flexDirection: "row" }}>
            <View>
              <Text style={styles.cardTitle}>Added Date</Text>
              <Text style={{ marginLeft: 25, fontSize: 15 }}>
                {item.addedDate}
              </Text>
            </View>

            <View>
              <Text style={styles.cardTitle}>Startup Type</Text>
              <Text style={{ marginLeft: 25 }}>{item.cType}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 5,
            marginBottom: 10,
            marginLeft: 20,
            marginRight: 40,
            // width: "100%",
            // alignItems: "center",
          }}
        >
          <Button
            icon="information-outline"
            theme={dtheme}
            mode="contained"
            onPress={() => props.navigation.navigate("Notifications")}
          >
            View Startup
          </Button>
        </View>
      </Card>
    );
  };

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return startupList(item);
        }}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

const dtheme = {
  colors: {
    primary: "#8699fe",
  },
};
const atheme = {
  colors: {
    primary: "green",
  },
};

const styles = StyleSheet.create({
  comDetails: {
    margin: 5,
    marginLeft: 10,
    marginRight: 10,
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

  allCards: {
    flexDirection: "row",
    padding: 20,
  },

  cardTitle: {
    marginTop: 20,
    marginLeft: 20,
    padding: 5,
    fontWeight: "bold",
  },
});

export default SubscribedStartups;
