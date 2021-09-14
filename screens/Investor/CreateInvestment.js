import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  Picker,
  View,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { URLs } from "../../constants";
import Input from "../components/Input";

const CreateInvestment = (props) => {
  const [isLoading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [titleValid, setTitleValid] = useState(false);
  const [email, setEmail] = useState("");
  const [minInvest, setminInvest] = useState("");
  const [minInvestValid, setminInvestValid] = useState(false);
  const [maxInvest, setmaxInvest] = useState("");
  const [maxInvestValid, setmaxInvestValid] = useState(false);
  const [interestRate, setinterestRate] = useState("");
  const [interestRateValid, setinterestRateValid] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [condition, setCondition] = useState("");
  const [conditionValid, setConditionValid] = useState(false);

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const userId = await AsyncStorage.getItem("userId");
    setEmail(email);
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const submitData = () => {
    if (
      titleValid &&
      minInvest &&
      maxInvest &&
      interestRate &&
      description &&
      condition
    ) {
      console.log(email);
      fetch(URLs.cn + "/plan/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          email,
          minInvest,
          maxInvest,
          interestRate,
          description,
          condition,
        }),
      }).then((res) => res.json());
      Alert.alert("Investment Plan Created Succesfully");
      props.navigation.navigate("ViewPlan");
    } else {
      Alert.alert("Please fill the required feilds");
    }
  };

  return (
    <View style={styles.root}>
      {!isLoading ? (
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
          <View style={{ marginHorizontal: 15, height: 10 }}>
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
                  value={minInvest}
                  theme={theme}
                  pattern={"[^s]"}
                  onValidation={(isValid) => setminInvestValid(isValid)}
                  keyboardType="number-pad"
                  mode="outlined"
                  onChangeText={(Number) => setminInvest(Number)}
                />
              </View>
              <View style={{ marginHorizontal: 15, height: 10 }}>
                {!minInvestValid ? (
                  <Text style={{ color: "tomato" }}>
                    Minimum Investment is Required
                  </Text>
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
                  value={maxInvest}
                  theme={theme}
                  pattern={"[^s]"}
                  onValidation={(isValid) => setmaxInvestValid(isValid)}
                  keyboardType="number-pad"
                  mode="outlined"
                  onChangeText={(Number) => setmaxInvest(Number)}
                />
              </View>
              <View style={{ marginHorizontal: 15, height: 10 }}>
                {!maxInvestValid ? (
                  <Text style={{ color: "tomato" }}>
                    Maximum Investment is Required
                  </Text>
                ) : (
                  <Text></Text>
                )}
              </View>
            </View>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ width: 210 }}>
              <View>
                <Input
                  style={styles.inputStyles}
                  label="Return"
                  value={interestRate}
                  theme={theme}
                  pattern={"[^s]"}
                  onValidation={(isValid) => setinterestRateValid(isValid)}
                  mode="outlined"
                  onChangeText={(Number) => setinterestRate(Number)}
                />
              </View>
              <View style={{ marginHorizontal: 15, height: 10 }}>
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
              multiline={true}
              numberOfLines={6}
              maxLength={600}
              pattern={"[^s]"}
              onValidation={(isValid) => setDescriptionValid(isValid)}
              onChangeText={(text) => setDescription(text)}
            />
          </View>
          <View style={{ marginHorizontal: 15, height: 10 }}>
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
              multiline={true}
              pattern={"[^s]"}
              onValidation={(isValid) => setConditionValid(isValid)}
              numberOfLines={8}
              maxLength={300}
              onChangeText={(text) => setCondition(text)}
            />
          </View>
          <View style={{ marginHorizontal: 15, height: 10 }}>
            {!conditionValid ? (
              <Text style={{ color: "tomato" }}>
                {" "}
                Terms & Condition is Required
              </Text>
            ) : (
              <Text></Text>
            )}
          </View>

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
              onPress={() => props.navigation.navigate("ViewPlan")}
              style={{
                width: 300,
                padding: 3,
                marginTop: 50,
                marginBottom: 50,
              }}
              color="#0396FF"
              icon="cursor-default-click-outline"
              mode="outlined"
            >
              View Plan
            </Button>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
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

export default CreateInvestment;
