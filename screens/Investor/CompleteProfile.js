import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";

const CompleteProfile = () => {
  const [bName, setbName] = useState("");
  const [investArea, seInvestArea] = useState("");
  const [bAddress, setbAddress] = useState("");
  const [uNIC, setuNIC] = useState("");
  const [bTelephone, setbTelephone] = useState("");

  return (
    <View style={styles.root}>
      <ScrollView>
        <TextInput
          style={styles.inputStyles}
          label="Business Name"
          value={bName}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setbName(text)}
        />
        <TextInput
          style={styles.inputStyles}
          label="Investment Area"
          value={investArea}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => seInvestArea(text)}
        />
        <TextInput
          style={styles.inputStyles}
          label="Business Address"
          value={bAddress}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setbAddress(text)}
        />
        <TextInput
          style={styles.inputStyles}
          label="Investor NIC"
          value={uNIC}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setuNIC(text)}
        />

        <TextInput
          style={styles.inputStyles}
          label="Business Telephone"
          value={bTelephone}
          theme={theme}
          mode="outlined"
          onChangeText={(text) => setbTelephone(text)}
        />

        <View>
          <Button
            // onPress={() => navigation.navigate("ViewPlan")}
            style={{ margin: 50 }}
            color="#79c7ff"
            icon="content-save-outline"
            mode="contained"
            // onPress={() => navigation.navigate("ViewPlan")}
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
  },
  inputStyles: {
    margin: 10,
    fontSize: 17,
    fontWeight: "300",
  },
});

export default CompleteProfile;
