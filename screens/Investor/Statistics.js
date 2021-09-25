import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";

import { BarChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URLs } from "../../constants";

const MyBezierLineChart = () => {
  return <></>;
};

const Statistics = (props) => {
  const [isLoading, setLoading] = useState(true);
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
    const date = new Date();
    var month = date.getMonth().toString();
    if (month.length == 1) {
      month = "0" + month;
    }
    var year = date.getFullYear().toString();
    let labels = [];
    let values = [];

    fetch(URLs.cn + "/postplan/" + email)
      .then((response) => response.json())
      .then((json) => {
        for (let i = 0; i < json.length; i++) {
          const flag = false;
          console.log(month);
          console.log(year);
          if (year !== json[i].Startdate.slice(0, 4)) {
            flag = true;
          } else {
            if (month !== json[i].Startdate.slice(5, 7)) {
              flag = true;
            }
          }
          if (flag === true) {
            fetch(URLs.cn + "/company/" + json[i].br_number)
              .then((res) => res.json())
              .then((rst) => {
                if (rst.type === "product") {
                  const rate = json[i].interestRate;
                  labels.push(json[i].startupName);
                  var profit = 0;
                  fetch(URLs.cn + "/order/" + json[i].br_number)
                    .then((res) => res.json())
                    .then((result) => {
                      for (let j = 0; j < result.length; j++) {
                        const element = result[j];
                        const orderDate = result[j].req_date;
                        var orderMonth = parseInt(orderDate.slice(5, 6));
                        var currentMonth = parseInt(month);
                        if (orderMonth === currentMonth) {
                          profit =
                            profit +
                            result[j].total -
                            result[j].expence * result[j].quantity;
                        }
                      }
                      const x = (profit * rate) / 100;
                      values.push(x);
                    });
                } else {
                  const rate = json[i].interestRate;
                  labels.push(json[i].startupName);
                  var profit = 0;
                  fetch(URLs.cn + "/jobs/" + json[i].br_number)
                    .then((res) => res.json())
                    .then((result) => {
                      for (let j = 0; j < result.length; j++) {
                        const element = result[j];
                        const jobDate = result[j].date;
                        var jobMonth = parseInt(jobDate.slice(5, 7));
                        var currentMonth = parseInt(month);
                        if (jobMonth === currentMonth) {
                          profit = profit + result[j].price;
                        }
                      }
                      console.log(profit);
                      const x = (profit * rate) / 100;
                      values.push(x);
                      console.log(values[0]);
                      console.log(values[1]);
                      setbardata(values);
                    });
                }
              });
          }
        }
        setbarlables(labels);
        setLoading(false);

        console.log(labels);
      });
  };
  return (
    <View>
      {!isLoading ? (
        <ScrollView>
          <TouchableWithoutFeedback
            onPress={() => props.navigation.navigate("SubscribedStartups")}
          >
            <View style={styles.subscribedStartups}>
              <Image
                style={styles.image}
                source={require("../../assets/images/agreement.png")}
              />
              <Text style={styles.fieldTitle}>SUBSCRIBED STARTUPS</Text>
            </View>
          </TouchableWithoutFeedback>

          <View style={styles.container}>
            <View>
              <Text style={styles.header}>INTEREST ON LAST MONTH PROFIT</Text>
              <View>
                <BarChart
                  data={data1}
                  width={Dimensions.get("window").width - 16}
                  height={250}
                  yAxisLabel={"Rs"}
                  fromZero={true}
                  chartConfig={{
                    backgroundColor: "#1cc910",
                    backgroundGradientFrom: "#8ad1fd",
                    backgroundGradientTo: "#c5e8fe",
                    decimalPlaces: 2,
                    labelColor: (opacity = 1) => `rgba(1,40,64, ${opacity})`,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16,
                    },
                  }}
                  style={{
                    marginVertical: 8,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}
    </View>
  );
};

export default Statistics;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    padding: 10,
    textAlign: "center",
    backgroundColor: "#f4f4f4",
  },

  fieldTitle: {
    fontWeight: "bold",
    marginLeft: 40,
    marginTop: 18,
    fontSize: 18,
    color: "#025f98",
  },
  header: {
    color: "#025f98",
    fontSize: 20,
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 16,
    padding: 16,
    textAlign: "center",
  },
  image: {
    height: 55,
    marginLeft: 30,
    width: 55,
  },
  subscribedStartups: {
    backgroundColor: "#d4e0ff",
    borderColor: "#628cff",
    borderRadius: 8,
    borderWidth: 1.5,
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 50,
    marginTop: 20,
    padding: 13,
  },
});
