import React from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Title, Card, Button, Badge } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";

const Profile = (props) => {
  return (
    <View style={styles.container}>
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
                  uri: "https://image.freepik.com/free-photo/caucasian-handsome-man-posing-with-arms-hip-smiling-isolated-purple-wall_1368-89876.jpg",
                }}
              />
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <View style={{ flexDirection: "row" }}>
              <Title
                style={{ marginTop: 10, alignItems: "center", marginLeft: 15 }}
              >
                Ravindu Perera
              </Title>
              <MaterialIcons
                style={{ marginTop: 7, marginLeft: 5 }}
                name="verified"
                size={15}
                color="#0396FF"
              />
            </View>
            <Text style={{ fontSize: 18, marginBottom: 40 }}>Sri Lanka</Text>
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
              <Text style={styles.cardField}>076-6552441</Text>
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
              <Text style={styles.cardField}>sample@gmail.com</Text>
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
              <Text style={styles.fieldTitle}>Investmont Filed</Text>
              <Text style={styles.cardField}>Financial Investment</Text>
            </View>
          </View>
        </Card>

        <Card
          style={styles.profileCard}
          onPress={() => props.navigation.navigate("SubscribedStartups")}
        >
          <View style={styles.cardIcon}>
            <Text style={styles.fieldTitle}>SUBSCRIBED STARTUPS</Text>
            <Badge
              style={{
                marginLeft: 10,
                backgroundColor: "#7367F0",
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              5
            </Badge>
          </View>
        </Card>

        <Button
          onPress={() => props.navigation.navigate("CreateInvestment")}
          style={{
            // width: "100%",
            padding: 3,
            marginTop: 20,
            marginLeft: 50,
            marginRight: 50,
            marginBottom: 20,
          }}
          color="#0396FF"
          icon="cursor-default-click-outline"
          mode="contained"
        >
          View Plan
        </Button>
      </ScrollView>
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
});

export default Profile;
