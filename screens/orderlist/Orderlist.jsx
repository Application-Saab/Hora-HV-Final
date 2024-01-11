import React, { useState, useEffect } from 'react';
import { ScrollView, Linking, View, StyleSheet, Text, Image, TextInput, TouchableHighlight, Button, ImageBackground, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL, ORDERLIST_ENDPOINT, GET_USER_DETAIL_ENDPOINT } from '../../utils/ApiConstants';
import CustomHeader from '../../components/CustomeHeader';
// import Share from 'react-native-share';


const Orderlist = ({ navigation  }) => {
    const [orderData, setOrderData] = useState({})
    const [userId, setUserId] = useState('')
    const [invitedate, setInviteDate] = useState('')
    const [token, setToken] = useState('');

    const handleOrderDetails = (e , a) => {
         navigation.navigate('OrderDetails' , {'apiOrderId': e , 'orderId':a} )
    }

    AsyncStorage.getItem('token')
        .then((storedToken) => {
            if (storedToken) {
                setToken(storedToken)
                // Do something with the token
            } else {
                console.log('Token not found in AsyncStorage');
            }
        })
        .catch((error) => {
            console.error('Error retrieving token:', error);
        });


    useEffect(() => {
        const fetchUserAccount = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('token');
                if (storedToken) {
                    setToken(storedToken);
                    const response = await fetch(BASE_URL + GET_USER_DETAIL_ENDPOINT, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'authorization': token,
                        },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        setUserId(userData.data._id);
                        fetchOrderList();
                    } else {
                        const errorData = await response.json();
                        console.log(`Error fetching user account: ${errorData.message}`);
                    }
                } else {
                    console.log('Token not found in AsyncStorage');
                }
            } catch (error) {
                console.error('Error fetching user account:', error);
            }
        };

        const fetchOrderList = async () => {
            try {
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
                if (responseData.data.order) {
                    setOrderData(responseData.data.order);
                } else {
                    console.log("No orders found");
                }
            } catch (error) {
                console.log("Error fetching orders:", error);
            }
        };

        fetchUserAccount();
    }, [userId, token]);


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
            return "expire"
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <CustomHeader title={"Order History"} navigation={navigation} />
            <View style={styles.container}>
                {
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
                                            orderData[item].order_status == "3" ?
                                                <Text style={styles.orderstatus3}>
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
                                            <View style={{ textAlign: "right", listStyle: "none" }}>
                                                <Text style={{ color: "rgba(146, 82, 170, 1)", fontSize: 16, fontWeight: "600" }}>Total Payment</Text>
                                            </View>
                                            <View style={{ textAlign: "right", listStyle: "none", paddingTop: 24 }}>
                                                <Text style={{ color: "rgba(146, 82, 170, 1)", fontSize: 16, fontWeight: "600", textAlign: "right" }}>
                                                    {"₹" + "" + orderData[item].payable_amount + ".00"}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </View>
                                <View style={styles.sec2}>
                                    <View>
                                        <TouchableHighlight style={styles.button} underlayColor="#FF7940" onPress={() => handleOrderDetails(orderData[item]._id , orderData[item].order_id)}>
                                            <View><Text style={styles.buttonText}>View Details</Text></View>
                                        </TouchableHighlight>
                                    </View>

                                    <View>
                                        {getOrderStatus(orderData[item].order_status) === 'Booked' ? (
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
                }
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        backgroundColor: 'white'

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
    ulclass: {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingBottom: 0,
        paddingTop: 5,
        paddingLeft: 0,
        paddingRight: 0
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