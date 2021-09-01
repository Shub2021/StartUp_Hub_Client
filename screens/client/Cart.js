import React, { Component, useState, useEffect } from "react";
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
} from "react-native";
import { COLORS, icons, images, FONTS, SIZES, URLs } from "../../constants";

const Cart = ({ navigation }) => {

    function renderHeader() {
        return (
          <View
            style={{
              flexDirection: "row",
              height: 50,
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
                <Text style={{ ...FONTS.h3 }}>Cart</Text>
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

    return (
        <SafeAreaView style={styles.container}>
          {renderHeader()}
        </SafeAreaView>
      );

}

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

export default Cart;