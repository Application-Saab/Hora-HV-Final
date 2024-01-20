import React from 'react';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, ImageBackground, FlatList, ScrollView, StatusBar, View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight, BackHandler } from 'react-native';
import ProductDateSummary from '../screens/Decoration/ProductDateSummary';
import CustomHeader from '../components/CustomeHeader';
import Splash from '../screens/splash/splash'
import Home from '../screens/home/Home';
import Login from '../screens/login/Login'
import MyAccount from '../screens/myaccount/MyAccount'
import CreateOrder from '../screens/createorder/CreateOrder';
import ConfirmOrder from '../screens/confirmOrder/ConfirmOrder';
import ConfirmLocation from '../screens/confirmlocation/ConfirmLocation';
import SelectDate from '../screens/SelectDate/SelectDate';
import ConfirmDishOrder from '../screens/confirmdishorder/ConfirmDishOrder';
import Onboarding from '../screens/Onboarding/Onboarding';
import DecorationCatPage from '../screens/Decoration/DecorationCatPage';
import DrawerNavigation from '../components/DrawerNavigation';
import OrderDetails from '../screens/orderdetails/OrderDetails';
import DecorationPage from '../screens/Decoration/DecorationPage';
import FoodDelivery from '../screens/foodDelivery/FoodDelivery';
import HospitalityService from '../screens/hospitalityservice/HospitalityService';
import Gifts from '../screens/gifts/Gifts';
const Stack = createNativeStackNavigator();


const StackNavigation = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route }) => { },
      }}
      initialRouteName='DrawerNavigator'
    > 
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigation} />
      <Stack.Screen name="MyAccount" component={MyAccount} options={{ headerShown: true }} />
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: true }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="CreateOrder" component={CreateOrder} options={{ headerShown: true }} />
      <Stack.Screen name="ConfirmOrder" component={ConfirmOrder} options={{ headerShown: true }} />
      <Stack.Screen name="ConfirmLocation" component={ConfirmLocation} options={{ headerShown: true }} />
      <Stack.Screen name="SelectDate" component={SelectDate} options={{ headerShown: true }} />
      <Stack.Screen name="ConfirmDishOrder" component={ConfirmDishOrder} options={{ headerShown: true }} />
      <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerShown: true }} />
      <Stack.Screen name="DecorationCatPage" component={DecorationCatPage} options={{ headerShown: true }}/>
      <Stack.Screen name="ProductDateSummary" component={ProductDateSummary} options={{ headerShown: true }}/>
      <Stack.Screen name="DecorationPage" component={DecorationPage} options={{ headerShown: true }} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: true }} />
      <Stack.Screen name="FoodDelivery" component={FoodDelivery} options={{headerShown:true}}/>
      <Stack.Screen name="HospitalityService" component={HospitalityService} options={{headerShown:true}}/>
      <Stack.Screen name="Gifts" component={Gifts} options={{headerShown:true}}/>

    </Stack.Navigator>
  );
};
export default StackNavigation;