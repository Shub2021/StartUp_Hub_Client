import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import filter from "lodash.filter";
import { icons, images, SIZES, COLORS, FONTS, URLs } from "../../constants";

const ServicesHome = ({ navigation }) => {
  // Dummy Datas

  const initialCurrentLocation = {
    streetName: "Kuching",
    gps: {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    },
  };

  const categoryData = [
    {
      id: 1,
      name: "All",
      icon: images.all_services,
    },
    {
      id: 2,
      name: "Design",
      icon: images.design,
    },
    {
      id: 3,
      name: "Education",
      icon: images.education,
    },
    {
      id: 4,
      name: "Healthcare",
      icon: images.health,
    },
    {
      id: 5,
      name: "Marketing & Sales",
      icon: images.sales,
    },
    {
      id: 6,
      name: "Other",
      icon: images.other,
    },
  ];

  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [query, setQuery] = React.useState("");
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation
  );

  const [data, setdata] = React.useState(null);
  const [selectedProducts, setselectedProducts] = React.useState(null);

  useEffect(() => {
    fetchData();
    // setloading(false);
  }, []);

  const fetchData = () => {
    fetch(URLs.cn + "/services/")
      .then((res) => res.json())
      .then((result) => {
        setdata(result);
        setselectedProducts(result);
      });
  };

  function onSelectCategory(category) {
    console.log(category);
    //filter restaurant
    if (category.name === "All") {
      setselectedProducts(data);
    } else {
      let serviceList = data.filter((a) =>
        a.company_category.includes(category.name)
      );

      setselectedProducts(serviceList);
    }
    setSelectedCategory(category);
  }

  const contains = (name, query) => {
    if (name.service_name.includes(query)) {
      return true;
    }

    return false;
  };

  const handleSearch = (text) => {
    const formattedQuery = text;

    if (text === "") {
      setselectedProducts(data);
    } else {
      const filteredData = filter(selectedProducts, (prod) => {
        return contains(prod, formattedQuery);
      });

      setselectedProducts(filteredData);
      setQuery(text);
    }
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
              justifyContent: "center",
              borderRadius: SIZES.radius,
              paddingVertical: SIZES.padding,
            }}
          >
            <Text style={{ ...FONTS.h3 }}>Services</Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("UserRequestedServices")}
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
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
      </View>
    );
  }

  function renderMainCategories() {
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
              source={item.icon}
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
        <Text style={{ ...FONTS.h4 }}>Main Service Types</Text>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    );
  }

  function renderServiceList() {
    const renderItem = ({ item }) => (
      <View>
        <TouchableOpacity
          style={{ marginBottom: SIZES.padding * 2 }}
          onPress={() =>
            navigation.navigate("SelectetService", {
              item,
              currentLocation,
            })
          }
        >
          {/* Image */}
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

            {/* <View
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
            <Text style={{ ...FONTS.h4 }}>{item.service_type}</Text>
          </View> */}
          </View>

          {/* Restaurant Info */}
          <Text style={{ ...FONTS.body2 }}>{item.service_name}</Text>

          <View
            style={{
              marginTop: SIZES.padding,
              marginBottom: SIZES.padding,
              flexDirection: "row",
            }}
          >
            {/* Rating */}
            <Image
              source={icons.star}
              style={{
                height: 20,
                width: 20,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
            <Text style={{ ...FONTS.body3 }}>{item.service_type}</Text>

            {/* Categories */}
            {/* <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
              >
            {item.categories.map((categoryId) => {
              return (
                <View style={{ flexDirection: "row" }} key={categoryId}>
                  <Text style={{ ...FONTS.body3 }}>
                    {getCategoryNameById(categoryId)}
                  </Text>
                  <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>
                    {" "}
                    .{" "}
                  </Text>
                </View>
              );
            })}

           
              </View>  */}
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

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderSearch()}
      {renderMainCategories()}
      {renderServiceList()}
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

export default ServicesHome;
