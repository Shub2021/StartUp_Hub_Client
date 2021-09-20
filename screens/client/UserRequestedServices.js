import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  Alert,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  Animated,
  ScrollView,
} from "react-native";
import { COLORS, FONTS, icons, SIZES, URLs } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "react-native-paper";
import IconButton from "../components/IconButton";
import { Fontisto } from "@expo/vector-icons";

const listTabs = [
  {
    id: 1,
    status: "Requested",
  },
  {
    id: 2,
    status: "Processing",
  },
  {
    id: 3,
    status: "Completed",
  },
];

const UserRequestedServices = ({ navigation }) => {
  const [status, setStatus] = React.useState("Requested");
  const [email, setEmail] = React.useState(null);
  const [services, setServices] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [addComment, setaddComment] = React.useState("");
  const [brNumber, setBrNumber] = React.useState("");
  const [serviceId, setServiceId] = React.useState("");
  const [showFilterModel, setShowFilterModel] = React.useState(false);
  const [serviceSelected, setServiceSelected] = React.useState("");
  const [selectedServiceTasks, setSelectedServiceTasks] = React.useState("");
  const modelAnimatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    const useremail = await AsyncStorage.getItem("email");
    setEmail(useremail);
    setDatatoState(useremail);
  };

  const setDatatoState = (userEmail) => {
    fetch(URLs.cn + "/jobs/userservices/" + userEmail)
      .then((res) => res.json())
      .then((result) => {
        setServices(result);
        setIsLoading(false);
      });
  };

  const toggleModal = (br_number, serviceid) => {
    setBrNumber(br_number);
    setServiceId(serviceid);
    setModalVisible(!isModalVisible);
  };

  const cancleService = (jobId) => {
    fetch(URLs.cn + "/jobs/" + jobId, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {
        setDatatoState(email);
      });
  };

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          marginBottom: SIZES.padding2 * 2,
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: SIZES.padding,
          }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              backgroundColor: COLORS.lightGray3,
              alignItems: "center",
              borderRadius: SIZES.radius,
              paddingVertical: SIZES.padding,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>Accepted Services</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderTabs() {
    return (
      <View
        style={{
          //   padding: 15,
          flexDirection: "row",
          alignSelf: "center",
          marginBottom: 20,
        }}
      >
        {listTabs.map((e) => (
          <TouchableOpacity
            style={{
              width: SIZES.width / 3.5,
              flexDirection: "row",
              borderWidth: 0.5,
              borderColor: e?.status == status ? COLORS.primary : COLORS.white,
              backgroundColor:
                e?.status == status ? COLORS.primary : COLORS.white,
              padding: 10,
              justifyContent: "center",
            }}
            onPress={() => setStatus(e.status)}
            key={e.id}
          >
            <Text
              style={{
                ...FONTS.body3,
                color: e?.status == status ? COLORS.white : COLORS.black,
              }}
            >
              {e.status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  const FilterModel = () => {
    if (showFilterModel) {
      Animated.timing(modelAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modelAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
    let x = 0;
    if (selectedServiceTasks.length == 1) {
      x = 1.5;
    } else {
      x = selectedServiceTasks.length;
    }

    const modelY = modelAnimatedValue.interpolate({
      inputRange: [-1, 1],
      //change popup height
      outputRange: [SIZES.height, SIZES.height - x * 100],
    });

    function renderTasks() {
      console.log(selectedServiceTasks);
      const renderItem = ({ item }) => (
        <View
          style={{
            backgroundColor: COLORS.secondary,
            padding: 13,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                backgroundColor: "#55BCF6",
                opacity: 0.4,
                borderRadius: 5,
                marginRight: 15,
              }}
            ></View>
            <Text style={{ ...FONTS.body4, maxWidth: "80%" }}>{item.task}</Text>
          </View>
          <View
            style={{
              width: 18,
              height: 18,
              borderColor: "#55BCF6",
              borderWidth: 2,
              borderRadius: 5,
            }}
          >
            {item.completed ? (
              <Image
                source={icons.check}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: "#27AE60",
                  // marginRight: 10,
                }}
              />
            ) : (
              <View></View>
            )}
          </View>
        </View>
      );

      return (
        <FlatList
          data={selectedServiceTasks}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingHorizontal: SIZES.padding * 2,
            paddingBottom: 30,
          }}
        />
      );
    }

    return (
      <Modal animationType="fade" transparent={true} visible={showFilterModel}>
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.transparentBlack7,
          }}
        >
          {/* Transparent */}
          <TouchableWithoutFeedback onPress={() => setShowFilterModel(false)}>
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            ></View>
          </TouchableWithoutFeedback>

          <Animated.View
            style={{
              position: "absolute",
              left: 0,
              top: modelY,
              width: "100%",
              height: "100%",
              padding: SIZES.padding * 2,
              borderTopRightRadius: SIZES.padding * 2,
              borderTopLeftRadius: SIZES.padding * 2,
              backgroundColor: "#E8EAED",
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  ...FONTS.h3,
                  textAlign: "center",
                }}
              >
                Service Tasks
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
                onPress={() => setShowFilterModel(false)}
              />
            </View>
            <View
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 250,
              }}
            >
              {/* content */}
              {renderTasks()}
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  };

  const getDatatoRenderTasks = (jobID) => {
    let servisSelected = services.filter((a) => a._id === jobID);

    setServiceSelected(servisSelected[0]);
    setSelectedServiceTasks(servisSelected[0].taskarray);
    setShowFilterModel(true);
    FilterModel(showFilterModel);
  };

  const createTwoButtonAlert = (jobID) =>
    Alert.alert(
      "Cancle Service Request",
      "Do you want to remove the Service Request?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => cancleService(jobID) },
      ],
      { cancelable: false }
    );

  const renderList1 = (item) => {
    const id = item._id.slice(18, 23);
    if (item.job_status === "placed") {
      return (
        <Card style={styles.profileCard}>
          <View>
            <TouchableOpacity
              style={{
                borderRadius: SIZES.radius * 0.5,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding * 2,
                backgroundColor: COLORS.lightGray3,
                height: 150,
              }}
              // onPress={() => showAlert1(item)}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.h3, color: COLORS.black }}>
                  Request #{id}
                </Text>
                {/* <Icons
                  name="eye"
                  color={COLORS.secondary}
                  size={28}
                  // onPress={() => showAlert4(item)}
                /> */}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>{item.service_name}</Text>
                <Text style={{ ...FONTS.body3 }}>{item.package_name}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Total</Text>
                <Text style={{ ...FONTS.body3 }}>LKR {item.price}.00</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              //   width: SIZES.width * 0.9,
              position: "absolute",
              bottom: 5,
              right: 5,
              padding: SIZES.padding * 0.5,
              paddingTop: 3,
              paddingBottom: 3,
              backgroundColor: "#FFA133",
              alignItems: "center",
              borderRadius: SIZES.radius * 3,
              width: 100,
              marginBottom: 3,
            }}
            onPress={() => {
              toggleModal(item.br_number, item.serviceid);
            }}
          >
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              //   width: SIZES.width * 0.9,
              position: "absolute",
              bottom: 5,
              right: 115,
              padding: SIZES.padding * 0.5,
              paddingTop: 3,
              paddingBottom: 3,
              backgroundColor: "#FE2020",
              alignItems: "center",
              borderRadius: SIZES.radius * 3,
              width: 100,
              marginBottom: 3,
            }}
            onPress={() => {
              createTwoButtonAlert(item._id);
            }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>Cancle</Text>
          </TouchableOpacity>
        </Card>
      );
    }
  };

  const renderList2 = (item) => {
    const id = item._id.slice(18, 23);
    if (item.job_status === "Processing") {
      return (
        <Card style={styles.profileCard}>
          <View>
            <TouchableOpacity
              style={{
                borderRadius: SIZES.radius * 0.5,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding * 2,
                backgroundColor: COLORS.lightGray3,
                height: 150,
              }}
              // onPress={() => showAlert2(item)}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.h3 }}>Request #{id}</Text>
                {/* <Icons
                  name="eye"
                  color={COLORS.secondary}
                  size={28}
                  // onPress={() => showAlert4(item)}
                /> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>{item.service_name}</Text>
                <Text style={{ ...FONTS.body3 }}>{item.package_name}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Total</Text>
                <Text style={{ ...FONTS.body3 }}>LKR {item.price}.00</Text>
              </View>
              <TouchableOpacity
                style={{
                  //   width: SIZES.width * 0.9,
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  padding: SIZES.padding * 0.5,
                  paddingTop: 3,
                  paddingBottom: 3,
                  backgroundColor: "#FFA133",
                  alignItems: "center",
                  borderRadius: SIZES.radius * 3,
                  width: 100,
                  marginBottom: 3,
                }}
                onPress={() => {
                  toggleModal(item.br_number, item.serviceid);
                }}
              >
                <Text style={{ color: COLORS.black, ...FONTS.body3 }}>
                  Report
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  //   width: SIZES.width * 0.9,
                  position: "absolute",
                  bottom: 5,
                  right: 115,
                  padding: SIZES.padding * 0.5,
                  paddingTop: 3,
                  paddingBottom: 3,
                  backgroundColor: "#27AE60",
                  alignItems: "center",
                  borderRadius: SIZES.radius * 3,
                  width: 100,
                  marginBottom: 3,
                }}
                onPress={() => getDatatoRenderTasks(item._id)}
              >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                  View Tasks
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </Card>
      );
    }
  };
  const renderList3 = (item) => {
    const id = item._id.slice(18, 23);
    if (item.job_status === "completed") {
      return (
        <Card style={styles.profileCard}>
          <View>
            <TouchableOpacity
              style={{
                borderRadius: SIZES.radius * 0.5,
                paddingHorizontal: SIZES.padding,
                paddingVertical: SIZES.padding * 2,
                backgroundColor: COLORS.lightGray3,
                height: 150,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ ...FONTS.h3 }}>Request #{id}</Text>
                {/* <Icons
              name="eye"
              color={COLORS.secondary}
              size={28}
              // onPress={() => showAlert4(item)}
            /> */}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>{item.service_name}</Text>
                <Text style={{ ...FONTS.body3 }}>{item.package_name}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Total</Text>
                <Text style={{ ...FONTS.body3 }}>LKR {item.price}.00</Text>
              </View>
              <TouchableOpacity
                style={{
                  //   width: SIZES.width * 0.9,
                  position: "absolute",
                  bottom: 5,
                  right: 5,
                  padding: SIZES.padding * 0.5,
                  paddingTop: 3,
                  paddingBottom: 3,
                  backgroundColor: "#FFA133",
                  alignItems: "center",
                  borderRadius: SIZES.radius * 3,
                  width: 100,
                  marginBottom: 3,
                }}
                onPress={() => {
                  toggleModal(item.br_number, item.serviceid);
                }}
              >
                <Text style={{ color: COLORS.black, ...FONTS.body3 }}>
                  Report
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  //   width: SIZES.width * 0.9,
                  position: "absolute",
                  bottom: 5,
                  right: 115,
                  padding: SIZES.padding * 0.5,
                  paddingTop: 3,
                  paddingBottom: 3,
                  backgroundColor: "#27AE60",
                  alignItems: "center",
                  borderRadius: SIZES.radius * 3,
                  width: 100,
                  marginBottom: 3,
                }}
                onPress={() => getDatatoRenderTasks(item._id)}
              >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                  View Tasks
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </Card>
      );
    }
  };

  function renderServices() {
    return (
      <View>
        {status === "Requested" ? (
          <View>
            {/* Requested services */}
            <FlatList
              style={{
                paddingBottom: SIZES.padding2 * 2,
                marginTop: SIZES.radius * 0.5,
                marginBottom: SIZES.radius * 5,
                paddingHorizontal: SIZES.padding2,
              }}
              data={services}
              renderItem={({ item }) => {
                return renderList1(item);
              }}
              keyExtractor={(item) => item._id.toString()}
              onRefresh={() => setDatatoState(email)}
              refreshing={isLoading}
            />
          </View>
        ) : status === "Processing" ? (
          <View>
            {/* Processing services */}
            <FlatList
              style={{
                paddingBottom: SIZES.padding2 * 2,
                marginTop: SIZES.radius * 0.5,
                marginBottom: SIZES.radius * 5,
                paddingHorizontal: SIZES.padding2,
              }}
              data={services}
              renderItem={({ item }) => {
                return renderList2(item);
              }}
              keyExtractor={(item) => item._id.toString()}
              onRefresh={() => setDatatoState(email)}
              refreshing={isLoading}
            />
          </View>
        ) : (
          <View>
            {/* Completed services */}
            <FlatList
              style={{
                paddingBottom: SIZES.padding2 * 2,
                marginTop: SIZES.radius * 0.5,
                marginBottom: SIZES.radius * 5,
                paddingHorizontal: SIZES.padding2,
              }}
              data={services}
              renderItem={({ item }) => {
                return renderList3(item);
              }}
              keyExtractor={(item) => item._id.toString()}
              onRefresh={() => setDatatoState(email)}
              refreshing={isLoading}
            />
          </View>
        )}
      </View>
    );
  }

  function reportService() {
    if (addComment == "") {
      Alert.alert("Fill the comment first!");
    } else {
      let placed_date = new Date();
      fetch(URLs.cn + "/complains", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_email: email,
          br_number: brNumber,
          item_id: serviceId,
          description: addComment,
          placed_date: new Date(),
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Report Successful");
          toggleModal(brNumber, serviceId);
          setaddComment("");
        });
    }
  }

  function popupReview() {
    return (
      <View style={{ flex: 1 }}>
        <Modal animationType="fade" transparent={true} visible={isModalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.transparentBlack7,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: SIZES.width,
                // backgroundColor: "red",
                padding: SIZES.padding * 2,
              }}
            >
              <Text style={{ ...FONTS.h3, marginBottom: SIZES.padding }}>
                Report the Service Request
              </Text>

              <View style={styles.separator} />
              <Text style={{ ...FONTS.h3, marginBottom: SIZES.padding }}>
                Add your comment
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={{
                  height: 100,
                  width: "100%",
                  borderColor: COLORS.lightGray,
                  borderWidth: 4,
                  marginBottom: SIZES.padding,
                  textAlign: "center",
                  ...FONTS.body3,
                }}
                // onChangeText="Enter the comment"
                // value="Enter the comment"
                onChangeText={setaddComment}
              />
              <TouchableOpacity
                style={{
                  width: SIZES.width * 0.9,
                  marginBottom: SIZES.padding,
                  padding: SIZES.padding,
                  backgroundColor: COLORS.primary,
                  borderRadius: SIZES.radius,
                  alignItems: "center",
                }}
                onPress={() => reportService()}
              >
                <Text style={{ ...FONTS.body3 }}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: SIZES.width * 0.9,
                  marginBottom: SIZES.padding,
                  padding: SIZES.padding,
                  backgroundColor: COLORS.secondary,
                  borderRadius: SIZES.radius,
                  alignItems: "center",
                }}
                onPress={() => toggleModal(brNumber, serviceId)}
              >
                <Text style={{ ...FONTS.body3 }}>Cancle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTabs()}
      {renderServices()}
      {popupReview()}
      {showFilterModel && FilterModel()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
  profileCard: {
    padding: 5,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: COLORS.lightGray3,
  },
});

export default UserRequestedServices;
