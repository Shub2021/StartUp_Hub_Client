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
import ProgressBar from "../components/ProgressBar";

import { icons, COLORS, SIZES, FONTS, URLs } from "../../constants";

const ItemReviews = ({ route, navigation }) => {
  const [product, setProduct] = React.useState(route.params);

  const testData = [
    { bgcolor: "#6a1b9a", completed: 60 },
    { bgcolor: "#00695c", completed: 30 },
    { bgcolor: "#ef6c00", completed: 53 },
  ];

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
            <Text style={{ ...FONTS.h3 }}>Reviews</Text>
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

  function renderRatings() {
    return (
      <View>
        <View
          style={{
            width: SIZES.width,
            alignItems: "center",
            marginTop: 30,
            // paddingHorizontal: SIZES.padding * 2,
          }}
        >
          <Text
            style={{
              ...FONTS.largeTitle,
            }}
          >
            4.0
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginTop: 5,
            }}
          >
            <Image
              source={icons.star}
              resizeMode="contain"
              style={{
                width: 20,
                height: 25,
                marginRight: 10,
              }}
            />
            <Image
              source={icons.star}
              resizeMode="contain"
              style={{
                width: 20,
                height: 25,
                marginRight: 10,
              }}
            />
            <Image
              source={icons.star}
              resizeMode="contain"
              style={{
                width: 20,
                height: 25,
                marginRight: 10,
              }}
            />
            <Image
              source={icons.star}
              resizeMode="contain"
              style={{
                width: 20,
                height: 25,
                marginRight: 10,
              }}
            />
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          <View
            style={{
              flexDirection: "row",
              //   height: 30,
              alignItems: "center",
              justifyContent: "center",
              paddingStart: SIZES.padding * 2,
              paddingEnd: SIZES.padding * 2,
            }}
          >
            <Text style={{ marginRight: 10, width: 90 }}>Excellent</Text>
            <View style={{ flex: 1 }}>
              <ProgressBar
                key={1}
                bgcolor={testData[0].bgcolor}
                completed={testData[0].completed}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              //   height: 40,
              alignItems: "center",
              justifyContent: "center",
              paddingStart: SIZES.padding * 2,
              paddingEnd: SIZES.padding * 2,
            }}
          >
            <Text style={{ marginRight: 10, width: 90 }}>Good</Text>
            <View style={{ flex: 1 }}>
              <ProgressBar
                key={1}
                bgcolor={testData[0].bgcolor}
                completed={testData[0].completed}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              //   height: 40,
              alignItems: "center",
              justifyContent: "center",
              paddingStart: SIZES.padding * 2,
              paddingEnd: SIZES.padding * 2,
            }}
          >
            <Text style={{ marginRight: 10, width: 90 }}>Average</Text>
            <View style={{ flex: 1 }}>
              <ProgressBar
                key={1}
                bgcolor={testData[0].bgcolor}
                completed={testData[0].completed}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              //   height: 40,
              alignItems: "center",
              justifyContent: "center",
              paddingStart: SIZES.padding * 2,
              paddingEnd: SIZES.padding * 2,
            }}
          >
            <Text style={{ marginRight: 10, width: 90 }}>Below Average</Text>
            <View style={{ flex: 1 }}>
              <ProgressBar
                key={1}
                bgcolor={testData[0].bgcolor}
                completed={testData[0].completed}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderRatings()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});

export default ItemReviews;
