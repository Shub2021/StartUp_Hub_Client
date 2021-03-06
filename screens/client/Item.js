import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Alert,
  ActivityIndicator,
} from "react-native";

// import PayHere from "@payhere/payhere-mobilesdk-reactnative";

import { icons, COLORS, SIZES, FONTS, URLs } from "../../constants";

const Item = ({ route, navigation }) => {
  const scrollX = new Animated.Value(0);
  const [product, setProduct] = React.useState(route.params);
  const [product_category, setProduct_category] = React.useState(
    route.params.product_category
  );
  const [br_no, setBr_no] = React.useState(route.params.br_number);

  const [company, setCompany] = React.useState(null);
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation
  );
  const [cart, setCart] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [orderItems, setOrderItems] = React.useState([]);
  const [cartArrayToUpdate, setCartArrayToUpdate] = React.useState([]);

  const [menuItems, setMenuItems] = React.useState([]);
  const [loading, setloading] = React.useState(true);
  const [totalPrice, setTotalPrice] = React.useState(0.0);

  let total;

  React.useEffect(() => {
    fetchData();
    fetchCompanyData();
    getData();
    setCurrentLocation(initialCurrentLocation);
  }, []);

  const initialCurrentLocation = {
    streetName: "Colombo",
    gps: {
      latitude: 6.927079,
      longitude: 79.861244,
    },
  };

  const fetchData = () => {
    if (product !== null) {
      fetch(URLs.cn + "/product/" + product_category)
        .then((res) => res.json())
        .then((result) => {
          setMenuItems(result);
        });
    }
  };

  const fetchCompanyData = () => {
    if (product !== null) {
      fetch(URLs.cn + "/company/" + br_no)
        .then((res) => res.json())
        .then((result) => {
          setCompany(result);
          setloading(false);
        });
    }
  };

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    setEmail(email);
    fetch(URLs.cn + "/cart/" + email)
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setCart(result);
      });
  };

  function addItemToCart() {
    // console.log(cart);
    if (cart.productList.length > 0) {
      let alreadyAdded = false;
      for (let Object of cart.productList) {
        if (Object._id == product._id) {
          alreadyAdded = true;
          Alert.alert("Product already added to the Wish List!");
          return;
        }
      }
      if (!alreadyAdded) {
        let arrayproduct = cart.productList;
        let pid = product;
        arrayproduct.push(pid);

        fetch(URLs.cn + "/cart/" + cart._id, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ arrayproduct }),
        })
          .then((res) => res.json())
          .then((data) => {
            Alert.alert("Product added to the Wish List Succesfully");
          });
      }
    } else {
      let pid = product;

      let arrayproduct = cart.productList;
      arrayproduct.push(pid);
      // console.log(arrayproduct[0]);

      fetch(URLs.cn + "/cart/" + cart._id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ arrayproduct }),
      })
        .then((res) => res.json())
        .then((data) => {
          Alert.alert("Product added to the Wish List Succesfully");
        });
    }
  }

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

  // function getBasketItemCount() {
  //   let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0);

  //   return itemCount;
  // }

  function sumOrder() {
    total = orderItems.reduce((a, b) => a + (b.total || 0), 0);
    // setTotalPrice(total.toFixed(2));
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

  function loadNewProduct(item) {
    setProduct(item);
    setProduct_category(item.product_category);
    setBr_no(item.br_number);
    fetchData();
    fetchCompanyData();
    getData();
  }

  function renderOtherProducts() {
    return (
      <Animated.ScrollView
        vertical
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsVerticalScrollIndicator={false}
        // onScroll={Animated.event(
        //   [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        //   { useNativeDriver: false }
        // )}
      >
        <Text
          style={{
            ...FONTS.h2,
            textAlign: "center",
            marginTop: 15,
            marginBottom: 15,
          }}
        >
          Similer Products
        </Text>
        {menuItems?.map((item, index) => {
          return (
            <TouchableOpacity
              key={`menu-${index}`}
              style={{
                margin: SIZES.padding * 2,
              }}
              // onPress={() => navigation.navigate("Item", { item, currentLocation })}
              onPress={() => loadNewProduct(item)}
            >
              <View
                style={{
                  marginBottom: SIZES.padding,
                }}
              >
                <Image
                  source={{ uri: item.picture }}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 200,
                    borderRadius: SIZES.radius,
                  }}
                />

                <View
                  style={{
                    position: "absolute",
                    bottom: 0,
                    height: 50,
                    width: SIZES.width * 0.3,
                    backgroundColor: COLORS.white,
                    borderTopRightRadius: SIZES.radius,
                    borderBottomLeftRadius: SIZES.radius,
                    alignItems: "center",
                    justifyContent: "center",
                    ...styles.shadow,
                  }}
                >
                  <Text style={{ ...FONTS.h4 }}>Rs. {item.unitprice} /=</Text>
                </View>
              </View>

              {/* resturent Infromation */}
              <Text style={{ ...FONTS.body2 }}>{item.product_name}</Text>
              <View
                style={{
                  marginTop: SIZES.padding,
                  flexDirection: "row",
                }}
              >
                {/* rating */}
                <Image
                  source={icons.star}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.primary,
                    marginRight: 10,
                  }}
                />
                <Text style={{ ...FONTS.body3 }}>{item.avg_rate}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                  }}
                >
                  {/* {item.categories.map((categoryId) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                  }}
                  key={categoryId}
                >
                  <Text
                    style={{
                      ...FONTS.body3,
                    }}
                  >
                    {getCategoryNameById(categoryId)}
                  </Text>
                  <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>
                    {" "}
                    .{" "}
                  </Text>
                </View>
              );
            })} */}

                  {/* Price */}
                  {/* {[1, 2, 3].map((priceRating) => (
              <Text
                key={priceRating}
                style={{
                  ...FONTS.body3,
                  color:
                    priceRating <= item.priceRating
                      ? COLORS.black
                      : COLORS.darkgray,
                }}
              >
                $
              </Text>
            ))} */}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </Animated.ScrollView>
    );
  }

  function renderItemInfo() {
    return (
      <>
        {/* <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          style={{ backgroundColor: "red" }}
        > */}
        {/* {menuItems?.map((item, index) => { */}

        <View style={{ alignItems: "center" }}>
          <View style={{ height: SIZES.height * 0.35 }}>
            {/* food image */}
            <Image
              source={{ uri: product.picture }}
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
                onPress={() => {
                  editOrder("-", product._id, product.unitprice);
                }}
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
                <Text style={{ ...FONTS.h2 }}>{getOrderQty(product._id)}</Text>
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
                onPress={() => {
                  editOrder("+", product._id, product.unitprice);
                }}
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
              {product.product_name} - Rs. {product.unitprice.toFixed(2)}
            </Text>
            <Text style={{ ...FONTS.body3 }}>{product.description}</Text>
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
            <Text style={{ color: COLORS.black, ...FONTS.body3 }}>Reviews</Text>
          </TouchableOpacity>
          {/* {renderDots()} */}
        </View>

        {/*  })} */}
        {/* </Animated.ScrollView> */}
      </>
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

  const validateOrder = () => {
    if (sumOrder() == "0.00") {
      Alert.alert("Set the quantity first!");
    } else {
      navigation.navigate("StripeApp", { total, product, email });
    }
  };

  function renderOrder() {
    // console.log(company);
    return (
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            borderTopColor: COLORS.black,
            borderLeftColor: COLORS.black,
            borderRightColor: COLORS.black,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderTopWidth: 3,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: SIZES.padding,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray2,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>
              {/* {getBasketItemCount()} s */}
              Total Price
            </Text>
            <Text style={{ ...FONTS.h3 }}> Rs. {sumOrder()}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: SIZES.padding * 0.1,
              paddingHorizontal: SIZES.padding * 3,
            }}
          ></View>

          {/* Order button */}
          <View
            style={{
              padding: SIZES.padding * 0.5,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                height: "100%",
                backgroundColor: COLORS.primary,
                // backgroundColor: "#FA5B",
                // backgroundColor: "#0247FE",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.pin}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: COLORS.white,
                }}
              />
              {company.location.lat == null ? (
                <TouchableOpacity
                  onPress={() => Alert.alert("Company Location hasn't updated")}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      marginLeft: SIZES.padding,
                      ...FONTS.h4,
                    }}
                  >
                    Location
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ItemLocation", {
                      product: company.location,
                      currentLocation: currentLocation,
                      company: company,
                    })
                  }
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      marginLeft: SIZES.padding,
                      ...FONTS.h4,
                    }}
                  >
                    Location
                  </Text>
                </TouchableOpacity>
              )}
              {/* <TouchableOpacity
                onPress={() =>
                  navigation.navigate("ItemLocation", {
                    product: company.location,
                    currentLocation: currentLocation,
                    company: company,
                  })
                }
              >
                <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>
                  Location
                </Text>
              </TouchableOpacity> */}
            </View>

            <TouchableOpacity
              style={{
                padding: SIZES.padding * 0.2,
                // backgroundColor: "#FFA133",
                backgroundColor: "#FFA500",
                alignItems: "center",
                // borderRadius: SIZES.radius,
                // marginBottom: SIZES.padding,
                flex: 1,
              }}
              onPress={addItemToCart}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Add to</Text>
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                Wish List
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                padding: SIZES.padding * 0.2,
                // backgroundColor: "#66B132",
                backgroundColor: "#27AE60",
                alignItems: "center",
                // borderRadius: SIZES.radius,
                height: "100%",
                flex: 1,
                paddingTop: 15,
                // justifyContent: "center",
              }}
              onPress={() => validateOrder()}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  function orderMenuItems() {
    menuItems.map((item, index) => {
      if (item._id == product._id) {
        menuItems.splice(index, 1);
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {renderHeader()}
          {orderMenuItems()}
          {renderItemInfo()}
          {renderOtherProducts()}
          {renderOrder()}
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

export default Item;
