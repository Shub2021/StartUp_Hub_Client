import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";

import { icons, COLORS, SIZES, FONTS, URLs } from "../../constants";

const Item = ({ route, navigation }) => {
  const scrollX = new Animated.Value(0);
  const [product, setProduct] = React.useState(route.params);
  const [product_category, setProduct_category] = React.useState(
    route.params.product_category
  );
  const [br_no, setBr_no] = React.useState(route.params.br_number);

  const [company, setCompany] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(null);
  const [orderItems, setOrderItems] = React.useState([]);

  const [menuItems, setMenuItems] = React.useState([]);
  const [loading, setloading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
    fetchCompanyData();

    setloading(false);
  }, []);

  const fetchData = () => {
    if (product !== null) {
      fetch(URLs.cn + "/product/" + product_category)
        .then((res) => res.json())
        .then((result) => {
          // console.log(result);
          setMenuItems(result);
          //   console.log(menuItems);
        });
    }
  };

  const fetchCompanyData = () => {
    if (product !== null) {
      fetch(URLs.cn + "/company/" + br_no)
        .then((res) => res.json())
        .then((result) => {
          // console.log(result);
          setCompany(result);
        });
      setloading(false);
    }
  };

  function editOrder(action, menuId, price) {
    let orderList = orderItems.slice();

    let item = orderList.filter((a) => a.menuId === menuId);

    if (action === "+") {
      if (item.length > 0) {
        let newQty = item[0].qty + 1;
        item[0].qty = newQty;
        item[0].total = item[0].qty * price;
      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price,
        };
        orderList.push(newItem);
      }
      setOrderItems(orderList);
    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1;
          item[0].qty = newQty;
          item[0].total = newQty * price;
        }
      }

      setOrderItems(orderList);
    }

    // console.log(orderList);
  }

  function getOrderQty(menuId) {
    let orderItem = orderItems.filter((a) => a.menuId == menuId);
    // console.log(orderItem);
    if (orderItem.length > 0) {
      return orderItem[0].qty;
    } else {
      return 0;
    }
  }

  function getBasketItemCount() {
    let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);

    return itemCount;
  }

  function sumOrder() {
    let total = orderItems.reduce((a, b) => a + (b.total || 0), 0);

    return total.toFixed(2);
  }

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
            <Text style={{ ...FONTS.h3 }}>{company?.company_name}</Text>
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
            source={icons.list}
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

  function renderItemInfo() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        {menuItems?.map((item, index) => {
          return (
            <View key={`menu-${index}`} style={{ alignItems: "center" }}>
              <View style={{ height: SIZES.height * 0.35 }}>
                {/* food image */}
                <Image
                  source={{ uri: item.picture }}
                  resizeMode="cover"
                  style={{
                    width: SIZES.width,
                    height: "100%",
                  }}
                />

                {/* quantity */}
                <View
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
                    onPress={() => editOrder("-", item._id, item.unitprice)}
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
                    <Text style={{ ...FONTS.h2 }}>{getOrderQty(item._id)}</Text>
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
                    onPress={() => editOrder("+", item._id, item.unitprice)}
                  >
                    <Text style={{ ...FONTS.body1 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Name and Discription */}
              <View
                style={{
                  width: SIZES.width,
                  alignItems: "center",
                  marginTop: 15,
                  paddingHorizontal: SIZES.padding * 2,
                }}
              >
                <Text
                  style={{
                    marginVertical: 10,
                    textAlign: "center",
                    ...FONTS.h2,
                  }}
                >
                  {item.product_name} - Rs. {item.unitprice.toFixed(2)}
                </Text>
                <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
              </View>

              {/* external data */}

              <TouchableOpacity
                style={{
                  //   width: SIZES.width * 0.9,
                  padding: SIZES.padding,
                  paddingTop: 3,
                  paddingBottom: 3,
                  backgroundColor: COLORS.secondary,
                  alignItems: "center",
                  borderRadius: SIZES.radius * 3,
                  width: 150,
                  marginBottom: 3,
                }}
                onPress={() => navigation.navigate("ItemReviews", product)}
              >
                <Text style={{ color: COLORS.black, ...FONTS.body3 }}>
                  Reviews
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
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
          {menuItems?.map((item, index) => {
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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>
              {getBasketItemCount()} Items in Cart
            </Text>
            <Text style={{ ...FONTS.h3 }}> ${sumOrder()}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.darkgray,
                }}
              />
              <TouchableOpacity
              // onPress={() =>
              //   navigation.navigate("ItemLocation", {
              //     product: product,
              //     currentLocation: currentLocation
              //   })
              // }
              >
                <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
                  Location
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Order button */}
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
                backgroundColor: COLORS.secondary,
                alignItems: "center",
                borderRadius: SIZES.radius,
                marginBottom: SIZES.padding,
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
                Add to cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                borderRadius: SIZES.radius,
              }}
              onPress = {() =>
                  navigation.navigate("ItemLocation", {
                    product: product,
                    currentLocation: currentLocation
                  })
                }
            >
              <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function orderMenuItems() {
    menuItems.map((item, index) => {
      if (item._id == product._id) {
        var temp = menuItems[0];
        menuItems[0] = menuItems[index];
        menuItems[index] = temp;
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {orderMenuItems()}
      {renderItemInfo()}
      {renderOrder()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default Item;
