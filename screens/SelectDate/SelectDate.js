import React, { useState, useRef, useEffect } from 'react';
import { Dimensions, ImageBackground, FlatList, ScrollView, StatusBar, View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight, BackHandler } from 'react-native';
import styles from './styles';
import axios from 'axios';
import CustomStatusBar from '../../components/CustomStatusBar';
import { BASE_URL, GET_CUISINE_ENDPOINT, API_SUCCESS_CODE, GET_MEAL_DISH_ENDPOINT } from '../../utils/ApiConstants';
import DateTimePicker from '@react-native-community/datetimepicker';
import OrderWarning from '../dialog/OrderWarning';

const SelectDate = ({ navigation, route }) => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [peopleCount, setPeopleCount] = useState(0);
    const [activeTab, setActiveTab] = useState('left');
    const data = route.params.selectedDishDictionary;
    const [dishPrice, setDishPrice] = useState(route.params.price);
    const [showAll, setShowAll] = useState(false);
    const [burnerCount, setBurnerCount] = useState(0)
    const [isWarningVisible, setWarningVisible] = useState(false);
    const [isTimeValid, setTimeValid] = useState(null);
    const [isDateValid, setDateValid] = useState(null);
    const [errorText, setErrorText] = useState(null)
    const [isDatePressed, setIsDatePressed] = useState(false)
    const [isTimePressed, setIsTimePressed] = useState(false)
    const [showCookingTime, setShowCookingTime] = useState(true);



    const checkIsDateValid =() => {
        const currentTime = new Date();
        const selectedDateTime = new Date(selectedDate);
        selectedDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());
        const timeDifference = selectedDateTime.getTime() - currentTime.getTime();
        const isDateGreaterThan24Hours = timeDifference >= 24 * 60 * 60 * 1000;
        setDateValid(isDateGreaterThan24Hours);
        return isDateGreaterThan24Hours
    }

    const checkIsTimeValid =() => {
        const isTimeBetweenRange = selectedTime.getHours() >= 7 && selectedTime.getHours() <= 22;
        setTimeValid(isTimeBetweenRange);
        return isTimeBetweenRange
    }

    const isOrderValid = isTimeValid && isDateValid && peopleCount > 0;



    // const handleDateChange = (event, date) => {
    //     if (date !== undefined) {
    //         setSelectedDate(date);
    //         setIsDatePressed(true)
    //         setShowDatePicker(false);
    //         if(checkIsDateValid()==false){
    //             setErrorText('*Order can be placed at least 24 hours in advance.')
    //             return
    //         }
    //         else{
    //             setErrorText(null)
    //         }

    //         if(checkIsTimeValid()==false){
    //             setErrorText('*Order can be placed only between 7:00 AM to 10:00 PM')
    //             return
    //         }
    //         else{
    //             setErrorText(null)
    //         }
    //     }
    // };

    const handleDateChange = (event, date) => {
        if (date !== undefined) {
            setSelectedDate(date);
            setShowDatePicker(false);
    
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
    
    const handleTimeChange = (event, time) => {
        if (time !== undefined) {
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
    


    const RenderAppliances = ({ item }) => {
        return (
            <View style={{ height: 51, paddingEnd: 2, alignItems: 'center', borderRadius: 5, borderColor: '#DADADA', borderWidth: 0.5, flexDirection: 'row', marginRight: 6, marginBottom: 8 }}>
                <View style={{ marginLeft: 5, width: 40, height: 40, backgroundColor: '#F0F0F0', borderRadius: 3, alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                    <Image source={{ uri: `https://horaservices.com/api/uploads/${item.image}` }} style={{ width: 33, height: 34 }} />
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 1, width: 43 }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: '#414141', lineHeight: 15 }} numberOfLines={2}>{item.name}</Text>
                </View>
            </View>
        );
    };

    const RenderIngredients = ({ item }) => {
        return (
            <View style={{ height: 51, paddingEnd: 2, alignItems: 'center', borderRadius: 5, borderColor: '#DADADA', borderWidth: 0.5, flexDirection: 'row', flex: 1, marginRight: 6, marginBottom: 8 }}>
                <View style={{ marginLeft: 5, width: 40, height: 40, backgroundColor: '#F0F0F0', borderRadius: 3, alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
                    <Image source={{ uri: `https://horaservices.com/api/uploads/${item.image}` }} style={{ width: 31, height: 24 }} />
                </View>

                <View style={{ flexDirection: 'column', marginLeft: 1, width: 43 }}>
                    <Text style={{ fontSize: 10, fontWeight: '500', color: '#414141', maxWidth: 120 }} numberOfLines={1}>{item.name}</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#9252AA' }}>{item.qty} KG</Text>
                </View>
            </View>
        );
    };

    const renderPreparationText = ({ items }) => {
        if (showAll) {
            return items.map((item, index) => (
                <Text key={index} style={styles.item}>{`${index + 1}. ${item}`}</Text>
            ));
        } else {
            return items
                .filter(item => item.length >= 2)
                .slice(0, 2)
                .map((item, index) => (
                    <Text key={index} style={styles.item}>{`${index + 1}. ${item}`}</Text>
                ));
        }
    };



    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const LeftTabContent = ({ burnerCount, ApplianceList }) => {
        return (
            <View style={{ paddingHorizontal: 15, flexDirection: 'column', marginLeft: 16, marginEnd: 20, borderWidth: 1, elevation: 1, backgroundColor: 'white', borderBottomRightRadius: 15, borderBottomLeftRadius: 15, borderColor: 'white' }}>
                <View style={{ flexDirection: 'column' }}>
                    <Text style={{ color: '#000000', fontSize: 13, fontWeight: '600', marginTop: 20 }}>Required Burners</Text>
                    <Text style={{ color: '#969696', fontSize: 11, fontWeight: '500', marginTop: 6 }}>(Burners would be used at your location)</Text>

                </View>

                <View style={{ width: 90, height: 54, flexDirection: 'column', borderColor: "#DADADA", borderWidth: 0.5, borderRadius: 5, marginTop: 19 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image style={styles.burner} source={require('../../assets/burner.png')} />
                        <Text style={{ marginStart: 12, marginVertical: 6, fontSize: 26, color: "#9252AA" }}>{burnerCount}</Text>

                    </View>

                </View>
                {ApplianceList.length > 0 && (

                    <View style={{ flexDirection: 'column', marginTop: 11 }}>

                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: '#000000', fontSize: 13, fontWeight: '600' }}>Requires Special Appliances</Text>
                            <Text style={{ color: '#969696', fontSize: 11, fontWeight: '500', marginTop: 7 }}>(Keep these appliances ready at your location)</Text>

                        </View>

                    </View>
                )}

                {ApplianceList.length > 0 && (
                    <View style={{ flexDirection: 'row', marginTop: 11 }}>
                        <Image style={styles.verticalSeparator} source={require('../../assets/verticalSeparator.png')}></Image>
                    </View>
                )}


                <View style={{ flexDirection: 'column', marginTop: 8 }}>
                    <FlatList
                        data={ApplianceList}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <RenderAppliances item={item} />}
                        numColumns={3}

                    />

                </View>

                {preparationTextList.length > 0 && (
                    <View style={{ flexDirection: 'column', backgroundColor: '#F9E9FF', borderRadius: 15, paddingHorizontal: 10 }}>
                        <View style={styles.header}>
                            <Text style={{ color: '#9252AA', fontWeight: '500', fontSize: 10 }}>Readiness Required*</Text>
                            <TouchableOpacity onPress={toggleShowAll} activeOpacity={1}>
                                <Text style={styles.showAllText}>{showAll ? 'Show Less' : 'Show All'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            {renderPreparationText(preparationTextList)}
                        </View>
                    </View>
                )}

            </View>
        );
    };

    const RightTabContent = ({ ingredientList }) => {
        return (
            <ScrollView>
                <View style={{ paddingHorizontal: 15, flexDirection: 'column', marginLeft: 16, marginEnd: 20, borderWidth: 1, elevation: 1, backgroundColor: 'white', borderBottomRightRadius: 15, borderBottomLeftRadius: 15, borderColor: 'white', paddingBottom: 10 }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ color: '#000000', fontSize: 13, fontWeight: '600', marginTop: 20 }}>Required Ingredient</Text>
                        <Text style={{ color: '#969696', fontSize: 11, fontWeight: '500', marginTop: 6 }}>(Keep these ingredient ready at your location)</Text>

                    </View>

                    <View style={{ flexDirection: 'column', marginTop: 15 }}>
                        <FlatList
                            data={ingredientList}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => <RenderIngredients item={item} />}
                            numColumns={3}

                        />

                    </View>

                    {preparationTextList.length > 0 && (
                        <View style={{ flexDirection: 'column', backgroundColor: '#F9E9FF', borderRadius: 15, paddingHorizontal: 10 }}>
                            <View style={styles.header}>
                                <Text style={{ color: '#9252AA', fontWeight: '500', fontSize: 10 }}>Readiness Required*</Text>
                                <TouchableOpacity onPress={toggleShowAll} activeOpacity={1}>
                                    <Text style={styles.showAllText}>{showAll ? 'Show Less' : 'Show All'}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flexDirection: 'column' }}>
                                {renderPreparationText(preparationTextList)}
                            </View>
                        </View>
                    )}


                </View>
            </ScrollView>

        );
    };

    const getTotalIngredients = () => {
        const totalIngredients = {};
        for (const dishId in data) {
            const dish = data[dishId];
            if (dish.ingredientUsed) {
                dish.ingredientUsed.forEach((ingredient) => {
                    if (!totalIngredients[ingredient._id]) {
                        totalIngredients[ingredient._id] = {
                            _id: ingredient._id,
                            name: ingredient.name,
                            image: ingredient.image,
                            unit: ingredient.unit,
                            qty: 0
                        };
                    }
                    totalIngredients[ingredient._id].qty += ingredient.qty;
                });
            }
        }
        console.warn(totalIngredients)
        return Object.values(totalIngredients);
    };



    const getTotalBurnerCount = () => {
        let totalBurnerCount = 0;

        for (const dishId in data) {
            const dish = data[dishId];
            if (dish.is_gas) {
                totalBurnerCount += 1;
            }
        }

        return totalBurnerCount;
    };



    const getTotalCookingTime = () => {
        let totalCookingMinutes = 0;
        for (const dishId in data) {
            const dish = data[dishId];
            if (dish.cooking_min) {
                totalCookingMinutes += parseInt(dish.cooking_min, 10);
            }
        }
        const totalHours = Math.floor(totalCookingMinutes / 60);
        const remainingMinutes = totalCookingMinutes % 60;
        const totalTime = totalHours + remainingMinutes / 60;
        return totalTime.toFixed(1); // Convert to string with one decimal place
    };




    const getPreparationTextList = () => {
        const preparationTextList = [];
        for (const dishId in data) {
            const dish = data[dishId];
            if (dish.preperationtext && dish.preperationtext.trim() !== "") {
                preparationTextList.push(dish.preperationtext);
            }
        }
        return preparationTextList;
    };

    const preparationTextArray = getPreparationTextList()
    const preparationTextList = {
        items: preparationTextArray
    };


    const getTotalSpecialAppliances = () => {
        const totalSpecialAppliances = {};
        for (const dishId in data) {
            const dish = data[dishId];
            if (dish.special_appliance_id) {
                dish.special_appliance_id.forEach((appliance) => {
                    if (!totalSpecialAppliances[appliance._id]) {
                        totalSpecialAppliances[appliance._id] = { ...appliance };
                    }
                });
            }
        }
        return Object.values(totalSpecialAppliances);
    };


    const renderTabContent = () => {
        if (activeTab === 'left') {
            const totalBurnerCount = getTotalBurnerCount();
            const totalSpecialAppliancesList = getTotalSpecialAppliances();
            return <LeftTabContent burnerCount={totalBurnerCount} ApplianceList={totalSpecialAppliancesList} />;
        } else if (activeTab === 'right') {
            const totalIngredientsList = getTotalIngredients();
            return <RightTabContent ingredientList={totalIngredientsList} />;
        }
    };

    const onContinueClick = () => {
        if (dishPrice < 400) {
            setWarningVisible(true);
        }
        else {
            navigation.navigate("ConfirmDishOrder", {
                "selectedDate": selectedDate, "selectedTime": selectedTime, "peopleCount": peopleCount,
                "burnerCount":burnerCount,
                "selectedDishes": data
            })
        }
    }

    const handleWarningClose = () => {
        setWarningVisible(false);
    };
    

    const increasePeopleCount = () => {
        setPeopleCount(peopleCount + 1)
        setDishPrice(dishPrice + 49)
    }

    const decreasePeopleCount = () => {
        if (peopleCount != 0) {
            setPeopleCount(peopleCount - 1)
            setDishPrice(dishPrice - 49)
        }
    }

    const toggleCookingTimeVisibility = () => {
        setShowCookingTime(!showCookingTime);
    };



    return (
        <View style={styles.screenContainer}>
            <View style={styles.view1}>
                <Image style={styles.image1} source={require('../../assets/info.png')} />
                <Text style={styles.text1}>Bill value depends upon Dish selected + Number of people</Text>
            </View>
            <View style={styles.view2}>
                <View>
                    <Image style={styles.dish} source={require('../../assets/SelectDishUnselected.png')} />
                    <Text style={{ fontSize: 10, fontFamily: '600', color: '#F46C5B' }}>Select Dishes</Text>
                </View>
                <Image style={styles.separator1} source={require('../../assets/horizontalSeparator.png')} />
                <View>
                    <Image style={styles.time} source={require('../../assets/SelectDateAndTimeSelected.png')} />
                    <Text style={{ fontSize: 10, fontFamily: '600', color: '#F46C5B' }}>Select Date & Time</Text>
                </View>
                <Image style={styles.separator2} source={require('../../assets/horizontalSeparator.png')} />
                <View>
                    <Image style={styles.order} source={require('../../assets/ConfirmOrderUnselected.png')} />
                    <Text style={{ fontSize: 10, fontFamily: '600', color: '#827F84' }}>Confirm Order</Text>
                </View>

            </View>

            <ScrollView>

                <View style={{ justifyContent: 'space-between', marginTop: 17, paddingTop: 7, paddingBottom: 9, backgroundColor: '#FFFFFF', marginLeft: 15, marginEnd: 16, borderRadius: 10, height: 195, elevation: 2 }}>
                    <View style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row', marginEnd: 7 }}>
                        <Image source={require('../../assets/info.png')} style={{ height: 16, width: 16 }} />
                    </View>
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} activeOpacity={1}>

                        <View style={{ marginTop: 4, marginStart: 16, marginEnd: 8, flexDirection: 'column', paddingHorizontal: 11, backgroundColor: 'white', borderColor: isDateValid != null && isDateValid==false ? '#FF3636': "#F6ECEC", borderRadius: 10, borderWidth: 1, paddingBottom: 9 }}>
                            <Text style={{ paddingTop: 4, color: '#9252AA', fontWeight: '500', fontSize: 10 }}>Booking Date</Text>
                            <View style={{ flexDirection: 'row', marginTop: 1 }}>

                                    <Text style={{ fontSize: 16, fontWeight: 600, color: isDatePressed ? '#383838' : "grey" }}>{selectedDate.toLocaleDateString()}</Text>
                            
                                <Image source={require('../../assets/ic_calendar.png')} style={{ height: 19, width: 19, marginLeft: 17 }} />
                                {showDatePicker && (
                                    <DateTimePicker
                                        value={selectedDate}
                                        mode="date"
                                        display="default"
                                        onChange={handleDateChange}
                                    />
                                )}
                            </View>
                        </View>
                        </TouchableOpacity>
                        <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setShowTimePicker(true)} activeOpacity={1}>
                            <View style={{ marginTop: 4, flexDirection: 'column', paddingHorizontal: 11, backgroundColor: 'white', borderColor: isTimeValid != null && isTimeValid==false ? '#FF3636' : "#F6ECEC", borderRadius: 10, borderWidth: 1 ,paddingBottom: 9}}>
                                <Text style={{ paddingTop: 4, color: '#9252AA', fontWeight: '500', fontSize: 10 }}>Chef Arrival Time</Text>
                                <View style={{ flexDirection: 'row', marginTop: 1 }}>
                            
                                        <Text style={{ fontSize: 16, fontWeight: 600, color: isTimePressed ? '#383838' : "grey" }}>{selectedTime.toLocaleTimeString()}</Text>
                                    
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
                        <View style={{marginStart:21}}>
                            <Text style={{ fontSize: 9, fontWeight: '400', color: '#FF2F2F', marginTop: 4 }}>{errorText}</Text>
                        </View>
                    )}
                    <View style={{ flexDirection: 'row', marginTop: 11, marginLeft: 20, marginRight: 1 }}>
                        <Image style={styles.verticalSeparator} source={require('../../assets/verticalSeparator.png')}></Image>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 13, justifyContent: 'center', alignItems: 'center', marginLeft: 16 }}>
                        <Image source={require('../../assets/people.png')} style={{ height: 25, width: 25 }} />
                        <Text style={{ marginLeft: 9, fontSize: 12, color: '#3C3C3E', fontWeight: '500', }}>How many people you are hosting?</Text>
                        <View style={{ flexDirection: 'row', flex: 1,justifyContent:'space-between',marginRight:9 }}>
                        <TouchableOpacity onPress={decreasePeopleCount} activeOpacity={1}>
                                <Image source={require('../../assets/ic_minus.png')} style={{ height: 25, width: 25, marginLeft: 5}} />
                            </TouchableOpacity>
                            <Text style={{ marginLeft: 5, lineHeight: 23, fontSize: 18, marginTop: 2,width:22,textAlign:'center'}}>{peopleCount}</Text>
                            <TouchableOpacity onPress={increasePeopleCount} activeOpacity={1}>
                                <Image source={require('../../assets/plus.png')} style={{ height: 25, width: 25, marginLeft: 5 }} />
                            </TouchableOpacity>
                          
        
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 4, borderRadius: 10, marginLeft: 13, marginRight: 6, paddingLeft: 11, paddingRight: 11, marginTop: 15, borderRadius: 10, backgroundColor: '#F9E9FF' }}>
                        <Image source={require('../../assets/info.png')} style={{ height: 16, width: 16 }} />
                        <Text style={{ color: '#9252AA', fontWeight: '700', marginLeft: 9, fontSize: 10 }}>₹ 49/person would be added to bill value in addition to dish price</Text>

                    </View>
                    

                </View>
                {/* <View style={{ justifyContent: 'center', flexDirection: 'row', marginTop: 16 }}>
                    <Text style={{ color: '#707070', fontSize: 14, fontWeight: '800' }} >Required Procurement ?</Text>
                </View> */}
                <View style={{    flex: 1,marginTop:16,
    justifyContent: 'center',
    alignItems: 'center',
}}>
      <Text style={{flexDirection: 'row', alignItems: 'center',}}>
        <Text style={{color:'#000',fontSize:14,fontWeight:'800'}}>Required </Text>
        <Text style={{color:'#9252AA',fontSize:14,fontWeight:'800'}}>Procurement </Text>
        <Text style={{color:'#000',fontSize:14,fontWeight:'800'}}>?</Text>
      </Text>
    </View>


                <View style={{ flexDirection: 'row', marginTop: 4, marginHorizontal: 9 ,justifyContent:'center'}}>
                    <Text style={{ color: '#707070', fontSize: 12, fontWeight: '400' }} >Keep these Appliances and Ingredients ready before chef Arrival</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, marginHorizontal: 16 }}>
                    <TouchableOpacity style={{ backgroundColor: 'white', borderTopRightRadius: 10, borderTopLeftRadius: 15, paddingVertical: 8, paddingStart: 50, paddingRight: 50 }} onPress={() => setActiveTab('left')} activeOpacity={1}>
                        <Text style={activeTab === 'left' ? styles.activeTab : styles.inactiveTab}>Appliances</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ backgroundColor: '#D9D9D9', borderTopRightRadius: 10, borderTopLeftRadius: 15, paddingVertical: 8, paddingStart: 50, paddingRight: 50 }} onPress={() => setActiveTab('right')} activeOpacity={1}>
                        <Text style={activeTab === 'right' ? styles.activeTab : styles.inactiveTab}>Ingredient</Text>
                    </TouchableOpacity>
                </View>
                {renderTabContent()}

                <View>
            {getTotalCookingTime() > 0.0 && showCookingTime && (
                <View style={{ borderColor: "#F39200", borderWidth: 0.5, borderRadius: 5, backgroundColor: "#FFE3B9", marginHorizontal: 16, flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
                    <Image source={require('../../assets/orderIcon.png')} style={{ height: 28, width: 30, marginStart: 5, marginTop: 5, marginBottom: 7 }} />
                    <Text style={{ marginStart: 9, color: '#606060', fontSize: 13, fontWeight: '400' }} >Expected cooking time of your food</Text>

                    <View style={{ marginStart: 5, backgroundColor: "#FFD1B7", borderRadius: 7, justifyContent: 'center', padding: 6 }}>
                        <Text style={{ color: '#5F5C59', fontWeight: '700', fontSize: 13 }}>
                            {getTotalCookingTime()} Hrs
                        </Text>
                    </View>

                    <TouchableOpacity style={{ marginStart: 3 }} onPress={toggleCookingTimeVisibility} activeOpacity={1}>
                        <Image source={require('../../assets/icCross.png')} style={{ height: 12, width: 12 }} />
                    </TouchableOpacity>
                </View>
                
            )}
            </View>
            </ScrollView>


            <View style={{ paddingHorizontal: 16, justifyContent: 'space-between' }}>

                <TouchableHighlight
                    onPress={onContinueClick}
                    style={[
                        styles.continueButton,
                        {
                            backgroundColor: isOrderValid ? '#9252AA' : '#CFCFCF',
                            borderColor: isOrderValid ? '#9252AA' : '#CFCFCF',
                        },
                    ]}
                    underlayColor="#9252AA"
                    activeOpacity={1}
                    disabled={!isOrderValid}
                >
                    <View style={styles.buttonContent}>
                        <Text
                            style={[
                                styles.continueButtonLeftText,
                                { color: isOrderValid ? 'white' : '#343333' },
                            ]}
                        >
                            Continue
                        </Text>
                        <Text
                            style={[
                                styles.continueButtonRightText,
                                { color: isOrderValid ? 'white' : '#343333' },
                            ]}
                        >
                            {Object.values(data).length} Items | ₹ {dishPrice}
                        </Text>

                    </View>
                </TouchableHighlight>

                <OrderWarning visible={isWarningVisible} onClose={handleWarningClose} />

            </View>

        </View>
    )
}


export default SelectDate;