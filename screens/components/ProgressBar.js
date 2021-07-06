import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "../../constants";

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  return (
    <View
      style={{
        height: 10,
        width: "100%",
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 5,
      }}
    >
      <View
        style={{
          height: "100%",
          width: `${completed}%`,
          backgroundColor: bgcolor,
          borderRadius: 50,
          textAlign: "right",
        }}
      >
        <View
          style={{
            // padding: 5,
            color: "white",
            fontWeight: "bold",
            transition: "width 1s ease-in-out", 
            width: "100%",

          }}
        >
          <Text
            style={{
              textAlign: "center",
              height: 13,
              marginTop: -3,
              color: COLORS.white,
              // backgroundColor: "red",
            }}
          >
            {`${completed}%`}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ProgressBar;
