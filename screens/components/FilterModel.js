import React from "react";
import {
  Animated,
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import { COLORS, constants, FONTS, icons, SIZES } from "../../constants";
import IconButton from "../components/IconButton";
import TextIconButton from "./TextIconButton";
import TwoPointSlider from "./TwoPointSlider";

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

const FilterModel = ({ isVisible, onClose, min, max }) => {
  const modelAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const [showFilterModel, setShowFilterModel] = React.useState(isVisible);
  const [ratings, setRatings] = React.useState("");
  const [minPrice, setMinPrice] = React.useState(min);
  const [maxPrice, setMaxPrice] = React.useState(max);

  React.useEffect(() => {
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
      }).start(() => onClose());
    }
  }, [showFilterModel]);

  const modelY = modelAnimatedValue.interpolate({
    inputRange: [0, 1],
    //cange popup height
    outputRange: [SIZES.height, SIZES.height - 340],
  });

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
            values={[minPrice, maxPrice]}
            min={lowprice}
            max={maxPrice + 100}
            prefix="Rs. "
            postfix=""
            onValuesChange={(values) => console.log(values)}
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
                onPress={() => setRatings(item.id)}
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

export default FilterModel;
