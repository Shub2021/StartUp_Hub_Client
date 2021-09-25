import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Platform,
} from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { URLs } from "../../constants";

//ADD localhost address of your server
const API_URL = URLs.cn;

const StripeApp = (props) => {
  const [item, setItem] = useState(props.route.params.product);
  const [br_number, setBr] = useState(props.route.params.product.br_number);
  const [product_name, setProduct_name] = useState(
    props.route.params.product.product_name
  );
  const [product_id, setProduct_id] = useState(props.route.params.product._id);
  const [order_status, setOrder_status] = useState("placed");
  const [req_date, setReq_date] = useState("");
  const [unitprice, setUnitprice] = useState(
    props.route.params.product.unitprice
  );
  const [total, setTotal] = useState(props.route.params.total);
  const [payment_status, setPayment_status] = useState("partital");
  const [client_id, setClient_id] = useState(props.route.params.email);
  const [expence, setExpence] = useState(props.route.params.product.expence);
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    const d = currentDate;
    const newdate = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const paymentDate = year + "-" + month + "-" + newdate;
    setReq_date(paymentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  React.useEffect(() => {
    getCurrentDate();
  }, []);

  const getCurrentDate = () => {
    const d = date;
    const newdate = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    const paymentDate = year + "-" + month + "-" + newdate;
    setReq_date(paymentDate);
  };

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/payment/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      amount: total,
    };
    //2.Fetch the intent client secret from the backend
    try {
      // const d = date;
      // const date = d.getDate();
      // const month = d.getMonth();
      // const year = d.getFullYear();

      const qty = total / unitprice;

      // paymentDate = year + "-" + month + "-" + date;
      // setDate(paymentDate);
      // console.log(paymentDate);

      // console.log(year);
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          fetch(URLs.cn + "/order", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              product_name: product_name,
              product_id: product_id,
              br_number: br_number,
              order_status: order_status,
              req_date: req_date,
              unitprice: unitprice,
              expence: expence,
              quantity: qty,
              total: total,
              payment_status: payment_status,
              client_id: client_id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              alert("Payment Successful");
              console.log("Payment successful");
              props.navigation.navigate("Item", item);
            });
        } else if (paymentIntent) {
          console.log(paymentIntent);
          fetch(URLs.cn + "/order", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              product_name: product_name,
              product_id: product_id,
              br_number: br_number,
              order_status: order_status,
              req_date: req_date,
              unitprice: unitprice,
              expence: expence,
              quantity: qty,
              total: total,
              payment_status: payment_status,
              client_id: client_id,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              alert("Payment Successful");
              console.log("Payment successful", paymentIntent);
              props.navigation.navigate("Item", item);
            });
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      {/* <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={(value) => setEmail(value.nativeEvent.text)}
        style={styles.input}
      /> */}
      <Text style={styles.input}>Fee : LKR.{total.toFixed(2)}</Text>

      <View>
        <View>
          <Button
            onPress={showDatepicker}
            title="Set the Request Date First!"
          />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minimumDate={new Date()}
          />
        )}
      </View>
      <Text style={styles.input}>Order Request Date : {req_date}</Text>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "Enter the card number",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={(cardDetails) => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
