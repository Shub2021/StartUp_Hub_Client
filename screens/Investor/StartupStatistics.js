import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { Title, Card, Button } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { URLs } from "../../constants";

const Profile = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [planEmail, setPlanEmail] = useState("");
  const [planExist, setPlanExist] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const userId = await AsyncStorage.getItem("userId");
    const br_number = await AsyncStorage.getItem("br");
    await AsyncStorage.removeItem("br");
    console.log(br_number);
    fetch(URLs.cn + "/company/" + br_number)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
    setPlanEmail(email);
    setLoading(false);
  };
  useEffect(() => {
    // .catch((error) => console.error(error))
    getData();

    console.log(data);
  }, []);
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("name");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("type");
      props.navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }

    console.log("Done.");
  };

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => getData()}
              refreshing={isLoading}
            />
          }
        >
          <Card style={styles.cardHeader}>
            <View>
              <Image source={{ uri: data.image }} style={styles.image} />
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Title style={styles.title}>{data.company_name}</Title>
                <MaterialIcons
                  style={{ marginTop: 7, marginLeft: 5 }}
                  name="verified"
                  size={15}
                  color="#0396FF"
                />
              </View>
            </View>
          </Card>

          <Card style={styles.profileCard}>
            <View style={styles.cardIcon}>
              <MaterialCommunityIcons
                style={{ marginTop: 5 }}
                name="finance"
                size={25}
                color="black"
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.fieldTitle}>Startup Type</Text>
                <Text style={styles.cardField}>{data.type}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.profileCard}>
            <View style={styles.cardIcon}>
              <MaterialCommunityIcons
                style={{ marginTop: 5 }}
                name="format-list-bulleted-type"
                size={25}
                color="black"
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.fieldTitle}>Startup Category</Text>
                <Text style={styles.cardField}>{data.category}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.profileCard}>
            <View style={styles.cardIcon}>
              <Ionicons
                style={{ marginTop: 5 }}
                name="call-outline"
                size={25}
                color="black"
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.fieldTitle}>Contact Number</Text>
                <Text style={styles.cardField}>{data.contact}</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.profileCard}>
            <View style={styles.cardIcon}>
              <Fontisto
                style={{ marginTop: 5 }}
                name="email"
                size={25}
                color="black"
              />

              <View style={{ marginLeft: 20 }}>
                <Text style={styles.fieldTitle}>E-mail</Text>
                <Text style={styles.cardField}>{data.email}</Text>
              </View>
            </View>
          </Card>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 50,
              marginTop: 50,
            }}
          >
            <Button
              onPress={logout}
              color="#0396FF"
              icon="logout"
              mode="outlined"
            >
              Logout
            </Button>
            <Button
              style={{
                borderRadius: 20,
              }}
              onPress={() => props.navigation.navigate("CompleteProfile")}
              color="#a4c8ff"
              icon="autorenew"
              mode="contained"
            >
              Update Profile
            </Button>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#faf8f7",
  },
  btn: {
    padding: 3,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
  },
  profileCard: {
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
    marginTop: 20,
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 30,
    fontSize: 25,
    textTransform: "uppercase",
    padding: 10,
  },

  fieldTitle: {
    fontWeight: "bold",
    marginTop: 1,
  },

  cardField: {
    marginTop: 2.5,
    fontSize: 17,
  },
  cardIcon: {
    flexDirection: "row",
  },
  image: {
    height: 150,
    width: 400,
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Profile;
