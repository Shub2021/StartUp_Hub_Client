import React from "react";
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
  ActivityIndicator,
  Alert,
} from "react-native";
import ProgressBar from "../components/ProgressBar";
import Modal from "react-native-modal";
import StarRating from "react-native-star-rating";

import { icons, COLORS, SIZES, FONTS, URLs } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ItemReviews = ({ route, navigation }) => {
  const scrollX = new Animated.Value(0);

  const [product, setProduct] = React.useState(route.params);
  const [rating, setRating] = React.useState(route.params.avg_rate);
  const [data, setData] = React.useState(null);
  const [rateCount, setRateCount] = React.useState(0);
  const [exceletCount, setexceletCount] = React.useState(0);
  const [goodCount, setgoodCount] = React.useState(0);
  const [avgCount, setavgCount] = React.useState(0);
  const [lowAvgCount, setlowAvgCount] = React.useState(0);
  const [poorCount, setpoorCount] = React.useState(0);

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [starCount, setstarCount] = React.useState(0);

  const [addComment, setaddComment] = React.useState("");
  const [userRate, setuseRate] = React.useState(0);
  const [userId, setUserId] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [loading, setloading] = React.useState(true);
  const [userAlreadyAddedComment, setUserAlreadyAddedComment] =
    React.useState(false);

  React.useEffect(() => {
    let allRateCount = product.rating.length;
    // setRateCount(allRateCount);

    loadProduct();
    getData();
  }, []);

  const loadProduct = () => {
    fetch(URLs.cn + "/product/getProductbyID/" + product._id)
      .then((res) => res.json())
      .then((result) => {
        if (result.rating[0].client === "none") {
          result.rating.shift();
        }
        setData(result.rating);
        setProduct(result);
        setRateCount(result.rating.length);
        loadRatingBars();
      });
  };

  const loadRatingBars = () => {
    let allRateCount = product.rating.length;
    if (product.rating.length > 0) {
      let fiveStarCount = 0;
      let fourStarCount = 0;
      let threeStarCount = 0;
      let twoStarCount = 0;
      let oneStarCount = 0;

      for (let i = 0; i < product.rating.length; i++) {
        const element = product.rating[i].rate;

        if (element == 5) {
          fiveStarCount++;
        } else if (element == 4) {
          fourStarCount++;
        } else if (element == 3) {
          threeStarCount++;
        } else if (element == 2) {
          twoStarCount++;
        } else if (element == 1) {
          oneStarCount++;
        }
      }

      setexceletCount((fiveStarCount / allRateCount) * 100);

      setgoodCount((fourStarCount / allRateCount) * 100);

      setavgCount((threeStarCount / allRateCount) * 100);

      setlowAvgCount((twoStarCount / allRateCount) * 100);

      setlowAvgCount((oneStarCount / allRateCount) * 100);
    }
  };

  const getData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    setUserId(userId);
    fetch(URLs.cn + "/users/" + userId)
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
        setloading(false);
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function addCommenttoDB() {
    if (starCount === 0) {
      Alert.alert("Set your Rating!");
    } else {
      if (addComment == "") {
        Alert.alert("Set your Comment!");
      } else {
        let avgRate = parseInt(
          (starCount + rating * rateCount) / (rateCount + 1)
        );
        setRateCount(rateCount + 1);
        setRating(avgRate);

        let ratingarray = [];

        for (let i = 0; i < product.rating.length; i++) {
          ratingarray.push(product.rating[i]);
        }

        let newComent = {
          rate: starCount,
          comment: addComment,
          clientId: userId,
          client: user.name,
        };

        ratingarray.push(newComent);

        fetch(URLs.cn + "/product/" + product._id, {
          method: "patch",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            avg_rate: avgRate,
            rating: ratingarray,
          }),
        })
          .then((res) => res.json())
          .then((result) => {
            setUserAlreadyAddedComment(true);
            loadProduct();
            toggleModal();
          });
      }
    }
  }

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
            <Text style={{ marginRight: 10, width: 90, ...FONTS.body5 }}>
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
            <Text style={{ marginRight: 10, width: 90, ...FONTS.body5 }}>
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
            <Text style={{ marginRight: 10, width: 90, ...FONTS.body5 }}>
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
            <Text style={{ marginRight: 10, width: 90, ...FONTS.body5 }}>
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
            <Text style={{ marginRight: 10, width: 90, ...FONTS.body5 }}>
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
        <TouchableOpacity>
          <Image style={styles.image} source={icons.user} />
        </TouchableOpacity>
        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.name}>{item.client}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ ...FONTS.body3, marginRight: 5 }}>
              {item.rate}.0
            </Text>
            <Image
              source={icons.star}
              style={{
                height: 15,
                width: 15,
                tintColor: COLORS.primary,
                marginRight: 10,
              }}
            />
          </View>
          <Text style={{ ...FONTS.body5 }} rkType="primary3 mediumLine">
            {item.comment}
          </Text>
          {/* <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
              marginTop: 5,
            }}
          /> */}
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
        onRefresh={() => loadProduct()}
        refreshing={loading}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 30,
        }}
      />
    );
  }

  const validateUserAddedComment = () => {
    let userAddedComment = data.filter((comment) => comment.clientId == userId);

    if (userAddedComment.length > 0) {
      if (!userAlreadyAddedComment) {
        setUserAlreadyAddedComment(true);
      }
    }
  };

  const renderBottom = () => {
    validateUserAddedComment();
    return (
      <View
        style={{
          position: "absolute",
          // height: 100,
          bottom: 0,
          // left: 0,
          width: "100%",
          // backgroundColor: "red",
          justifyContent: "center",
          alignItems: "center",
          padding: SIZES.padding * 2,
          marginBottom: 0,
          backgroundColor: "rgba(205,205,210, 0.8)",
        }}
      >
        {userAlreadyAddedComment ? (
          <TouchableOpacity
            style={{
              width: SIZES.width * 0.9,
              padding: SIZES.padding,
              backgroundColor: COLORS.secondary,
              alignItems: "center",
              borderRadius: SIZES.radius,
            }}
            onPress={() => Alert.alert("You have already added your review")}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h2 }}>Add review</Text>
          </TouchableOpacity>
        ) : (
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
        )}
      </View>
    );
  };

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
                onPress={addCommenttoDB}
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
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {renderRatings()}
          {renderComments()}
          {data != null && renderBottom()}
        </>
      )}

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
    width: 20,
    height: 20,
    borderRadius: 20,
    marginLeft: 0,
  },
  time: {
    fontSize: 11,
    color: "#808080",
  },
  name: {
    ...FONTS.body3,
    fontSize: SIZES.body3,
    // fontWeight: "bold",
  },
});

export default ItemReviews;
