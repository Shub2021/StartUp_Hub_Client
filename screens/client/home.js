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
  Animated,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
} from "react-native";
import { COLORS, icons, FONTS, SIZES, URLs, constants } from "../../constants";
import FilterModel from "../components/FilterModel";
import filter from "lodash.filter";
import IconButton from "../components/IconButton";
import TextIconButton from "../components/TextIconButton";
import TwoPointSlider from "../components/TwoPointSlider";

const Home = ({ navigation }) => {
  // Dummy Datas

  const [data, setdata] = React.useState([]);
  const [selectedProducts, setselectedProducts] = React.useState([]);
  const [loading, setloading] = React.useState(true);
  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation
  );
  const [showFilterModel, setShowFilterModel] = React.useState(false);
  const [minPrice, setMinPrice] = React.useState(0);
  const [minBarPrice, setMinBarPrice] = React.useState(0);
  const [maxBarPrice, setMaxBarPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(5000);
  const modelAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [ratings, setRatings] = React.useState("");

  const categoryData = [
    {
      id: 1,
      name: "All",
      icon: "https://cdn-icons-png.flaticon.com/512/2345/2345194.png",
    },
    {
      id: 2,
      name: "Apparel",
      icon: "data:image/png;base64,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",
    },
    {
      id: 3,
      name: "Cosmetic",
      icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAAChUlEQVRoge2ZwWsTQRTGf5PdxK1tJFmwaQo96KVIL548WMGTeNSi1FPr39CLvbVS/xLJLR7Em6UgVIjgzYtH9VAsaKDSxpJks9nxECUxbtzJMJu1uN9pdjPzve9j3tvhTSBFshAmya7dvlMTcD0iYu3tyxc3TMXMmCICiBQPIFk2GdOogVFYWFxiYXEpFu6JGIgTqYGkkRpIGqmBpJEaSBqpgaSRGkgaqYGkceYN2CbJXu06bxjoyt4VpwG4uvvh5xsHoDZtMKbpHYhuKTHbUirvQPW9zBUc/4kQrF16/LQ8++w1VrOtFfSUB3LwuTt1jq+rN/m0vX4oJJWjlr21uiQ8FS7lHXAdf0cIHgHlUnVfW3wYrGab2eo+wLwUbLqOv6O6VtmAFKz3x0ZvY3oYoJSCh6rLxqmB8q+BX5gZY5ka/EJ+8HFOdZ1WEftuDAY0OfUMFPPRk8ZER5NTy4BusL9yFiZq4D9IoXZGDIyjw+h+GGIzcJK1QscjOd0LOlLiS6GTbP+QbygY0E3LWIo4EHBq96m/2xZBxOE3UQNRKTQseNiQDucoxHKQhaXMYEqFoeP+Q+dAWNFGFbLuV0iroQmcHF6pSO7Lt9Dfrxw3x+Lz5lwCJ6cjRb+hqa+Y60vqd/W5tFvKg437AFx8Xhu5E1HwSkXqK8scbNzTlaH+N+vex46MnmUOty5nlbSd+VuJcQwcxqZiGJLPqlOVa0BIKlKwOfy+K6HlS5o+tH3wupJOIOgiCYLenEwGLATZjCRrCRwbpmxwbIEVligZKsYNHLXsLdfxkYK1ls98w5M0vJ7wP/F7uQQBBEg6AeBLjtv9eedtmMkJ8jmBY9O7lWja26q6UiSNH7lrsovkGNi8AAAAAElFTkSuQmCC",
    },
    {
      id: 4,
      name: "Food & Bev",
      icon: "data:image/png;base64,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",
    },
    {
      id: 5,
      name: "Household",
      icon: "data:image/png;base64,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",
    },
  ];

  useEffect(() => {
    fetchData();
    setloading(false);
  }, []);

  const fetchData = () => {
    fetch(URLs.cn + "/product/")
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setdata(result);
        setselectedProducts(result);
        setSelectedCategory(categoryData[0]);
      });
  };

  const handleSearch = (text) => {
    const formattedQuery = text;

    if (text === "") {
      if (selectedCategory.name === "All") {
        setselectedProducts(data);
      } else {
        onSelectCategory(selectedCategory);
      }
    } else {
      const filteredData = filter(selectedProducts, (prod) => {
        return contains(prod, formattedQuery);
      });

      setselectedProducts(filteredData);
      setQuery(text);
    }
  };

  function getMinPrice() {
    const minValue = data.reduce(
      (min, p) => (p.unitprice < min ? p.unitprice : min),
      selectedProducts[0].unitprice
    );
    setMinPrice(minValue);
    setMinBarPrice(minValue);
  }
  function getMaxPrice() {
    const maxValue = data.reduce(
      (max, p) => (p.unitprice > max ? p.unitprice : max),
      selectedProducts[0].unitprice
    );
    setMaxPrice(maxValue);
    setMaxBarPrice(maxValue);
  }

  const contains = (name, query) => {
    if (name.product_name.includes(query)) {
      return true;
    }

    return false;
  };

  // const logout = async () => {
  //   try {
  //     await AsyncStorage.removeItem("token");
  //     await AsyncStorage.removeItem("name");
  //     await AsyncStorage.removeItem("email");
  //     await AsyncStorage.removeItem("type");
  //     navigation.navigate("Login");
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   console.log("Done.");
  // };

  const initialCurrentLocation = {
    streetName: "Colombo",
    gps: {
      latitude: 6.927079,
      longitude: 79.861244,
    },
  };

  function onSelectCategory(category) {
    //filter products
    if (category.name === "All") {
      setselectedProducts(data);
    } else {
      let productlist = data.filter((a) =>
        a.company_category.includes(category.name)
      );
      setselectedProducts(productlist);
    }
    setSelectedCategory(category);
  }

  function renderFavouriteCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}
          >
            <Image
              source={{
                uri: item.icon,
              }}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h4 }}>Main Categories</Text>

        <FlatList
          data={categoryData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    );
  }

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
          {/* <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          /> */}
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
            <Text style={{ ...FONTS.h3 }}>Products</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("UserOrders")}
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

  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 40,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.bases,
          paddingHorizontal: SIZES.padding2 * 2,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray3,
        }}
      >
        {/* icon */}
        <Image
          source={icons.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />
        {/* text input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
        />

        {/* filter Button */}
        <TouchableOpacity
          onPress={() => {
            setShowFilterModel(true);
            getMinPrice();
            getMaxPrice();
          }}
        >
          <Image
            source={icons.filter}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderProductsList() {
    const renderItem = ({ item }) => (
      <View>
        <TouchableOpacity
          style={{
            marginBottom: SIZES.padding * 2,
          }}
          // onPress={() => navigation.navigate("Item", { item, currentLocation })}
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
              marginTop: SIZES.padding * 0.5,
              marginBottom: SIZES.padding * 0.5,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ ...FONTS.body2 }}>{item.product_name}</Text>

            {/* rating */}
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Image
                source={icons.star}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: COLORS.primary,
                  marginRight: 10,
                }}
              />
              <Text style={{ ...FONTS.body2 }}>{item.avg_rate}</Text>
            </View>
            {/* <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
          > */}
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
            {/* </View> */}
          </View>
        </TouchableOpacity>
        <View
          style={{
            marginBottom: SIZES.padding,
            borderBottomColor: COLORS.secondary,
            borderBottomWidth: 1,
          }}
        />
      </View>
    );

    return (
      <FlatList
        data={selectedProducts}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  const Section = ({ containerStyle, title, children }) => {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 2,
          ...containerStyle,
        }}
      >
        <Text style={{ ...FONTS.h3 }}>{title}</Text>
        {children}
      </View>
    );
  };

  const FilterModel = ({ isVisible }) => {
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

    const modelY = modelAnimatedValue.interpolate({
      inputRange: [0, 1],
      //change popup height
      outputRange: [SIZES.height, SIZES.height - 340],
    });

    const filterByPrice = () => {
      let productlist = selectedProducts.filter(
        (a) => a.unitprice > minBarPrice && a.unitprice < maxBarPrice
      );
      setselectedProducts(productlist);
    };

    const filterByRate = () => {
      let productlist = selectedProducts.filter((a) => a.avg_rate >= ratings);
      setselectedProducts(productlist);
    };

    function renderPriceRange() {
      let lowprice = 0;
      if (minPrice - 100 > 0) {
        lowprice = minPrice - 100;
      }
      return (
        <Section title="Price Range">
          <View
            style={{
              alignItems: "center",
            }}
          >
            <TwoPointSlider
              values={[minBarPrice, maxBarPrice]}
              min={lowprice}
              max={maxPrice + 100}
              prefix="Rs. "
              postfix=""
              onValuesChangeFinish={(values) => {
                setMinBarPrice(values[0]),
                  setMaxBarPrice(values[1]),
                  filterByPrice();
              }}
            />
          </View>
        </Section>
      );
    }

    function renderRatings() {
      return (
        <Section
          title="Ratings"
          containerStyle={{
            marginTop: 40,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {constants.ratings.map((item, index) => {
              return (
                <TextIconButton
                  key={`Ratings-${index}`}
                  containerStyle={{
                    flex: 1,
                    height: 50,
                    margin: 5,
                    alignItems: "center",
                    borderRadius: SIZES.base,
                    backgroundColor:
                      item.id == ratings ? COLORS.primary : COLORS.lightGray2,
                  }}
                  label={item.label}
                  labelStyle={{
                    color: item.id == ratings ? COLORS.white : COLORS.gray,
                  }}
                  icon={icons.star}
                  iconStyle={{
                    tintColor: item.id == ratings ? COLORS.white : COLORS.gray,
                  }}
                  onPress={() => {
                    setRatings(item.id), filterByRate();
                  }}
                />
              );
            })}
          </View>
        </Section>
      );
    }

    return (
      <Modal animationType="fade" transparent={true} visible={isVisible}>
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
              backgroundColor: COLORS.white,
            }}
          >
            {/* Header */}
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
                }}
              >
                Filter Your Search
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 250,
              }}
            >
              {/* Distance */}
              {renderPriceRange()}

              {/* Rating */}
              {renderRatings()}
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderSearch()}

      {
        showFilterModel && FilterModel(showFilterModel)
        // <FilterModel
        //   isVisible={showFilterModel}
        //   min={minPrice}
        //   max={maxPrice}
        //   onClose={() => setShowFilterModel(false)}
        // />
      }
      {renderFavouriteCategories()}
      {renderProductsList()}
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

export default Home;
