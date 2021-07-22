import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Picker,
  View,
  Alert,
  ScrollView,
} from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import { URLs } from "../../constants";

import {
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";

const UpdatePlan = ({ navigation, route }) => {
  console.log(route);
  const [data, setData] = useState(route.params);
  const [_id, setID] = useState(route.params._id);

  const [title, setTitle] = useState(route.params.title);
  const [minInvest, setminInvest] = useState(route.params.minInvest);
  const [maxInvest, setmaxInvest] = useState(route.params.maxInvest);
  const [interestTime, setinterestTime] = useState(route.params.interestTime);
  const [interestRate, setinterestRate] = useState(route.params.interestRate);
  const [description, setDescription] = useState(route.params.description);
  const [condition, setCondition] = useState(route.params.condition);

  const submitData = () => {
    fetch(URLs.cn + "/plan/" + _id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        minInvest,
        maxInvest,
        interestTime,
        interestRate,
        description,
        condition,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert("Investment Plan Created Succesfully");
        navigation.navigate("ViewPlan");
      });
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <TextInput
          style={styles.inputStyles}
          label="Business Title"
          value={title}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setTitle(text)}
        />

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 200 }}>
            <TextInput
              style={styles.inputStyles}
              label="Minimum Investment"
              value={minInvest.toString()}
              theme={theme}
              keyboardType="number-pad"
              mode="outlined"
              onChangeText={(Number) => setminInvest(Number)}
            />
          </View>
          <View style={{ width: 210 }}>
            <TextInput
              style={styles.inputStyles}
              label="Maximum Investment"
              value={maxInvest.toString()}
              theme={theme}
              keyboardType="number-pad"
              mode="outlined"
              onChangeText={(Number) => setmaxInvest(Number)}
            />
          </View>
        </View>

        <Text style={styles.inputStyles}>Growth Calculation Data</Text>

        <View style={{ flexDirection: "row" }}>
          <Card style={{ margin: 10 }}>
            <View style={styles.card}>
              <Picker
                selectedValue={interestTime}
                style={{ height: 30, width: 150 }}
                onValueChange={(value) => setinterestTime(value)}
              >
                <Picker.Item label="Annual" value="Annual" />
                <Picker.Item label="Monthly" value="Monthly" />
              </Picker>
            </View>
          </Card>
          <View style={{ width: 210 }}>
            <TextInput
              style={styles.inputStyles}
              label="Growth Rate"
              value={interestRate.toString()}
              theme={theme}
              mode="outlined"
              onChangeText={(Number) => setinterestRate(Number)}
            />
          </View>
        </View>

        <TextInput
          style={{ margin: 10 }}
          label="Description"
          value={description}
          theme={theme}
          mode="outlined"
          multiline={true}
          numberOfLines={6}
          maxLength={600}
          onChangeText={(text) => setDescription(text)}
        />

        <TextInput
          style={{ margin: 10 }}
          label="Terms and Conditions"
          value={condition}
          theme={theme}
          mode="outlined"
          multiline={true}
          numberOfLines={8}
          maxLength={300}
          onChangeText={(text) => setCondition(text)}
        />

        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Button
            style={{ backgroundColor: "#0396FF", width: 200, padding: 3 }}
            icon=""
            mode="contained"
            onPress={() => submitData()}
          >
            Publish
          </Button>
          <Button
            onPress={() => navigation.navigate("ViewPlan")}
            style={{ width: 300, padding: 3, marginTop: 50, marginBottom: 50 }}
            color="#0396FF"
            icon="cursor-default-click-outline"
            mode="outlined"
          >
            View Plan
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#0396FF",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // backgroundColor: "red",
  },
  inputStyles: {
    margin: 10,
    fontSize: 17,
    fontWeight: "300",
  },
  label: {
    marginLeft: -110,
    marginTop: 8,
  },

  result: {
    marginRight: 30,
    marginTop: 8,
  },

  card: {
    padding: 10,
    margin: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default UpdatePlan;
