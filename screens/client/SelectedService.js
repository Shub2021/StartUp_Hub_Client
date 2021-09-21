import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { isIphoneX } from "react-native-iphone-x-helper";

import { icons, COLORS, SIZES, FONTS, URLs } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SelectetService = ({ route, navigation }) => {
  const scrollX = new Animated.Value(0);
  const [service, setservice] = React.useState(route.params.item);
  const [company, setcompany] = React.useState("");
  const [companyName, setCompanyName] = React.useState("");
  const [currentLocation, setCurrentLocation] = React.useState(
    route.params.currentLocation
  );
  const [orderItems, setOrderItems] = React.useState([]);
  const [isLoading, setisloading] = React.useState(true);
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [addComment, setaddComment] = React.useState("");
  const [userEmail, setUserEmail] = React.useState(null);
  const [selectedPackage, setSelectedPackage] = React.useState(0);
  const [currentPackage, setCurrentPackage] = React.useState(null);
  const [screenNo, setScreenNo] = React.useState(0);

  useEffect(() => {
    fetchData();
    getData();
  }, []);

  const fetchData = () => {
    fetch(URLs.cn + "/company/" + service.br_number)
      .then((res) => res.json())
      .then((result) => {
        setcompany(result);
        setCompanyName(result.company_name);
      });

    setisloading(false);
  };

  const getData = async () => {
    const userEmail = await AsyncStorage.getItem("email");
    setUserEmail(userEmail);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const submitServiceReq = () => {
    console.log(screenNo);
    if (addComment == "") {
      Alert.alert("Add your Requirments First!");
    } else {
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
      const paymentDate = year + "-" + month + "-" + newdate;
      console.log("userEmail : " + userEmail);
      fetch(URLs.cn + "/jobs/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: paymentDate,
          description: addComment,
          serviceid: service._id,
          client_email: userEmail,
          br_number: service.br_number,
          job_status: "placed",
          service_name: service.service_name,
          package_id: service.package[screenNo]._id,
          price: service.package[screenNo].price,
          package_name: service.package[screenNo].Package_type,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          alert("Service Requested successfully");
          console.log("Service Requested successfully");
        })
        .then((result) => {
          toggleModal();
        });

      toggleModal;
    }
  };

  function renderHeader() {
    return (
      <View style={{ flexDirection: "row" }}>
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

        {/*  Name Section */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              height: 50,
              alignItems: "center",
              justifyContent: "center",
              paddingHorizontal: SIZES.padding * 3,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.lightGray3,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>{companyName}</Text>
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
            source={icons.list}
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

  const handleScroll = (event) => {
    const positionX = event.nativeEvent.contentOffset.x / SIZES.width;
    const screen = Math.round(positionX);
    if (screen !== screenNo) {
      setScreenNo(screen);
    }
  };

  function renderServiceInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false, listener: (event) => handleScroll(event) }
        )}
      >
        {service?.package.map((item, index) => (
          <View key={`menu-${index}`} style={{ alignItems: "center" }}>
            <View style={{ height: SIZES.height * 0.35 }}>
              {/* Food Image */}
              <Image
                source={{ uri: service.picture }}
                resizeMode="cover"
                style={{
                  width: SIZES.width,
                  height: "100%",
                }}
              />

              {/* Quantity */}
              {/* <View
                style={{
                  position: "absolute",
                  bottom: -20,
                  width: SIZES.width,
                  height: 50,
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopLeftRadius: 25,
                    borderBottomLeftRadius: 25,
                  }}
                  onPress={() => editOrder("-", item.menuId, item.price)}
                >
                  <Text style={{ ...FONTS.body1 }}>-</Text>
                </TouchableOpacity>

                <View
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ ...FONTS.h2 }}>
                    {getOrderQty(item.menuId)}
                  </Text>
                </View>

                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopRightRadius: 25,
                    borderBottomRightRadius: 25,
                  }}
                  onPress={() => editOrder("+", item.menuId, item.price)}
                >
                  <Text style={{ ...FONTS.body1 }}>+</Text>
                </TouchableOpacity>
              </View> */}
            </View>

            {/* Name & Description */}
            <View
              style={{
                width: SIZES.width,
                alignItems: "center",
                marginTop: 15,
                paddingHorizontal: SIZES.padding * 2,
              }}
            >
              <Text
                style={{ marginVertical: 10, textAlign: "center", ...FONTS.h2 }}
              >
                {item.Package_type} - {item.price.toFixed(2)}
              </Text>
              <Text style={{ ...FONTS.body3 }}>{item.pk_discription}</Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={{ height: 30 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: SIZES.padding,
          }}
        >
          {service?.package.map((item, index) => {
            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp",
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor,
                }}
              />
            );
          })}
        </View>
      </View>
    );
  }

  function renderOrder() {
    return (
      <View>
        {renderDots()}
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}
        >
          {/* Order Button */}
          <View
            style={{
              padding: SIZES.padding * 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                borderRadius: SIZES.radius,
              }}
              onPress={toggleModal}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Request</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isIphoneX() && (
          <View
            style={{
              position: "absolute",
              bottom: -34,
              left: 0,
              right: 0,
              height: 34,
              backgroundColor: COLORS.white,
            }}
          ></View>
        )}
      </View>
    );
  }

  function popupReview() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Button title="Show modal" onPress={toggleModal} /> */}

        <Modal isVisible={isModalVisible}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: SIZES.width,
                // backgroundColor: "red",
                padding: SIZES.padding * 2,
                backgroundColor: COLORS.black,
              }}
            >
              <Text style={{ ...FONTS.h3, marginBottom: SIZES.padding }}>
                Service Request
              </Text>

              <Text style={{ ...FONTS.h3, marginBottom: SIZES.padding }}>
                Add your requirments
              </Text>
              <TextInput
                multiline={true}
                numberOfLines={4}
                style={{
                  height: 100,
                  width: "100%",
                  borderColor: COLORS.white,
                  borderWidth: 4,
                  marginBottom: SIZES.padding,
                  textAlign: "center",
                  ...FONTS.body3,
                }}
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
                onPress={submitServiceReq}
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
                onPress={toggleModal}
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
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {renderHeader()}
          {renderServiceInfo()}
          {renderOrder()}
          {popupReview()}
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default SelectetService;
