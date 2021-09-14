import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
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

const UserOrders = ({navigation}) => {
  const [status, setStatus] = React.useState("Ordered");
  const [email, setEmail] = React.useState(null);
  const [orders, setOrders] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [addComment, setaddComment] = React.useState("");
  const [brNumber, setBrNumber] = React.useState("");
  const [productId, setProductId] = React.useState("");

  React.useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    const useremail = await AsyncStorage.getItem("email");
    setEmail(useremail);
    setDatatoState(useremail);
  };

  const setDatatoState = (userEmail) => {
    fetch(URLs.cn + "/order/userorders/" + userEmail)
      .then((res) => res.json())
      .then((result) => {
        setOrders(result);
        setIsLoading(false);
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

  const toggleModal = (br_number, product_id) => {
    setBrNumber(br_number);
    setProductId(product_id);
    setModalVisible(!isModalVisible);
  };

  function reportOrder() {
    let placed_date = new Date();
    fetch(URLs.cn + "/complains", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_email: email,
        br_number: brNumber,
        item_id: productId,
        description: addComment,
        placed_date: new Date(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Report Successful");
        toggleModal(brNumber, productId);
      });
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

  const renderList1 = (item) => {
    const id = item._id.slice(18, 23);
    if (item.order_status === "placed") {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.padding * 2,
            backgroundColor: COLORS.gray3,
            height: 150,
          }}
          // onPress={() => showAlert1(item)}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ ...FONTS.body2, color: COLORS.white }}>
              Order #{id}
            </Text>
            <Icons
              name="eye"
              color={COLORS.secondary}
              size={28}
              // onPress={() => showAlert4(item)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.product_name}
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.quantity}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Total</Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              LKR {item.total}.00
            </Text>
          </View>
          <TouchableOpacity
            style={{
              //   width: SIZES.width * 0.9,
              position: "absolute",
              bottom: 5,
              right: 55,
              padding: SIZES.padding,
              paddingTop: 3,
              paddingBottom: 3,
              backgroundColor: COLORS.primary,
              alignItems: "center",
              borderRadius: SIZES.radius * 3,
              width: 150,
              marginBottom: 3,
            }}
            onPress={() => {
              toggleModal(item.br_number, item.product_id);
            }}
          >
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Report</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
  };

  const renderList2 = (item) => {
    const id = item._id.slice(18, 23);
    if (item.order_status === "processing") {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.gray3,
          }}
          // onPress={() => showAlert2(item)}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: COLORS.secondary, fontSize: 24 }}>
              Order #{id}
            </Text>
            <Icons
              name="eye"
              color={COLORS.secondary}
              size={28}
              // onPress={() => showAlert4(item)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.product_name}
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.quantity}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Total</Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              LKR {item.total}.00
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const renderList3 = (item) => {
    const id = item._id.slice(18, 23);
    if (item.order_status === "completed") {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.gray3,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: COLORS.secondary, fontSize: 24 }}>
              Order #{id}
            </Text>
            <Icons
              name="eye"
              color={COLORS.secondary}
              size={28}
              // onPress={() => showAlert4(item)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.product_name}
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.quantity}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Total</Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              LKR {item.total}.00
            </Text>
          </View>
        </TouchableOpacity>
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
                marginTop: SIZES.radius,
                marginBottom: SIZES.radius * 5,
                paddingHorizontal: SIZES.radius,
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
                marginTop: SIZES.radius,
                paddingHorizontal: SIZES.radius,
                marginBottom: SIZES.radius * 5,
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
                marginTop: SIZES.radius,
                marginBottom: SIZES.radius * 5,
                paddingHorizontal: SIZES.radius,
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
});

export default UserOrders;
