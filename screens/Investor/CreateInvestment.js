import React, { useState } from "react";
import { StyleSheet, Text, Picker, View } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";

const CreateInvestment = (props) => {
  const [selectedValue, setSelectedValue] = useState("Annual");
  const [title, setTitle] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [condition, setCondition] = useState("");

  const submitData = () => {
    fetch(" https://5c357aafcce4.ngrok.io/send", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        email,
        description,
        condition,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.inputStyles}
        label="Title"
        value={title}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setTitle()}
      />

      <TextInput
        style={styles.inputStyles}
        label="Contact Number"
        value={contact}
        theme={theme}
        keyboardType="number-pad"
        mode="outlined"
        onChangeText={(Number) => setContact()}
      />
      <TextInput
        style={styles.inputStyles}
        label="E-mail"
        value={email}
        theme={theme}
        mode="outlined"
        onChangeText={(text) => setEmail()}
      />

      <Text style={styles.inputStyles}>Period of Calculation interest</Text>
      <Card style={{ margin: 10 }}>
        <View style={styles.card}>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 30, width: 200 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Annual" value="annual" />
            <Picker.Item label="Monthly" value="monthly" />
          </Picker>

          {/* </View> */}
        </View>
      </Card>

      <TextInput
        style={{ margin: 10 }}
        label="Description"
        value={description}
        theme={theme}
        mode="outlined"
        multiline={true}
        // numberOfLines={6}
        // maxLength={600}
        onChangeText={(text) => setDescription()}
      />

      <TextInput
        style={{ margin: 10 }}
        label="Terms and Conditions"
        value={condition}
        theme={theme}
        mode="outlined"
        multiline={true}
        // numberOfLines={4}
        // maxLength={300}
        onChangeText={(text) => setCondition()}
      />

      <View style={{ alignItems: "center", marginTop: 30 }}>
        <Button
          // onPress={()=>props.navigation.navigate('CreateInvestment')}
          style={{ backgroundColor: "#0396FF", width: 200, padding: 3 }}
          icon=""
          mode="contained"
          onPress={() => submitData()}
        >
          Publish
        </Button>
        <Button
          onPress={() => props.navigation.navigate("ViewPlan")}
          style={{ width: 300, padding: 3, marginTop: 50 }}
          color="#0396FF"
          icon="cursor-default-click-outline"
          mode="outlined"
        >
          View Plan
        </Button>
      </View>
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
