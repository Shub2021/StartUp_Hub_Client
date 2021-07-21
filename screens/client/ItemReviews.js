import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  Animated,
  Button,
  TextInput,
} from "react-native";
import ProgressBar from "../components/ProgressBar";
import Modal from "react-native-modal";
import StarRating from "react-native-star-rating";

import { icons, COLORS, SIZES, FONTS, URLs } from "../../constants";

const ItemReviews = ({ route, navigation }) => {
  const scrollX = new Animated.Value(0);

  const [product, setProduct] = React.useState(route.params);
  const [rating, setRating] = React.useState(0);
  const [rateCount, setRateCount] = React.useState(0);
  const [exceletCount, setexceletCount] = React.useState(0);
  const [goodCount, setgoodCount] = React.useState(0);
  const [avgCount, setavgCount] = React.useState(0);
  const [lowAvgCount, setlowAvgCount] = React.useState(0);
  const [poorCount, setpoorCount] = React.useState(0);

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [starCount, setstarCount] = React.useState(0);

  React.useEffect(() => {
    var rate = 0;
    var rateCount = 0;
    if (product.rating.length > 1) {
      for (let i = 1; i < product.rating.length; i++) {
        const element = product.rating[i].rate;
        rate = rate + element;
        rateCount = i;
        if (element == 5) {
          var count = ((exceletCount + 1) / rateCount) * 100;
          setexceletCount(count);
        } else if (element == 4) {
          var count = ((goodCount + 1) / rateCount) * 100;
          setgoodCount(count);
        } else if (element == 3) {
          var count = ((avgCount + 1) / rateCount) * 100;
          setavgCount(count);
        } else if (element == 2) {
          var count = ((lowAvgCount + 1) / rateCount) * 100;
          setlowAvgCount(count);
        } else if (element == 1) {
          var count = ((poorCount + 1) / rateCount) * 100;
          setlowAvgCount(count);
        }
      }

      rate = rate / rateCount;
    }
    setRateCount(rateCount);
    setRating(parseInt(rate));
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function onStarRatingPress(rating) {
    setstarCount(rating);
  }

  const testData = [
    { bgcolor: "#4AA44B", completed: exceletCount },
    { bgcolor: "#A6D433", completed: goodCount },
    { bgcolor: "#F6E535", completed: avgCount },
    { bgcolor: "#F5A523", completed: lowAvgCount },
    { bgcolor: "#EC3A12", completed: poorCount },
  ];

  const data = product.rating;
  // [
  //   {
  //     id: 1,
  //     image: "https://bootdey.com/img/Content/avatar/avatar1.png",
  //     name: "Nimal Perera",
  //     comment:
  //       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
  //   },
  //   {
  //     id: 2,
  //     image: "https://bootdey.com/img/Content/avatar/avatar6.png",
  //     name: "Amal Perera",
  //     comment:
  //       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
  //   },
  //   {
  //     id: 3,
  //     image: "https://bootdey.com/img/Content/avatar/avatar7.png",
  //     name: "Kamal Perera",
  //     comment:
  //       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.",
  //   },
  // ];

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
            {rating}
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
          <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>
            Based on {rateCount} reviews
          </Text>
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
            <Text style={{ marginRight: 10, width: 90, ...FONTS.body3 }}>
              Excellent
            </Text>
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
            <Text style={{ marginRight: 10, width: 90, ...FONTS.body3 }}>
              Good
            </Text>
            <View style={{ flex: 1 }}>
              <ProgressBar
                key={1}
                bgcolor={testData[1].bgcolor}
                completed={testData[1].completed}
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
            <Text style={{ marginRight: 10, width: 90, ...FONTS.body3 }}>
              Average
            </Text>
            <View style={{ flex: 1 }}>
              <ProgressBar
                key={1}
                bgcolor={testData[2].bgcolor}
                completed={testData[2].completed}
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
            <Text style={{ marginRight: 10, width: 90, ...FONTS.body3 }}>
              Below Average
            </Text>
            <View style={{ flex: 1 }}>
              <ProgressBar
                key={1}
                bgcolor={testData[3].bgcolor}
                completed={testData[3].completed}
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
            <Text style={{ marginRight: 10, width: 90, ...FONTS.body3 }}>
              Poor
            </Text>
            <View style={{ flex: 1 }}>
              <ProgressBar
                key={1}
                bgcolor={testData[4].bgcolor}
                completed={testData[4].completed}
              />
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              borderBottomColor: COLORS.secondary,
              borderBottomWidth: 1,
            }}
          />
        </View>
      </View>
    );
  }

  function renderComments() {
    const renderItem = ({ item }) => (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {}}>
          {/* <Image style={styles.image} source={{ uri: item.image }} /> */}
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.name}>{item.client}</Text>
          </View>
          <Text rkType="primary3 mediumLine">{item.comment}</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginTop: 5,
            }}
          />
        </View>
      </View>
    );
    return (
      <FlatList
        style={styles.root}
        data={data}
        // extraData={this.state}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item._id.toString();
        }}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 30,
        }}
      />
    );
  }

  function renderBottom() {
    return (
      <View
        style={{
          position: "absolute",
          height: 100,
          bottom: 0,
          left: 0,
          width: "100%",
          // backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "rgba(205,205,210, 0.8)",
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
          <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Add review</Text>
        </TouchableOpacity>
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
              }}
            >
              <Text style={{ ...FONTS.h2, marginBottom: SIZES.padding }}>
                Rate the Product
              </Text>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={starCount}
                selectedStar={(rating) => onStarRatingPress(rating)}
                fullStarColor={COLORS.primary}
                starStyle={{
                  paddingRight: 5,
                  marginBottom: SIZES.padding,
                }}
              />
              <View style={styles.separator} />
              <Text style={{ ...FONTS.h2, marginBottom: SIZES.padding }}>
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
                }}
                // onChangeText="Enter the comment"
                // value="Enter the comment"
                // onChangeText=""
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
                onPress={toggleModal}
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
    <SafeAreaView style={{ height: "100%" }}>
      {renderHeader()}
      {renderRatings()}

      {renderComments()}
      {renderBottom()}
      {popupReview()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#ffffff",
    marginTop: 10,
  },
  container: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    fontSize: SIZES.body3,
    fontWeight: "bold",
  },
});

export default ItemReviews;
