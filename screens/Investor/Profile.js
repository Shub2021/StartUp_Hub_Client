import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Title, Card, Button } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CompleteProfile from "./CompleteProfile";
import { URLs } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Input from "../components/Input_2";
import { COLORS } from "../../constants";

const Profile = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [planEmail, setPlanEmail] = useState("");
  const [planExist, setPlanExist] = useState(false);
  const [data, setData] = useState([]);

  const [modal, setmodal] = React.useState(false);
  const [notvisible1, setVisible1] = React.useState(true);
  const [notvisible2, setVisible2] = React.useState(true);
  const [notvisible3, setVisible3] = React.useState(true);
  const [newpass, setNpass] = React.useState("");
  const [newpassvalid, setNpassvalid] = React.useState("");
  const [repass, setRpass] = React.useState("");
  const [repassvalid, setRpassvalid] = React.useState("");
  const [curpass, setCpass] = React.useState("");
  const [email, setEmail] = React.useState("");

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    setEmail(email);
    const userId = await AsyncStorage.getItem("userId");
    fetch(URLs.cn + "/investor/" + email)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      });
    fetch(URLs.cn + "/plan/" + email)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json.length > 0) {
          setPlanExist(true);
        }
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

  const resetPassword = () => {
    if (newpass === repass) {
      fetch(URLs.cn + "/users/reset/" + email, {
        method: "patch",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          curpass,
          newpass,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "Reset successful") {
            console.log(data);
            Alert.alert("Password reset successfull");
          } else {
            Alert.alert("Password reset unsuccessfull");
          }
        });
    } else {
      Alert.alert("New passwords does not match");
    }
  };

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <>
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
                <Image
                  source={require("../../assets/images/startup_logo_cover.png")}
                  style={styles.image}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                  <Title style={styles.title}>{data.cName}</Title>
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
                  <Text style={styles.fieldTitle}>Investmont Filed</Text>
                  <Text style={styles.cardField}>{data.investArea}</Text>
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
                  <Text style={styles.cardField}>{data.cTel}</Text>
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
                  <Text style={styles.cardField}>{planEmail}</Text>
                </View>
              </View>
            </Card>

            {planExist ? (
              <Button
                onPress={() => props.navigation.navigate("ViewPlan", planEmail)}
                style={styles.btn}
                color="#0396FF"
                icon="cursor-default-click-outline"
                mode="contained"
              >
                View Plan
              </Button>
            ) : (
              <Button
                onPress={() =>
                  props.navigation.navigate("CreateInvestment", planEmail)
                }
                style={styles.btn}
                color="#0396FF"
                icon="cursor-default-click-outline"
                mode="contained"
              >
                Create Plan
              </Button>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                marginBottom: 40,
                marginTop: 50,
                marginHorizontal:20
              }}
            >
              <Button
                onPress={logout}
                color="#646dfc"
                icon="logout"
                mode="contained"
              >
                Logout
              </Button>
              
              <Button
               
                onPress={() => props.navigation.navigate("UpdateProfile")}
                color="#a4c8ff"
                icon="autorenew"
                mode="contained"
              >
                Update Profile
              </Button>
            </View>
            <View style={{marginBottom:20, marginHorizontal:50}}>
              <Button
                onPress={() => setmodal(true)}
                color="#0396FF"
                icon="logout"
                mode="outlined"
              >
                Change Password
              </Button>
            </View>
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => setmodal(false)}
          >
            <View style={styles.modalview}>
              <View
                style={[
                  styles.inputContainer,
                  {
                    right: 0,
                    marginHorizontal: 20,
                    borderColor: COLORS.secondary,
                  },
                ]}
              >
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    color: COLORS.black,
                    fontSize: 20,
                  }}
                  placeholder="Current Password"
                  placeholderTextColor={COLORS.primary}
                  value={curpass}
                  secureTextEntry={notvisible1}
                  onChangeText={(text) => setCpass(text)}
                />
                <TouchableOpacity
                  style={{ marginLeft: 270, top: 6, position: "absolute" }}
                  onPress={() => setVisible1(!notvisible1)}
                >
                  {notvisible1 ? (
                    <Icons
                      name="eye-outline"
                      color={COLORS.secondary}
                      size={30}
                    />
                  ) : (
                    <Icons
                      name="eye-off-outline"
                      color={COLORS.green}
                      size={30}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.inputContainer,
                  {
                    right: 0,
                    marginHorizontal: 20,
                    borderColor: COLORS.secondary,
                  },
                ]}
              >
                <Input
                  style={{
                    paddingHorizontal: 10,
                    color: COLORS.black,
                    fontSize: 20,
                  }}
                  placeholder="New Password"
                  placeholderTextColor={COLORS.primary}
                  value={newpass}
                  pattern={"^[a-zA-Z0-9]{8,}$"}
                  onValidation={(isValid) => setNpassvalid(isValid)}
                  secureTextEntry={notvisible2}
                  onChangeText={(text) => setNpass(text)}
                />

                <TouchableOpacity
                  style={{ marginLeft: 270, top: 6, position: "absolute" }}
                  onPress={() => setVisible2(!notvisible2)}
                >
                  {notvisible2 ? (
                    <Icons name="eye-outline" color={COLORS.green} size={30} />
                  ) : (
                    <Icons
                      name="eye-off-outline"
                      color={COLORS.green}
                      size={30}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ marginHorizontal: 40, height: 10 }}>
                {newpass === "" ? (
                  <Text style={{ color: COLORS.red }}>Required</Text>
                ) : !newpassvalid ? (
                  <Text style={{ color: COLORS.red }}>
                    Password must contain at least 8 characters
                  </Text>
                ) : (
                  <Text style={{ color: COLORS.red }}></Text>
                )}
              </View>
              <View
                style={[
                  styles.inputContainer,
                  { right: 0, marginHorizontal: 20, borderColor: COLORS.green },
                ]}
              >
                <Input
                  style={{
                    paddingHorizontal: 10,
                    color: COLORS.black,
                    fontSize: 20,
                  }}
                  placeholder="Re-Enter Password"
                  placeholderTextColor={COLORS.primary}
                  value={repass}
                  pattern={"^[a-zA-Z0-9]{8,}$"}
                  onValidation={(isValid) => setRpassvalid(isValid)}
                  secureTextEntry={notvisible3}
                  onChangeText={(text) => setRpass(text)}
                />
                <TouchableOpacity
                  style={{ marginLeft: 270, top: 6, position: "absolute" }}
                  onPress={() => setVisible3(!notvisible3)}
                >
                  {notvisible3 ? (
                    <Icons
                      name="eye-outline"
                      color={COLORS.secondary}
                      size={30}
                    />
                  ) : (
                    <Icons
                      name="eye-off-outline"
                      color={COLORS.secondary}
                      size={30}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ marginHorizontal: 40, height: 10 }}>
                {repass === "" ? (
                  <Text style={{ color: COLORS.primary }}>Required</Text>
                ) : !repassvalid ? (
                  <Text style={{ color: COLORS.primary }}>
                    Password must contain at least 8 characters
                  </Text>
                ) : (
                  <Text style={{ color: COLORS.primary }}></Text>
                )}
              </View>
              <TouchableOpacity
                style={[
                  styles.inputContainer,
                  styles.buttonview,
                  {
                    right: 0,
                    marginHorizontal: 20,
                    borderColor: COLORS.green,
                    justifyContent: "center",
                    backgroundColor: COLORS.green,
                  },
                ]}
                onPress={resetPassword}
              >
                <Text style={{ color: COLORS.white, fontSize: 20, }}>Reset</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.inputContainer2,
                  {
                    right: 0,
                    marginHorizontal: 20,
                    borderColor: COLORS.darkGreen,
                    justifyContent: "center",
                  },
                ]}
                onPress={() => setmodal(false)}
              >
                <Text style={{ fontSize: 20, color: COLORS.darkGreen }}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </>
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
    marginBottom: 15,
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
    alignItems: "center",
    backgroundColor: "#4447ff",
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    color: "#fff",
    fontSize: 25,
    marginBottom: 30,
    marginLeft: 15,
    marginTop: 20,
    padding: 15,
    textTransform: "uppercase",
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
  modalview: {
    position: "absolute",
    bottom: 2,
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
    backgroundColor: COLORS.transparentBlack7,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    marginTop: 18,
    paddingHorizontal: 20,
    borderColor: COLORS.green,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    right: 85,
    paddingVertical: 2,
    height: 45,
  },
  buttonview: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
});

export default Profile;
