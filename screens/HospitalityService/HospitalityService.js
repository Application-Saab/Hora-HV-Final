import React, { useState } from "react";
import { StyleSheet, ScrollView, Text, View, Image, TouchableOpacity, TouchableHighlight } from 'react-native';
import CustomHeader from "../../components/CustomeHeader";
import DateTimePicker from '@react-native-community/datetimepicker';
import { PAYMENT, PAYMENT_STATUS } from '../../utils/ApiConstants';
import Geolocation from '@react-native-community/geolocation';
import { getCurrentPosition } from 'react-native-geolocation-service';

const HospitalityService = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isTimeValid, setTimeValid] = useState(null);
    const [isDateValid, setDateValid] = useState(null);
    const [errorText, setErrorText] = useState(null)
    const [isDatePressed, setIsDatePressed] = useState(false)
    const [isTimePressed, setIsTimePressed] = useState(false)

    const [categoryCounts, setCategoryCounts] = useState({
        waiter: 0,
        bartender: 0,
        cleaner: 0,
    });

    const decCat = [
        { id: '1', image: require('../../assets/waiter.jpeg'), name: 'Waiter', category: "waiter", price: 650 },
        { id: '2', image: require('../../assets/bartender.jpg'), name: 'Bartender', category: "bartender", price: 700 },
        { id: '3', image: require('../../assets/cleaner.jpg'), name: 'Cleaner', category: "cleaner", price: 700 },
    ];

    const increasePeopleCount = (category) => {
        setCategoryCounts(prevCounts => ({
            ...prevCounts,
            [category]: prevCounts[category] + 1,
        }));
    }

    const decreasePeopleCount = (category) => {
        if (categoryCounts[category] !== 0) {
            setCategoryCounts(prevCounts => ({
                ...prevCounts,
                [category]: prevCounts[category] - 1,
            }));
        }
    }

    const checkIsDateValid = () => {
        const currentTime = new Date();
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
        const timeDifference = selectedDateTime.getTime() - currentTime.getTime();
        const isDateGreaterThan24Hours = timeDifference >= 24 * 60 * 60 * 1000;
        setDateValid(isDateGreaterThan24Hours);
        return isDateGreaterThan24Hours
    }

    const checkIsTimeValid = () => {
        const isTimeBetweenRange = selectedTime.getHours() >= 7 && selectedTime.getHours() <= 22;
        setTimeValid(isTimeBetweenRange);
        return isTimeBetweenRange
    }


    const isOrderValid = isTimeValid && isDateValid > 0;

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            AsyncStorage.setItem("selectedDate", date.toString());
            setSelectedDate(date);
            setShowDatePicker(false);

            const isDateValid = checkIsDateValid();
            const isTimeValid = checkIsTimeValid();

            if (!isDateValid) {
                setErrorText('Order can be placed at least 24 hours in advance.');
                return;
            }
            else if (!isTimeValid) {
                setErrorText('*Order can be placed only between 7:00 AM to 10:00 PM');
                return;
            } else {
                setErrorText(null);
            }
        }
    };

    const handleTimeChange = (event, time) => {
        if (time !== undefined) {
            AsyncStorage.setItem("selectedTime", time.toString());
            setSelectedTime(time);
            setShowTimePicker(false);

            const isDateValid = checkIsDateValid();
            const isTimeValid = checkIsTimeValid();

            if (!isDateValid) {
                setErrorText('Order can be placed at least 24 hours in advance.');
                return;
            } else if (!isTimeValid) {
                setErrorText('*Order can be placed only between 7:00 AM to 10:00 PM');
                return;
            } else {
                setErrorText(null);
            }
        }
    };

    function formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (12 AM)
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }



    const getTotalAmount = () => {
        return decCat.reduce((total, item) => total + item.price * categoryCounts[item.category], 0);
    }

    const onContinueClick = () => {
        console.log("continue clicked");
        const totalAmount = getTotalAmount();
        console.log(`Selected items: ${JSON.stringify(categoryCounts)}, Total amount: ${totalAmount}`);
    }

    return (
        <ScrollView>
            <CustomHeader title={"Hospitality Service"} navigation={navigation} />
            <View style={styles.container}>
                <View style={styles.dataShow}>
                    {decCat.map((item, index) => (
                        <View key={index} style={styles.decImageContainer}>
                            <View>
                                <View style={styles.decContainer}>
                                    <View>
                                        <Image source={item.image} style={styles.decCatimage} />
                                        <Text style={styles.itemName}>{item.name}</Text>
                                    </View>

                                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 16 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 9 }}>
                                            <TouchableOpacity onPress={() => decreasePeopleCount(item.category)} activeOpacity={1}>
                                                <Image source={require('../../assets/ic_minus.png')} style={{ height: 22, width: 22, marginLeft: 2 }} />
                                            </TouchableOpacity>
                                            <Text style={{ marginLeft: 5, lineHeight: 23, fontSize: 18, marginTop: 2, width: 22, textAlign: 'center', color: 'black' }}>{categoryCounts[item.category]}</Text>
                                            <TouchableOpacity onPress={() => increasePeopleCount(item.category)} activeOpacity={1}>
                                                <Image source={require('../../assets/plus.png')} style={{ height: 22, width: 22, marginLeft: 5 }} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>

                                <View style={styles.selectedDate}>

                                    <View style={{ flexDirection: 'row' }}>

                                        <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={1}>

                                            <View style={{ marginStart: 0, marginEnd: 18, flexDirection: 'column', paddingHorizontal: 17, backgroundColor: 'white', borderColor: isDateValid != null && isDateValid == false ? '#FF3636' : "#F6ECEC", borderRadius: 10, borderWidth: 1, paddingBottom: 9 }}>
                                                <Text style={{ paddingTop: 4, color: '#9252AA', fontWeight: '500', fontSize: 10 }}>Booking Date</Text>
                                                <View style={{ flexDirection: 'row', marginTop: 1 }}>

                                                    <Text style={{ fontSize: 16, fontWeight: 600, color: isDatePressed ? '#383838' : "grey" }}>{selectedDate.toLocaleDateString()}</Text>

                                                    <Image source={require('../../assets/ic_calendar.png')} style={{ height: 19, width: 19, marginLeft: 17 }} />
                                                    {showDatePicker && (
                                                        <DateTimePicker
                                                            value={selectedDate}
                                                            mode="date"
                                                            display="default"
                                                            minimumDate={minimumDate}
                                                            onChange={handleDateChange}
                                                        />
                                                    )}
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TouchableOpacity onPress={() => setShowTimePicker(true)} activeOpacity={1}>
                                                <View style={{ flexDirection: 'column', paddingHorizontal: 21, backgroundColor: 'white', borderColor: isTimeValid != null && isTimeValid == false ? '#FF3636' : "#F6ECEC", borderRadius: 10, borderWidth: 1, paddingBottom: 9 }}>
                                                    <Text style={{ paddingTop: 4, color: '#9252AA', fontWeight: '500', fontSize: 10 }}>Service time</Text>
                                                    <View style={{ flexDirection: 'row', marginTop: 1 }}>

                                                        <Text style={{ fontSize: 16, fontWeight: 600, color: isTimePressed ? '#383838' : "grey" }}>
                                                            {formatTime(selectedTime)}
                                                        </Text>
                                                        <Image source={require('../../assets/clock.png')} style={{ height: 19, width: 19, marginLeft: 17 }} />
                                                        {showTimePicker && (
                                                            <DateTimePicker
                                                                value={selectedTime}
                                                                mode="time"
                                                                display="default"
                                                                onChange={handleTimeChange}
                                                            />
                                                        )}
                                                    </View>

                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    {errorText != null && (
                                        <View style={{ marginStart: 21 }}>
                                            <Text style={{ fontSize: 9, fontWeight: '400', color: '#FF2F2F', marginTop: 4 }}>{errorText}</Text>
                                        </View>
                                    )}
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 9, marginBottom: 20, marginLeft: 1, marginRight: 1 }}>
                                    <Image style={styles.verticalSeparator} source={require('../../assets/verticalSeparator.png')}></Image>
                                </View>
                            </View>
                        </View>
                    ))}


                </View>

                <View style={{ paddingHorizontal: 16, paddingTop: 5, justifyContent: 'space-between' }}>
                    <TouchableHighlight
                        // onPress={() => addDish(selectedProducts, totalPrice)}
                        style={[
                            styles.continueButton,
                            {
                                backgroundColor: Object.values(categoryCounts).some(count => count > 0) ? '#9252AA' : '#F9E9FF',
                                borderColor: Object.values(categoryCounts).some(count => count > 0) ? '#9252AA' : '#F9E9FF',
                            },
                        ]}
                        underlayColor="#9252AA"
                        activeOpacity={1}
                        disabled={Object.values(categoryCounts).reduce((totalCount, count) => totalCount + count, 0) === 0}
                    >
                        <View style={styles.buttonContent}>
                            <Text
                                style={[
                                    styles.continueButtonLeftText,
                                    { color: Object.values(categoryCounts).some(count => count > 0) ? 'white' : '#343333' },
                                ]}
                            >
                                Continue
                            </Text>
                            <Text
                                style={[
                                    styles.continueButtonRightText,
                                    { color: Object.values(categoryCounts).some(count => count > 0) ? 'white' : '#343333' },
                                ]}
                            >
                                {Object.values(categoryCounts).reduce((totalCount, count) => totalCount + count, 0)} Items | ₹ {getTotalAmount()}

                            </Text>

                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 10,
        paddingTop: 10,
    },
    separator1: { height: 1, width: 70, marginTop: 10, marginLeft: 5 },
    decContainer: {
        flexDirection: 'row',
        padding: 0,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    itemName: {
        color: '#000',
        marginHorizontal: 'auto',
        marginVertical: 0,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '600',
    },
    decCatimage: {
        width: '100%',
        width: 80,
        height: 80,
        borderRadius: 10,
        marginBottom: 3,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    continueButton: {
        marginTop: 10,
        backgroundColor: 'gray',
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 21,
        paddingEnd: 20,
        paddingVertical: 17,
        borderRadius: 20,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between"
    },
    continueButtonLeftText: {
        color: 'white',
        fontSize: 19,
        fontWeight: '500',
    },
    continueButtonRightText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '400',
    },
    verticalSeparator: {
        height: 1,
        width: 295
    },
});

export default HospitalityService;
