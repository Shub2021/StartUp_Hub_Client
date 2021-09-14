import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from "react-native";
import { COLORS, FONTS, icons, SIZES, URLs } from "../../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const listTabs = [
  {
    id: 1,
    status: "Requested",
  },
  {
    id: 2,
    status: "Processing",
  },
  {
    id: 3,
    status: "Completed",
  },
];

const UserRequestedServices = ({ navigation }) => {
  const [status, setStatus] = React.useState("Requested");
  const [email, setEmail] = React.useState(null);
  const [services, setServices] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setData();
  }, []);

  const setData = async () => {
    const useremail = await AsyncStorage.getItem("email");
    setEmail(useremail);
    setDatatoState(useremail);
  };

  const setDatatoState = (userEmail) => {
    fetch(URLs.cn + "/jobs/userservices/" + userEmail)
      .then((res) => res.json())
      .then((result) => {
        setServices(result);

        setIsLoading(false);
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
            <Text style={{ ...FONTS.h3 }}>Accepted Services</Text>
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

  function renderTabs() {
    return (
      <View
        style={{
          //   padding: 15,
          flexDirection: "row",
          alignSelf: "center",
          marginBottom: 20,
        }}
      >
        {listTabs.map((e) => (
          <TouchableOpacity
            style={{
              width: SIZES.width / 3.5,
              flexDirection: "row",
              borderWidth: 0.5,
              borderColor: e?.status == status ? COLORS.primary : COLORS.white,
              backgroundColor:
                e?.status == status ? COLORS.primary : COLORS.white,
              padding: 10,
              justifyContent: "center",
            }}
            onPress={() => setStatus(e.status)}
            key={e.id}
          >
            <Text
              style={{
                ...FONTS.body3,
                color: e?.status == status ? COLORS.white : COLORS.black,
              }}
            >
              {e.status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  const renderList1 = (item) => {
    const id = item._id.slice(18, 23);
    if (item.job_status === "placed") {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.gray3,
          }}
          // onPress={() => showAlert1(item)}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: COLORS.secondary, fontSize: 24 }}>
              Order #{id}
            </Text>
            <Icons
              name="eye"
              color={COLORS.secondary}
              size={28}
              // onPress={() => showAlert4(item)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.service_name}
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.package_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Total</Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              LKR {item.price}.00
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  const renderList2 = (item) => {
    const id = item._id.slice(18, 23);
    if (item.job_status === "Processing") {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.gray3,
          }}
          // onPress={() => showAlert2(item)}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: COLORS.secondary, fontSize: 24 }}>
              Order #{id}
            </Text>
            <Icons
              name="eye"
              color={COLORS.secondary}
              size={28}
              // onPress={() => showAlert4(item)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.service_name}
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.package_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Total</Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              LKR {item.price}.00
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };
  const renderList3 = (item) => {
    const id = item._id.slice(18, 23);
    if (item.job_status === "completed") {
      return (
        <TouchableOpacity
          style={{
            marginBottom: SIZES.radius,
            borderRadius: SIZES.radius * 2,
            paddingHorizontal: SIZES.padding,
            paddingVertical: SIZES.radius,
            backgroundColor: COLORS.gray3,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ color: COLORS.secondary, fontSize: 24 }}>
              Order #{id}
            </Text>
            <Icons
              name="eye"
              color={COLORS.secondary}
              size={28}
              // onPress={() => showAlert4(item)}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.service_name}
            </Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              {item.package_name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginRight: 5,
            }}
          >
            <Text style={{ color: COLORS.white, fontSize: 18 }}>Total</Text>
            <Text style={{ color: COLORS.white, fontSize: 18 }}>
              LKR {item.price}.00
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  function renderServices() {
    return (
      <View>
        {status === "Requested" ? (
          <View>
            {/* Requested services */}
            <FlatList
              style={{
                marginTop: SIZES.radius,
                marginBottom: SIZES.radius * 5,
                paddingHorizontal: SIZES.radius,
              }}
              data={services}
              renderItem={({ item }) => {
                return renderList1(item);
              }}
              keyExtractor={(item) => item._id.toString()}
              onRefresh={() => setDatatoState(email)}
              refreshing={isLoading}
            />
          </View>
        ) : status === "Processing" ? (
          <View>
            {/* Processing services */}
            <FlatList
              style={{
                marginTop: SIZES.radius,
                paddingHorizontal: SIZES.radius,
                marginBottom: SIZES.radius * 5,
              }}
              data={services}
              renderItem={({ item }) => {
                return renderList2(item);
              }}
              keyExtractor={(item) => item._id.toString()}
              onRefresh={() => setDatatoState(email)}
              refreshing={isLoading}
            />
          </View>
        ) : (
          <View>
            {/* Completed services */}
            <FlatList
              style={{
                marginTop: SIZES.radius,
                marginBottom: SIZES.radius * 5,
                paddingHorizontal: SIZES.radius,
              }}
              data={services}
              renderItem={({ item }) => {
                return renderList3(item);
              }}
              keyExtractor={(item) => item._id.toString()}
              onRefresh={() => setDatatoState(email)}
              refreshing={isLoading}
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderTabs()}
      {renderServices()}
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

export default UserRequestedServices;
