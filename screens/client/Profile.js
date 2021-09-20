import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Title, Card, Button, Badge } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS, FONTS } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URLs } from "../../constants";

const Profile = ({ props, navigation }) => {
  const [Id, setId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setId(userId);
    getUserData(userId);
  };

  const getUserData = (userId) => {
    fetch(URLs.cn + "/users/" + userId)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result);
        setIsLoading(false);
      });
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("name");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("type");
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
    }

    console.log("Done.");
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView>
          <Card style={styles.cardHeader}>
            <View>
              <Image
                source={{
                  uri: "https://image.freepik.com/free-vector/brainstorming-illustration_65141-415.jpg",
                }}
                style={{ height: 150 }}
              />
              <View style={{ alignItems: "center", marginTop: -50 }}>
                <Image
                  style={{ width: 140, height: 140, borderRadius: 70 }}
                  source={{
                    uri: "https://image.flaticon.com/icons/png/128/1057/1057231.png",
                  }}
                />
              </View>
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Title
                  style={{
                    marginTop: 10,
                    alignItems: "center",
                    marginLeft: 15,
                    marginBottom: 40,
                    ...FONTS.h2,
                  }}
                >
                  User Profile
                </Title>
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
              <Ionicons
                style={{ marginTop: 5 }}
                name="person"
                size={25}
                color="black"
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={{ ...FONTS.h4, marginTop: 1 }}>Name</Text>
                <Text style={{ marginTop: 2.5, ...FONTS.body4 }}>
                  {user.name}
                </Text>
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
                <Text style={{ ...FONTS.h4, marginTop: 1 }}>E-mail</Text>
                <Text style={{ marginTop: 2.5, ...FONTS.body4 }}>
                  {user.email}
                </Text>
              </View>
            </View>
          </Card>

          <Button
            style={{
              // width: "100%",
              padding: 3,
              marginTop: 50,
              marginLeft: 50,
              marginRight: 50,
              marginBottom: 20,
              backgroundColor: "#0396FF",
            }}
            color="#0396FF"
            icon="autorenew"
            mode="contained"
          >
            <Text style={{ ...FONTS.body4 }}>Change Password</Text>
          </Button>
          <Button
            style={{
              // width: "100%",
              padding: 3,
              marginTop: 20,
              marginLeft: 50,
              marginRight: 50,
              marginBottom: 20,
              backgroundColor: COLORS.primary,
              ...FONTS.body3,
            }}
            color="#0396FF"
            icon="logout"
            mode="contained"
            onPress={logout}
          >
            <Text style={{ ...FONTS.body4 }}> Sign Out </Text>
          </Button>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#faf8f7",
  },

  cardHeader: {},
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

  fieldTitle: {},

  cardField: {},
  cardIcon: {
    flexDirection: "row",
  },
});

export default Profile;
