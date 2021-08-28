import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { Title, Card, Button } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Ionicons,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import Icons from "react-native-vector-icons/MaterialCommunityIcons";

import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

import { URLs } from "../../constants";

const StartupStatistics = (props) => {
  const chartConfig = {
    backgroundGradientFrom: "green",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "green",
    backgroundGradientToOpacity: 0.7,
    color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
  };
  const chartConfig2 = {
    backgroundGradientFrom: "#00bd2c",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#00bd2c",
    backgroundGradientToOpacity: 0.7,
    color: (opacity = 0.5) => `rgba(213, 239, 240, ${opacity})`,
    strokeWidth: 1, // optional, default 3
    barPercentage: 0.8,
    useShadowColorFromDataset: false, // optional
  };

  const [email, setEmail] = useState("");
  const [barlables, setbarlables] = useState([]);
  const [bardata, setbardata] = useState([]);
  const [income, setincome] = useState([]);
  const [name, setName] = useState("");
  const [ordercount, setOcount] = useState("0");
  const [total, setTotal] = useState("0");
  const [expence, setExpence] = useState("0");
  const [profit, setProfit] = useState("0");
  const [br, setBr] = useState("");
  const [cmpcategory, setCategory] = useState("");
  const [orderdata, setorderdata] = useState([]);
  const [productdata, setproductdata] = useState([]);

  const data1 = {
    labels: barlables,
    datasets: [
      {
        data: bardata,
      },
    ],
  };
  const data2 = {
    labels: ["June", "July", "August", "September"],
    datasets: [
      {
        data: income,
      },
    ],
  };

  const [isLoading, setLoading] = useState(true);
  const [planEmail, setPlanEmail] = useState("");
  const [planExist, setPlanExist] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    const userId = await AsyncStorage.getItem("userId");
    const br_number = await AsyncStorage.getItem("br");
    await AsyncStorage.removeItem("br");
    console.log(br_number);
    fetch(URLs.cn + "/company/" + br_number)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
    setPlanEmail(email);
    let ll = 0;
    let lables = [];
    setBr(br_number);
    fetch(URLs.cn + "/product/br/" + br_number)
      .then((res) => res.json())
      .then((result) => {
        //console.log(result);
        ll = result.length;

        for (let i = 0; i < result.length; i++) {
          //console.log(data[i].product_name);
          lables.push(result[i].product_name);
        }
        setbarlables(lables);

        fetch(URLs.cn + "/order/" + br_number)
          .then((res) => res.json())
          .then((result) => {
            //console.log(result);
            let l = result.length;
            let c = 0;
            let dat = [];
            let totalinc = 0;
            let totalexp = 0;
            let incm = [0, 0, 0, 0];
            for (let i = 0; i < ll; i++) {
              dat[i] = 0;
            }
            for (let i = 0; i < l; i++) {
              let indx = lables.indexOf(result[i].product_name);
              dat[indx] = dat[indx] + result[i].quantity;
              if (result[i].order_status === "placed") {
                c = c + 1;
              }
              if (result[i].order_status === "completed") {
                let d = result[i].req_date;
                totalinc = totalinc + result[i].total;
                totalexp = totalexp + result[i].expence * result[i].quantity;
                let m = d.slice(5, 7);
                console.log(m);
                if (m === "06") {
                  incm[0] = incm[0] + result[i].total;
                } else if (m === "07") {
                  incm[1] = incm[1] + result[i].total;
                } else if (m === "08") {
                  incm[2] = incm[2] + result[i].total;
                } else if (m === "09") {
                  incm[3] = incm[3] + result[i].total;
                }
              }
            }
            let totalpro = totalinc - totalexp;
            setProfit(totalpro);
            setExpence(totalexp);
            setTotal(totalinc);
            setincome(incm);
            setOcount(c);
            setbardata(dat);
          });
      });
    setLoading(false);
  };
  useEffect(() => {
    // .catch((error) => console.error(error))
    getData();

    console.log(data);
  }, []);

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={() => getData()}
              refreshing={isLoading}
            />
          }
        >
          <Card style={styles.cardHeader}>
            <View>
              <Image source={{ uri: data.image }} style={styles.image} />
            </View>
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "row" }}>
                <Title style={styles.title}>{data.company_name}</Title>
                <MaterialIcons
                  style={{ marginTop: 7, marginLeft: 5 }}
                  name="verified"
                  size={15}
                  color="#0396FF"
                />
              </View>
            </View>
          </Card>

          <Card style={styles.profileCard}>
            <View style={styles.cardIcon}>
              <MaterialCommunityIcons
                style={{ marginTop: 5 }}
                name="finance"
                size={25}
                color="black"
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.fieldTitle}>Startup Type</Text>
                <Text style={styles.cardField}>{data.type}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.profileCard}>
            <View style={styles.cardIcon}>
              <MaterialCommunityIcons
                style={{ marginTop: 5 }}
                name="format-list-bulleted-type"
                size={25}
                color="black"
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.fieldTitle}>Startup Category</Text>
                <Text style={styles.cardField}>{data.category}</Text>
              </View>
            </View>
          </Card>
          <Card style={styles.profileCard}>
            <View style={styles.cardIcon}>
              <Ionicons
                style={{ marginTop: 5 }}
                name="call-outline"
                size={25}
                color="black"
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.fieldTitle}>Contact Number</Text>
                <Text style={styles.cardField}>{data.contact}</Text>
              </View>
            </View>
          </Card>

          <Card style={styles.profileCard}>
            <View style={styles.cardIcon}>
              <Fontisto
                style={{ marginTop: 5 }}
                name="email"
                size={25}
                color="black"
              />

              <View style={{ marginLeft: 20 }}>
                <Text style={styles.fieldTitle}>E-mail</Text>
                <Text style={styles.cardField}>{data.email}</Text>
              </View>
            </View>
          </Card>

          <View style={{ marginBottom: 10 }}>
            <BarChart
              style={styles.card2}
              data={data1}
              width={330}
              height={350}
              yAxisLabel=""
              chartConfig={chartConfig}
              verticalLabelRotation={30}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Card
              style={styles.card3}
              onPress={() => props.navigation.navigate("Orders")}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                <Text style={{ fontSize: 20 }}>Income</Text>
                <Text style={{ fontSize: 15 }}>LKR {total}.00</Text>
              </View>
            </Card>
            <Card
              style={styles.card3}
              onPress={() => props.navigation.navigate("Partners")}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                <Text style={{ fontSize: 20 }}>Expence</Text>
                <Text style={{ fontSize: 15 }}>LKR {expence}.00</Text>
              </View>
            </Card>
            <Card
              style={styles.card3}
              onPress={() => props.navigation.navigate("Partners")}
            >
              <View
                style={{
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                }}
              >
                <Text style={{ fontSize: 20 }}>Profit</Text>
                <Text style={{ fontSize: 15 }}>LKR {profit}.00</Text>
              </View>
            </Card>
          </View>

          <View style={{ marginBottom: 10 }}>
            <LineChart
              style={styles.card2}
              data={data2}
              width={330}
              height={350}
              yAxisLabel=""
              chartConfig={chartConfig2}
              verticalLabelRotation={30}
              bezier
            />
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#faf8f7",
  },
  btn: {
    padding: 3,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 20,
  },
  profileCard: {
    padding: 15,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  title: {
    marginTop: 20,
    alignItems: "center",
    marginLeft: 15,
    marginBottom: 30,
    fontSize: 25,
    textTransform: "uppercase",
    padding: 10,
  },

  fieldTitle: {
    fontWeight: "bold",
    marginTop: 1,
  },

  cardField: {
    marginTop: 2.5,
    fontSize: 17,
  },
  cardIcon: {
    flexDirection: "row",
  },
  image: {
    height: 150,
    width: 400,
    marginLeft: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  scrollcontainer: {
    flex: 1,
    marginTop: -22,
    backgroundColor: "white",
  },
  card: {
    borderRadius: 23,
    height: 70,
    width: 150,
    marginHorizontal: 15,
    backgroundColor: "white",
    marginVertical: 10,
  },
  card3: {
    borderRadius: 23,
    height: 80,
    width: 110,
    marginHorizontal: 5,
    backgroundColor: "white",
    marginVertical: 10,
  },
  card2: {
    borderRadius: 23,
    height: 350,
    width: 330,
    marginHorizontal: 15,
    backgroundColor: "white",
    marginVertical: 0,
    paddingHorizontal: 0,
  },
});

export default StartupStatistics;
