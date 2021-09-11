import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { Card, Badge } from "react-native-paper";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URLs } from "../../constants";

const MyBezierLineChart = () => {
  return <></>;
};

const Statistics = (props) => {
  const [barlables, setbarlables] = useState([]);
  const [bardata, setbardata] = useState([]);
  const [lineData, setLineData] = useState([]);
  const data1 = {
    labels: barlables,
    datasets: [
      {
        data: bardata,
      },
    ],
  };
  const data2 = {
    labels: ["July", "August", "September", "October"],
    datasets: [
      {
        data: lineData,
      },
    ],
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const email = await AsyncStorage.getItem("email");
    let labels = [];
    let values = [];
    fetch(URLs.cn + "/postplan/" + email)
      .then((response) => response.json())
      .then((json) => {
        let incm = [0, 0, 0, 0];
        for (let i = 0; i < json.length; i++) {
          labels.push(json[i].startupName);
          let x = (json[i].amount * json[i].interestRate) / 100;
          values.push(x);
          let d = json[i].Startdate;
          let m = d.slice(5, 7);
          if (m === "06") {
            incm[0] = incm[0] + x;
          } else if (m === "07") {
            incm[1] = incm[1] + x;
          } else if (m === "08") {
            incm[2] = incm[2] + x;
          } else if (m === "09") {
            incm[3] = incm[3] + x;
          }
        }
        setbarlables(labels);
        setbardata(values);
        setLineData(incm);
        console.log(incm[0]);
        console.log(incm[1]);
        console.log(incm[2]);
        console.log(incm[3]);
      });
  };
  return (
    <ScrollView>
      <View style={{ flexDirection: "row", marginLeft: 15 }}>
        <View>
          <Card
            style={styles.card}
            onPress={() => props.navigation.navigate("SubscribedStartups")}
          >
            <Image
              style={styles.image}
              source={require("../../assets/images/agreement.png")}
            />
            <View style={styles.cardIcon}>
              <Text style={styles.fieldTitle}>SUBSCRIBED STARTUPS</Text>
            </View>
          </Card>
        </View>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Bar Chart</Text>
          <View>
            <BarChart
              data={data1}
              width={Dimensions.get("window").width - 16}
              height={220}
              yAxisLabel={"Rs"}
              fromZero={true}
              chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#eff3ff",
                backgroundGradientTo: "#efefef",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
          {/* <Text style={styles.header}> Line Chart</Text> */}
          {/* <View>
            <LineChart
              data={data2}
              width={Dimensions.get("window").width - 16} // from react-native
              height={270}
              yAxisLabel={"Rs"}
              chartConfig={{
                backgroundColor: "#1cc910",
                backgroundGradientFrom: "#0093E9",
                backgroundGradientTo: "#80D0C7",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
              }}
              // bezier
              // style={{
              //   marginVertical: 8,
              //   borderRadius: 10,
              // }}
            />
          </View> */}
        </View>
      </View>
    </ScrollView>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: 10,
  },

  card: {
    padding: 15,
    marginTop: 30,
    marginBottom: 20,
    // marginLeft: 15,
    marginRight: 15,
    borderRadius: 10,
    shadowColor: "#000",
    width: 380,
    height: 140,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardIcon: {
    flexDirection: "row",
  },
  fieldTitle: {
    fontWeight: "bold",
    marginTop: 20,
  },
  header: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    padding: 16,
    marginTop: 16,
  },
  image: {
    width: 70,
    height: 70,
    marginLeft: 40,
  },
});
