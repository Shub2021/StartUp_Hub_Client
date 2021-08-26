import React from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { Card } from "react-native-paper";
import { TouchableHighlight } from "react-native-gesture-handler";

const SubscribedStartups = (props) => {
  const data = [
    { id: 1, addedDate: "2021-10-12", cType: "Retail Business" },
    { id: 2, addedDate: "2021-10-12", cType: "Retail Business" },
    { id: 3, addedDate: "2021-10-12", cType: "Retail Business" },
  ];
  const startupList = (item) => {
    return (
      <TouchableHighlight
        underlayColor="white"
        onPress={() => props.navigation.navigate("Notifications")}
      >
        <Card style={styles.comDetails} kety={item.id}>
          <View style={styles.allCards}>
            <Image
              style={styles.image}
              source={{
                uri: "https://images.pexels.com/photos/3748221/pexels-photo-3748221.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
              }}
            />

            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={styles.cardTitle}>Added Date</Text>
                <Text style={{ marginLeft: 35, fontSize: 16 }}>
                  {item.addedDate}
                </Text>
              </View>

              <View>
                <Text style={styles.cardTitle}>Startup Type</Text>
                <Text style={{ marginLeft: 35, fontSize: 16 }}>
                  {item.cType}
                </Text>
              </View>
            </View>
          </View>
        </Card>
      </TouchableHighlight>
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
    primary: "#658eff",
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
    padding: 10,
  },
  comDetails: {
    margin: 3,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },

  cardTitle: {
    marginTop: 5,
    marginLeft: 30,
    padding: 5,
    fontSize: 17,
    fontWeight: "bold",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default SubscribedStartups;
