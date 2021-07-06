import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Title, Card, Button, Badge } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";

const ViewPlan = (props) => {
  return (
    <View style={styles.root}>
      <Card style={styles.investCard}>
        <Title>01) Investment Area</Title>
        <Text style={styles.filed}>Financial</Text>

        <Title>02) Investment Amount</Title>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.title}>Minimum</Text>
            <Text style={styles.filed}>100,000 LKR</Text>
          </View>

          <View>
            <Text style={styles.title}>Maximum</Text>
            <Text style={styles.filed}>500,000 LKR</Text>
          </View>
        </View>

        <Title>03) Period of Calculation Interest</Title>
        <Text style={styles.filed}>Annual</Text>

        <Title>04) Interest Rate</Title>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Text style={styles.title}>Annual</Text>
            <Text style={styles.filed}>3%</Text>
          </View>
          <View>
            <Text style={styles.title}>Monthly</Text>
            <Text style={styles.filed}>5%</Text>
          </View>
        </View>
        <Title>05) Description</Title>
        <Text style={styles.descriptionStyle}>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. In publishing and
          graphic design, Lorem ipsum is a placeholder text commonly used to
          demonstrate the visual form of a document or a typeface without
          relying on meaningful conten.
        </Text>
        <Title>06) Terms and Conditions</Title>
        <Text style={styles.descriptionStyle}>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of.
        </Text>
      </Card>
      <Button
        onPress={() => props.navigation.navigate("CreateInvestment")}
        style={{
          width: 300,
          padding: 3,
          marginTop: 50,
          marginLeft: 60,
        }}
        color="#5972fe"
        icon="square-edit-outline"
        mode="contained"
      >
        Edit Plan
      </Button>
      <Button
        onPress={() => props.navigation.navigate("CreateInvestment")}
        style={{ width: 200, padding: 3, marginTop: 20, marginLeft: 110 }}
        color="red"
        icon="delete"
        mode="outlined"
      >
        Remove Plan
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#faf8f7",
  },

  investCard: {
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
    marginRight: 150,
    fontWeight: "bold",
  },

  filed: {
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 10,
  },

  descriptionStyle: {
    fontSize: 17,
    lineHeight: 23,
    marginBottom: 15,
  },
});

export default ViewPlan;
