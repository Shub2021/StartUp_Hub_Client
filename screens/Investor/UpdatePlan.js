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
import Input from "../components/Input";

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
  const [titleValid, setTitleValid] = useState(true);
  const [minInvest, setminInvest] = useState(route.params.minInvest);
  const [minInvestValid, setminInvestValid] = useState(true);
  const [maxInvest, setmaxInvest] = useState(route.params.maxInvest);
  const [maxInvestValid, setmaxInvestValid] = useState(true);
  const [interestRate, setinterestRate] = useState(route.params.interestRate);
  const [interestRateValid, setinterestRateValid] = useState(true);
  const [description, setDescription] = useState(route.params.description);
  const [descriptionValid, setDescriptionValid] = useState(true);
  const [condition, setCondition] = useState(route.params.condition);
  const [conditionValid, setConditionValid] = useState(true);

  const submitData = () => {
    if (
      titleValid &&
      minInvestValid &&
      maxInvestValid &&
      interestRateValid &&
      descriptionValid &&
      conditionValid
    ) {
      fetch(URLs.cn + "/plan/" + _id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          minInvest,
          maxInvest,
          interestRate,
          description,
          condition,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          Alert.alert("Investment Plan Updated Succesfully");
          navigation.navigate("ViewPlan");
        });
    }
    Alert.alert("Please fill the required field");
  };

  return (
    <View style={styles.root}>
      <ScrollView>
        <View>
          <Input
            style={styles.inputStyles}
            label="Business Title"
            value={title}
            theme={theme}
            mode="outlined"
            pattern={"[^s]"}
            onValidation={(isValid) => setTitleValid(isValid)}
            onChangeText={(text) => setTitle(text)}
          />
        </View>
        <View style={{ marginHorizontal: 15, marginBottom: 15, height: 10 }}>
          {!titleValid ? (
            <Text style={{ color: "tomato" }}>Title is Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 200 }}>
            <View>
              <Input
                style={styles.inputStyles}
                label="Minimum Investment"
                value={minInvest.toString()}
                theme={theme}
                keyboardType="number-pad"
                mode="outlined"
                pattern={"[^s]"}
                onValidation={(isValid) => setminInvestValid(isValid)}
                onChangeText={(Number) => setminInvest(Number)}
              />
            </View>
            <View
              style={{ marginHorizontal: 15, marginBottom: 15, height: 10 }}
            >
              {!minInvestValid ? (
                <Text style={{ color: "tomato" }}>Minimum is Required</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </View>
          <View style={{ width: 210 }}>
            <View>
              <Input
                style={styles.inputStyles}
                label="Maximum Investment"
                value={maxInvest.toString()}
                theme={theme}
                keyboardType="number-pad"
                mode="outlined"
                pattern={"[^s]"}
                onValidation={(isValid) => setmaxInvestValid(isValid)}
                onChangeText={(Number) => setmaxInvest(Number)}
              />
            </View>
            <View
              style={{ marginHorizontal: 15, marginBottom: 15, height: 10 }}
            >
              {!maxInvestValid ? (
                <Text style={{ color: "tomato" }}>Maximum is Required</Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </View>
        </View>

        <Text style={styles.inputStyles}>Growth Calculation Data</Text>

        <View style={{ flexDirection: "row" }}>
          <View style={{ width: 210 }}>
            <View>
              <Input
                style={styles.inputStyles}
                label="Return"
                value={interestRate.toString()}
                theme={theme}
                mode="outlined"
                pattern={"[^s]"}
                onValidation={(isValid) => setinterestRateValid(isValid)}
                onChangeText={(Number) => setinterestRate(Number)}
              />
            </View>
            <View
              style={{ marginHorizontal: 15, marginBottom: 15, height: 10 }}
            >
              {!interestRateValid ? (
                <Text style={{ color: "tomato" }}>
                  Interest Rate is Required
                </Text>
              ) : (
                <Text></Text>
              )}
            </View>
          </View>
        </View>

        <View>
          <Input
            style={{ margin: 10 }}
            label="Description"
            value={description}
            theme={theme}
            mode="outlined"
            pattern={"[^s]"}
            onValidation={(isValid) => setDescriptionValid(isValid)}
            multiline={true}
            numberOfLines={6}
            maxLength={600}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={{ marginHorizontal: 15, marginBottom: 15, height: 10 }}>
          {!descriptionValid ? (
            <Text style={{ color: "tomato" }}>Description is Required</Text>
          ) : (
            <Text></Text>
          )}
        </View>

        <View>
          <Input
            style={{ margin: 10 }}
            label="Terms and Conditions"
            value={condition}
            theme={theme}
            mode="outlined"
            pattern={"[^s]"}
            onValidation={(isValid) => setConditionValid(isValid)}
            multiline={true}
            numberOfLines={6}
            maxLength={300}
            onChangeText={(text) => setCondition(text)}
          />
        </View>
        <View style={{ marginHorizontal: 15, marginBottom: 15, height: 10 }}>
          {!conditionValid ? (
            <Text style={{ color: "tomato" }}>
              Terms and Condition is Required
            </Text>
          ) : (
            <Text></Text>
          )}
        </View>

        <View style={{ alignItems: "center", marginTop: 30, marginBottom: 70 }}>
          <Button
            style={{ backgroundColor: "#0396FF", width: 200, padding: 3 }}
            icon=""
            mode="contained"
            onPress={() => submitData()}
          >
            Save
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
