import React from "react";

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

const MyBezierLineChart = () => {
  return (
    <>
      <Text style={styles.header}>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ["January", "February", "March", "April"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
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
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
      />
    </>
  );
};

// const MyProgressChart = () => {
//   return (
//     <>
//       <Text style={styles.header}>Progress Chart</Text>
//       <ProgressChart
//         data={[0.4, 0.5, 0.8]}
//         width={Dimensions.get("window").width - 16}
//         height={220}
//         chartConfig={{
//           backgroundColor: "#1cc910",
//           backgroundGradientFrom: "#eff3ff",
//           backgroundGradientTo: "#efefef",
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//       />
//     </>
//   );
// };

// const MyBarChart = () => {
//   return (
//     <>
//       <Text style={styles.header}>Bar Chart</Text>
//       <BarChart
//         data={{
//           labels: ["January", "February", "March", "April", "May", "June"],
//           datasets: [
//             {
//               data: [20, 45, 28, 80, 99, 43],
//             },
//           ],
//         }}
//         width={Dimensions.get("window").width - 16}
//         height={220}
//         yAxisLabel={"Rs"}
//         chartConfig={{
//           backgroundColor: "#1cc910",
//           backgroundGradientFrom: "#eff3ff",
//           backgroundGradientTo: "#efefef",
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//       />
//     </>
//   );
// };
// const MyStackedBarChart = () => {
//   return (
//     <>
//       <Text style={styles.header}>Stacked Bar Chart</Text>
//       <StackedBarChart
//         data={{
//           labels: ["Test1", "Test2"],
//           legend: ["L1", "L2", "L3"],
//           data: [
//             [60, 60, 60],
//             [30, 30, 60],
//           ],
//           barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"],
//         }}
//         width={Dimensions.get("window").width - 16}
//         height={220}
//         chartConfig={{
//           backgroundColor: "#1cc910",
//           backgroundGradientFrom: "#eff3ff",
//           backgroundGradientTo: "#efefef",
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//       />
//     </>
//   );
// };

// const MyPieChart = () => {
//   return (
//     <>
//       <Text style={styles.header}>Pie Chart</Text>
//       <PieChart
//         data={[
//           {
//             name: "Seoul",
//             population: 21500000,
//             color: "rgba(131, 167, 234, 1)",
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//           },
//           {
//             name: "Toronto",
//             population: 2800000,
//             color: "#F00",
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//           },
//           {
//             name: "New York",
//             population: 8538000,
//             color: "#ffffff",
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//           },
//           {
//             name: "Moscow",
//             population: 11920000,
//             color: "rgb(0, 0, 255)",
//             legendFontColor: "#7F7F7F",
//             legendFontSize: 15,
//           },
//         ]}
//         width={Dimensions.get("window").width - 16}
//         height={220}
//         chartConfig={{
//           backgroundColor: "#1cc910",
//           backgroundGradientFrom: "#eff3ff",
//           backgroundGradientTo: "#efefef",
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16,
//         }}
//         accessor="population"
//         backgroundColor="transparent"
//         paddingLeft="15"
//         absolute //for the absolute number remove if you want percentage
//       />
//     </>
//   );
// };

// const MyContributionGraph = () => {
//   return (
//     <>
//       <Text style={styles.header}>Contribution Graph</Text>
//       <ContributionGraph
//         values={[
//           { date: "2019-01-02", count: 1 },
//           { date: "2019-01-03", count: 2 },
//           { date: "2019-01-04", count: 3 },
//           { date: "2019-01-05", count: 4 },
//           { date: "2019-01-06", count: 5 },
//           { date: "2019-01-30", count: 2 },
//           { date: "2019-01-31", count: 3 },
//           { date: "2019-03-01", count: 2 },
//           { date: "2019-04-02", count: 4 },
//           { date: "2019-03-05", count: 2 },
//           { date: "2019-02-30", count: 4 },
//         ]}
//         endDate={new Date("2019-04-01")}
//         numDays={105}
//         width={Dimensions.get("window").width - 16}
//         height={220}
//         chartConfig={{
//           backgroundColor: "#1cc910",
//           backgroundGradientFrom: "#eff3ff",
//           backgroundGradientTo: "#efefef",
//           decimalPlaces: 2,
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//         }}
//       />
//     </>
//   );
// };

const Statistics = (props) => {
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
              <Badge
                style={{
                  marginLeft: 10,
                  backgroundColor: "#7367F0",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                5
              </Badge>
            </View>
          </Card>
        </View>
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
              <Badge
                style={{
                  marginLeft: 10,
                  backgroundColor: "#7367F0",
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                5
              </Badge>
            </View>
          </Card>
        </View>
      </View>
      <View style={styles.container}>
        <View>
          {/*Example of Bezier LineChart*/}
          <MyBezierLineChart />
          {/*Example of LineChart*/}
          {/* <MyLineChart /> */}
          {/*Example of Progress Chart*/}
          {/* <MyProgressChart /> */}
          {/*Example of Bar Chart*/}
          {/* <MyBarChart /> */}
          {/*Example of StackedBar Chart*/}
          {/* <MyStackedBarChart /> */}
          {/*Example of Pie Chart*/}
          {/* <MyPieChart /> */}
          {/*Example of Contribution Chart*/}
          {/* <MyContributionGraph /> */}
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
    width: 185,
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
