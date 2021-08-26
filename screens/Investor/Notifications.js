import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { Card, Button } from "react-native-paper";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const initialNotifications = [
  { id: 1, cName: "Ravindu Perera", cType: "Retail Business" },
  { id: 2, cName: "Supun Perera", cType: "Retail Business" },
  { id: 3, cName: "Ruwan Perera", cType: "Retail Business" },
];
const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [refreshing, setRefreshing] = useState(false);

  const handleDelete = (notification) => {
    setNotifications(notifications.filter((m) => m.id !== notification.id));
  };
  const startupList = (item) => {
    return (
      <Swipeable
        renderRightActions={() => (
          <TouchableWithoutFeedback onPress={() => handleDelete(item)}>
            <View style={styles.delete}>
              <MaterialCommunityIcons
                name="trash-can"
                size={35}
                color="white"
              />
            </View>
          </TouchableWithoutFeedback>
        )}
      >
        <TouchableHighlight
          underlayColor="white"
          onPress={() => console.log("Touched ")}
        >
          <Card style={styles.comDetails} kety={item.id}>
            <View style={styles.allCards}>
              <Image
                style={styles.image}
                source={{
                  uri: "https://image.freepik.com/free-photo/handsome-young-businessman-shirt-eyeglasses_85574-6228.jpg",
                }}
              />
              <View>
                <Text style={styles.cardTitle}>Startup Name</Text>
                <Text style={{ marginLeft: 20, fontSize: 20 }}>
                  {item.cName}
                </Text>

                <Text style={styles.cardTitle}>Startup Type</Text>
                <Text style={{ marginLeft: 20 }}>{item.cType}</Text>

                <View
                  style={{ flexDirection: "row", marginLeft: 5, marginTop: 20 }}
                >
                  <Button
                    icon="delete"
                    theme={dtheme}
                    mode="Text button"
                    onPress={() => console.log("Deleted")}
                  >
                    Delete
                  </Button>
                  <Button
                    icon="checkbox-marked-circle-outline"
                    theme={atheme}
                    mode="Text button"
                    onPress={() => console.log("Added")}
                  >
                    Add Startup
                  </Button>
                </View>
              </View>
            </View>
          </Card>
        </TouchableHighlight>
      </Swipeable>
    );
  };

  return (
    <View>
      <FlatList
        data={initialNotifications}
        renderItem={({ item }) => {
          return startupList(item);
        }}
        keyExtractor={(item) => `${item.id}`}
        refreshing={refreshing}
        onRefresh={() => {
          setNotifications([
            { id: 2, cName: "Supun Perera", cType: "Retail Business" },
          ]);
        }}
      />
    </View>
  );
};

const dtheme = {
  colors: {
    primary: "red",
  },
};
const atheme = {
  colors: {
    primary: "green",
  },
};

const styles = StyleSheet.create({
  allCards: {
    flexDirection: "row",
    padding: 20,
  },
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
  delete: {
    width: 80,
    backgroundColor: "#ff5252",
    height: 170,
    marginTop: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    marginTop: 5,
    marginLeft: 20,
    fontWeight: "bold",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 15,
  },
});

export default Notifications;
