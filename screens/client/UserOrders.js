import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, FONTS, icons, SIZES, URLs } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { Card } from "react-native-paper";

const listTabs = [
  {
    id: 1,
    status: "Ordered",
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

const UserOrders = ({ navigation }) => {
  const [status, setStatus] = React.useState("Ordered");
  const [email, setEmail] = React.useState(null);
  const [orders, setOrders] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [addComment, setaddComment] = React.useState("");
  const [brNumber, setBrNumber] = React.useState("");
  const [productId, setProductId] = React.useState("");
  const [selectedOrderCompany, setSelectedOrderCompany] = React.useState("");

  React.useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    const useremail = await AsyncStorage.getItem("email");
    setEmail(useremail);
    setDatatoState(useremail);
  };

  const initialCurrentLocation = {
    streetName: "Colombo",
    gps: {
      latitude: 6.927079,
      longitude: 79.861244,
    },
  };

  const setDatatoState = (userEmail) => {
    fetch(URLs.cn + "/order/userorders/" + userEmail)
      .then((res) => res.json())
      .then((result) => {
        setOrders(result);
        setIsLoading(false);
      });
  };

  const cancleOrder = (orderID) => {
    fetch(URLs.cn + "/order/" + orderID, {
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
            <Text style={{ ...FONTS.h3 }}>Ordered Products</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          {/* <Image
            source={icons.basket}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          /> */}
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

  const toggleModal = (br_number, product_id) => {
    setBrNumber(br_number);
    setProductId(product_id);
    setModalVisible(!isModalVisible);
  };

  function reportOrder() {
    let d = new Date();
    let newdate = d.getDate();
    let month = d.getMonth() + 1;
    if (newdate < 10) {
      newdate = "0" + newdate;
    }
    if (month < 10) {
      month = "0" + month;
    }
    const year = d.getFullYear();
    const reportDate = year + "-" + month + "-" + newdate;
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
          item_id: productId,
          description: addComment,
          placed_date: reportDate,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert("Report Successful");
          toggleModal(brNumber, productId);
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
                Report the Order
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
                onPress={() => reportOrder()}
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
                onPress={() => toggleModal(brNumber, productId)}
              >
                <Text style={{ ...FONTS.body3 }}>Cancle</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  const createTwoButtonAlert = (orderID) =>
    Alert.alert(
      "Cancle Order",
      "Do you want to cancle the Order?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => cancleOrder(orderID) },
      ],
      { cancelable: false }
    );

  function getCompany(comp_br_number) {
    fetch(URLs.cn + "/company/" + comp_br_number)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.location.lat == null) {
          Alert.alert("Company Location hasn't updated");
        } else {
          navigation.navigate("ItemLocation", {
            product: result.location,
            currentLocation: initialCurrentLocation,
            company: result,
          });
        }
      });
  }

  const renderList1 = (item) => {
    const id = item._id.slice(18, 23);
    // let company = getCompany(item.br_number);

    if (item.order_status === "placed") {
      return (
        <Card style={styles.profileCard}>
          <View style={styles.cardIcon}>
            <TouchableOpacity
              style={{
                // marginBottom: SIZES.radius,
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
                  Order #{id}
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
                <Text style={{ ...FONTS.body3 }}>{item.product_name}</Text>
                <Text style={{ ...FONTS.body3 }}>{item.quantity}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Total</Text>
                <Text style={{ ...FONTS.body3 }}>LKR {item.total}.00</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Requested date</Text>
                <Text style={{ ...FONTS.body3 }}>{item.req_date}</Text>
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
                  toggleModal(item.br_number, item.product_id);
                }}
              >
                <Text style={{ color: COLORS.black, ...FONTS.body3 }}>
                  Report
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </Card>
      );
    }
  };

  const renderList2 = (item) => {
    const id = item._id.slice(18, 23);
    if (item.order_status === "processing") {
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
                <Text style={{ ...FONTS.h3 }}>Order #{id}</Text>
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
                <Text style={{ ...FONTS.body3 }}>{item.product_name}</Text>
                <Text style={{ ...FONTS.body3 }}>{item.quantity}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Total</Text>
                <Text style={{ ...FONTS.body3 }}>LKR {item.total}.00</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Requested date</Text>
                <Text style={{ ...FONTS.body3 }}>{item.req_date}</Text>
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
                  toggleModal(item.br_number, item.product_id);
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
                  backgroundColor: "dodgerblue",
                  alignItems: "center",
                  borderRadius: SIZES.radius * 3,
                  width: 100,
                  marginBottom: 3,
                }}
                onPress={() => {
                  getCompany(item.br_number);
                }}
              >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                  Location
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
    if (item.order_status === "completed") {
      // let reqDate = item.req_date;
      // console.log(reqDate.slice(0, 5));

      // // let serReqDate = new Date(item.req_date);
      // // let viewReportOption = true;
      // // let date = serReqDate.getDate();
      // // let month = serReqDate.getMonth();

      // // if (new Date().getFullYear() - serReqDate.getFullYear() > 1) {
      // //   viewReportOption = false;
      // // } else {
      // //   if (new Date().getMonth() - month < 1) {
      // //     viewReportOption = true;
      // //   } else if (new Date().getMonth() - month == 1) {
      // //     if (new Date().getDate() - date > 0) {
      // //       viewReportOption = false;
      // //     }
      // //   } else {
      // //     viewReportOption = false;
      // //   }
      // // }
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
                <Text style={{ ...FONTS.h3 }}>Order #{id}</Text>
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
                <Text style={{ ...FONTS.body3 }}>{item.product_name}</Text>
                <Text style={{ ...FONTS.body3 }}>{item.quantity}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Total</Text>
                <Text style={{ ...FONTS.body3 }}>LKR {item.total}.00</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 5,
                }}
              >
                <Text style={{ ...FONTS.body3 }}>Requested date</Text>
                <Text style={{ ...FONTS.body3 }}>{item.req_date}</Text>
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
                  toggleModal(item.br_number, item.product_id);
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
                  backgroundColor: "dodgerblue",
                  alignItems: "center",
                  borderRadius: SIZES.radius * 3,
                  width: 100,
                  marginBottom: 3,
                }}
                onPress={() => {
                  getCompany(item.br_number);
                }}
              >
                <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
                  Location
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </Card>
      );
    }
  };

  function renderOrders() {
    return (
      <View>
        {status === "Ordered" ? (
          <View>
            {/* Placed Orders */}
            <FlatList
              style={{
                paddingBottom: SIZES.padding2 * 2,
                marginTop: SIZES.radius * 0.5,
                marginBottom: SIZES.radius * 5,
                paddingHorizontal: SIZES.padding2,
              }}
              data={orders}
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
            {/* Processing Orders */}
            <FlatList
              style={{
                paddingBottom: SIZES.padding2 * 2,
                marginTop: SIZES.radius * 0.5,
                marginBottom: SIZES.radius * 5,
                paddingHorizontal: SIZES.padding2,
              }}
              data={orders}
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
            {/* Completed Orders */}
            <FlatList
              style={{
                paddingBottom: SIZES.padding2 * 2,
                marginTop: SIZES.radius * 0.5,
                marginBottom: SIZES.radius * 5,
                paddingHorizontal: SIZES.padding2,
              }}
              data={orders}
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

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTabs()}
      {renderOrders()}
      {popupReview()}
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
    marginBottom: 5,
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
  cardIcon: {
    // flexDirection: "row",
  },
});

export default UserOrders;
