import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Title, Card, Button, Badge } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS, FONTS, icons } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URLs } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import Input from "../components/Input_2";
import IconButton from "../components/IconButton";

const Profile = ({ props, navigation }) => {
  const [Id, setId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
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

  useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const email = await AsyncStorage.getItem("email");
    setEmail(email);
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
        <>
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
              onPress={() => setmodal(true)}
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={modal}
            onRequestClose={() => setmodal(false)}
          >
            <View style={styles.modalview}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    flex: 1,
                    ...FONTS.h3,
                    textAlign: "center",
                  }}
                >
                  Change Your Password
                </Text>
                <IconButton
                  containerStyle={{
                    borderWidth: 2,
                    borderRadius: 10,
                    borderColor: COLORS.gray2,
                  }}
                  icon={icons.cross}
                  iconStyle={{
                    tintColor: COLORS.gray2,
                  }}
                  onPress={() => setmodal(false)}
                />
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
                <TextInput
                  style={{
                    paddingHorizontal: 10,
                    color: COLORS.black,
                    ...FONTS.body3,
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
                    ...FONTS.body3,
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
                  <Text style={{ ...FONTS.body5 }}>Required</Text>
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
                    ...FONTS.body3,
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
                  <Text style={{ ...FONTS.body5 }}>Required</Text>
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
                    borderColor: "#27AE60",
                    justifyContent: "center",
                    backgroundColor: "#27AE60",
                  },
                ]}
                onPress={resetPassword}
              >
                <Text style={{ ...FONTS.body3 }}>Reset</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
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
              </TouchableOpacity> */}
            </View>
          </Modal>
        </>
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
  modalview: {
    position: "absolute",
    bottom: 2,
    paddingBottom: 30,
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
    borderRadius: 15,
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
