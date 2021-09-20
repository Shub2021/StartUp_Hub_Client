import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import { COLORS, icons, images, FONTS, SIZES, URLs } from "../../constants";
import { cart } from "../../constants/icons";

const UserCart = ({ navigation }) => {
  const [email, setEmail] = React.useState(null);
  const [cartProducts, setCartProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [cartItsemsExist, srtcartItsemsExist] = React.useState(false);
  const [cartID, setCartId] = React.useState(null);

  useEffect(() => {
    //  AsyncStorage.getItem("email").then((token) => {
    //   setEmail(token);
    // });
    setData();
  }, []);

  const setData = async () => {
    const useremail = await AsyncStorage.getItem("email");
    setEmail(useremail);
    setDatatoState(useremail);
  };

  const setDatatoState = (userEmail) => {
    fetch(URLs.cn + "/cart/" + userEmail)
      .then((res) => res.json())
      .then((result) => {
        if (result.productList.length > 0) {
          setCartId(result._id);
          setCartProducts(result.productList);
          srtcartItsemsExist(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          srtcartItsemsExist(false);
          //no cart items
        }
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
        >
          <Image
            source={icons.nearby}
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
            <Text style={{ ...FONTS.h3 }}>Wish List</Text>
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

  const createTwoButtonAlert = (item) =>
    Alert.alert(
      "Product Remove From Cart",
      "Do you want to remove the product from the cart?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => removeItemFromCart(item) },
      ],
      { cancelable: false }
    );

  const removeItemFromCart = (item) => {
    let cartArray = cartProducts.filter(function (ele) {
      return ele._id != item._id;
    });

    fetch(URLs.cn + "/cart/" + cartID, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ arrayproduct: cartArray }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCartProducts(cartArray);
        setIsLoading(false);
      });
  };

  function renderProductsList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          marginBottom: SIZES.padding2 * 2,
        }}
        onPress={() => navigation.navigate("Item", item)}
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
              borderRadius: SIZES.radius * 0.5,
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
              borderBottomLeftRadius: SIZES.radius * 0.5,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Rs. {item.unitprice} /=</Text>
          </View>
        </View>

        {/* resturent Infromation */}
        <View
          style={{
            flexDirection: "row",
            // marginLeft: "auto",
          }}
        >
          <Text style={{ ...FONTS.body2 }}>{item.product_name}</Text>
          <View
            style={{
              flexDirection: "row",
              marginLeft: "auto",
            }}
          >
            <TouchableOpacity
              style={{
                // width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: "center",
                borderRadius: SIZES.radius,
              }}
              onPress={() => createTwoButtonAlert(item)}
            >
              <Text style={{ ...FONTS.h4 }}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            // marginTop: SIZES.padding * 0.5,
            marginBottom: SIZES.padding,
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
        <View
          style={{
            marginBottom: SIZES.padding,
            borderBottomColor: COLORS.secondary,
            borderBottomWidth: 1,
          }}
        />
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={cartProducts}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        onRefresh={() => setData()}
        refreshing={isLoading}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        renderProductsList()
      )}
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

export default UserCart;
