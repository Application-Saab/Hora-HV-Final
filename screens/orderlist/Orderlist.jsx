import React, { useState, useEffect } from 'react';
import { ScrollView, Linking, View, StyleSheet, ActivityIndicator ,Text, Image, TextInput, TouchableHighlight, Button, ImageBackground, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, ORDERLIST_ENDPOINT, GET_USER_DETAIL_ENDPOINT } from '../../utils/ApiConstants';
import CustomHeader from '../../components/CustomeHeader';
// import Share from 'react-native-share';
import Loader from '../../components/Loader';


const Orderlist = ({ navigation }) => {
    const [orderData, setOrderData] = useState({})
    const [userId, setUserId] = useState('')
    const [invitedate, setInviteDate] = useState('')
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(true);
    const handleOrderDetails = (e, a) => {
        navigation.navigate('OrderDetails', { 'apiOrderId': e, 'orderId': a })
    }

    useEffect(() => {
        const fetchOrderList = async () => {
            try {
                setLoading(true);
                const userId = await AsyncStorage.getItem("userID");
                console.log(userId);
                const response = await fetch(BASE_URL + ORDERLIST_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "page": "1",
                        "_id": userId,
                    }),
                });
                const responseData = await response.json();

                console.log("responseData.data.order", responseData.data.order)
                if (responseData && responseData.data && responseData.data.order) {
                    const sortedOrders = responseData.data.order.sort((a, b) => new Date(b.order_date) - new Date(a.order_date));
                    setOrderData(sortedOrders);
                } else {
                    console.log("No orders found======");
                    setOrderData([]); // Set an empty array if no orders are found
                }
            } catch (error) {
                console.log("Error fetching orders:", error);
            }
            finally {
                setLoading(false); // Set loading to false when the API request is completed
            }
        };

        fetchOrderList();
    }, []);



    const sendInvite = (dishes) => {
        // let message = `You are Invited!!!
        // * * * * * *
        // Enjoy the gathering with specially cooked by professional chef from hora `;

        // message = message + dishes.order_date.slice(0, 10);

        // message = message + ' ' + dishes.order_time;

        // dishes.selecteditems.forEach((dish,index) => {
        //   message += '\n' + (index+1) + '. ' + dish.name;
        // });

        // if (dishes.addressId != null)
        // {message = message + '\n At ' + dishes.addressId.address1 + ' ' + dishes.addressId.address2 +   `\nhttps://play.google.com/store/apps/details?id=com.hora`;}

        // // Add the rest of your message here
        // // ...

        // const shareOptions = {
        //   message: message,
        // };

        // try {
        //   const ShareResponse = Share.open(shareOptions);
        // } catch (error) {
        //   alert("error" + error);
        // }
    };



    const getOrderStatus = (orderStatusValue) => {
        if (orderStatusValue === 0) {
            return "Booked"
        }
        if (orderStatusValue == 1) {
            return "Accepted"
        }
        if (orderStatusValue === 2) {
            return "In-progress"
        }
        if (orderStatusValue === 3) {
            return "Completed"
        }
        if (orderStatusValue === 4) {
            return "Cancelled"
        }
        if (orderStatusValue === 5) {
            return ""
        }
        if (orderStatusValue === 6) {
            return "Expired"
        }
    }

    const getOrderId = (e) => {
        const orderId1 = 10800 + e
        const updateOrderId = "#" + orderId1
        AsyncStorage.setItem("orderId", updateOrderId)
        return updateOrderId;
    }

    const getorderDate = (dateValue) => {
        var str = dateValue;
        var strArray = str.split("T");
        var d1 = new Date(strArray[0])
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = months[d1.getMonth()]; // No need to subtract 1 here
        var dateValueUpdate = d1.getDate() + " " + month + " , " + d1.getFullYear()
        return dateValueUpdate;
    }


    return (
        <ScrollView style={styles.screenContainer}>
            <CustomHeader title={"Order History"} navigation={navigation} />
         
            <View style={styles.container}>
                {loading ?(
                     <View style={styles.loaderContainer}>
                     <Loader loading={loading} />
                 </View>
                ):
                orderData.length > 0 ? (
                    Object.keys(orderData).map((item, index) => {
                        return (
                            <View key={index}
                                style={{
                                    marginBottom: 10,
                                    shadowColor: '#9f9e9e',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 3,
                                    shadowRadius: 2,
                                    elevation: 1,
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 20
                                }}
                            >
                                <View style={styles.sec1}>
                                    <View style={{ display: "flex", flexDirection: "row" }}>
                                        <Text style={{ paddingLeft: 10, color: "rgba(146, 82, 170, 1)", fontWeight: '700', fontSize: 11 }}>Order Id</Text>
                                        <Text style={{ paddingLeft: 9, color: "rgba(146, 82, 170, 1)", fontWeight: '700', fontSize: 11 }}>
                                            {getOrderId(orderData[item].order_id)}
                                        </Text>
                                    </View>
                                    <View>
                                        {
                                            orderData[item].order_status === 3 || orderData[item].order_status === 2 ?
                                                <Text style={styles.orderstatus3}>
                                                    {getOrderStatus(orderData[item].order_status)}
                                                </Text> : orderData[item].order_status === 0 ?
                                                    <Text style={styles.orderstatus4}>
                                                        {getOrderStatus(orderData[item].order_status)}
                                                    </Text> :
                                                    <Text style={styles.orderstatus}>
                                                        {getOrderStatus(orderData[item].order_status)}
                                                    </Text>
                                        }
                                    </View>
                                </View>
                                <View style={styles.sec}>
                                    <View>
                                        <View style={styles.ulclass1}>
                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", listStyle: "none" }}>
                                                <Image source={require('../../assets/date-time-icon.png')} style={{
                                                    height: 13,
                                                    width: 13
                                                }} />

                                                <Text style={{
                                                    marginLeft: 8,
                                                    color: 'rgba(65, 65, 65, 1)',
                                                    fontWeight: '600'
                                                }}>
                                                    {getorderDate(orderData[item].order_date)}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", listStyle: "none", paddingTop: 6, paddingBottom: 6 }}>

                                                <Image source={require('../../assets/Time-Circle.png')} style={{
                                                    height: 13,
                                                    width: 13
                                                }} />

                                                <Text style={{
                                                    marginLeft: 8,
                                                    color: 'rgba(65, 65, 65, 1)',
                                                    fontWeight: '600'
                                                }}>
                                                    {orderData[item].order_time}</Text>
                                            </View>
                                            <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", listStyle: "none" }}>

                                                <Image source={require('../../assets/User.png')} style={{
                                                    height: 13,
                                                    width: 13
                                                }} />

                                                <Text style={{
                                                    marginLeft: 8,
                                                    color: 'rgba(65, 65, 65, 1)',
                                                    fontWeight: '600'
                                                }}>
                                                    {orderData[item].no_of_people} People</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View >
                                        <View style={styles.ulclass}>
                                           
                                            <View style={{ textAlign: "right", listStyle: "none", paddingTop: 4 }}>
                                            <Text style={{ color: "rgba(146, 82, 170, 1)", fontSize: 12, fontWeight: "600" , paddingLeft:13 }}>Total Amount</Text>
                                                <Text style={{ color: "rgba(146, 82, 170, 1)", fontSize: 12, fontWeight: "600", textAlign: "right" }}>
                                                    {"₹" + "" + orderData[item].payable_amount + ".00"}</Text>
                                            </View>
                                          
                                            <View style={{ textAlign: "right", listStyle: "none", paddingTop: 4 }}>
                                            <Text style={{ color: "rgba(146, 82, 170, 1)", fontSize: 12, fontWeight: "600" }}>Balance Amount</Text>

                                                <Text style={{ color: "rgba(146, 82, 170, 1)", fontSize: 12, fontWeight: "600", textAlign: "right" }}>
                                                    {"₹" + "" + orderData[item].payable_amount + ".00"}</Text>
                                            </View>
                                        </View>
                                      
                                    </View>
                                </View>
                                <View style={styles.sec2}>
                                    <View>
                                        <TouchableHighlight style={styles.button} underlayColor="#FF7940" onPress={() => handleOrderDetails(orderData[item]._id, orderData[item].order_id)}>
                                            <View><Text style={styles.buttonText}>View Details</Text></View>
                                        </TouchableHighlight>
                                    </View>

                                    <View>
                                        {getOrderStatus(orderData[item].order_status) === 'Booked' || getOrderStatus(orderData[item].order_status) === 'Accepted' || getOrderStatus(orderData[item].order_status) === 'In-progress' ? (
                                            <TouchableHighlight style={styles.ratingbutton} underlayColor="#E56352" onPress={() => sendInvite(orderData[item])}>
                                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                                                    <View><Text style={styles.ratingbuttonText}>Send Invite</Text></View>
                                                </View>
                                            </TouchableHighlight>
                                        ) : null}
                                    </View>

                                </View>
                            </View>
                        )
                    })
                )
                :(
                    orderData.length === 0 && (
                        <View style={styles.noOrdersContainer}>
                            <Text style={{ fontWeight: '500', fontSize: 14, color: "#9252AA" }}>You don't have any orders yet. Please place the order to make your party memorable</Text>
                            <View style={{ paddingHorizontal: 16, paddingTop: 5, justifyContent: 'space-between' }}>
                                <TouchableHighlight
                                    onPress={() => navigation.navigate('Home')}
                                    style={
                                        styles.continueButton
                                    }
                                >
                                    <View style={styles.buttonContent}>
                                        <Text
                                            style={
                                                styles.continueButtonLeftText
                                            }
                                        >
                                            Continue
                                        </Text>
    
    
                                    </View>
                                </TouchableHighlight>
    
                            </View>
                        </View>
                    )
                )
                }
               
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        backgroundColor: 'white'
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"red",
    },
    sec: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingBottom: 13,
        paddingLeft: 15,
        paddingRight: 15
    },
    sec2: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        paddingBottom: 16,
        paddingTop: 13,
        paddingLeft: 15,
        paddingRight: 15,
        borderTopColor: 'rgba(236, 236, 236, 0.5)',
        borderTopWidth: 1,
    },
    sec1: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        paddingTop: 6,
        paddingBottom: 6,
        paddingRight: 6,
        paddingLeft: 6,
        backgroundColor: "#E7E7E7",
        color: "#9252AA",
        fontWeight: "bold"
    },
    orderstatus: {
        color: 'rgba(255, 121, 64, 1)',
        backgroundColor: "rgba(255, 121, 64, 0.2)",
        borderRadius: 20,
        textAlign: 'center',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 3,
        fontSize: 10,
        fontWeight: '500'
    },
    orderstatus3: {
        color: 'rgba(72, 169, 63, 1)',
        backgroundColor: "rgba(72, 169, 63, 0.2)",
        borderRadius: 20,
        textAlign: 'center',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 3,
        fontSize: 10,
        fontWeight: '500'
    },
    orderstatus4: {
        color: 'orange',
        backgroundColor: "rgba(72, 169, 63, 0.2)",
        borderRadius: 20,
        textAlign: 'center',
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 2,
        paddingBottom: 3,
        fontSize: 10,
        fontWeight: '500'
    },
    ulclass: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingBottom: 0,
        paddingTop: 5,
        paddingLeft: 0,
        paddingRight: 0,
        textAlign:"right",
    },
    ulclass1: {
        marginTop: 8,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingBottom: 0,
        paddingTop: 0,
        paddingLeft: 0,
        paddingRight: 0
    },
    button: {
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#9252AA",
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontWeight: '400',
        fontSize: 14,
        color: "#9252AA"
    },

    ratingbutton: {
        marginTop: 0,
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#9252AA",
        borderColor: "#9252AA",
        borderWidth: 1,
        color: "#fff",
        paddingTop: 3,
        paddingBottom: 3,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: "center",
        alignItems: "center",
        justifyContent: "center",
        alignItems: "center"
    },
    ratingbuttonText: {
        fontWeight: '400',
        fontSize: 14,
        color: "#fff"
    },
    ratingimage: {
        width: 13,
        height: 13,
        position: "relative",
        marginRight: 7,
        position: "relative"
    }
})

export default Orderlist;