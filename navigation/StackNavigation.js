import React from 'react';
import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Dimensions, ImageBackground, FlatList, ScrollView, StatusBar, View, Text, TextInput, Image, TouchableOpacity, TouchableHighlight, BackHandler } from 'react-native';

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
import DecorationCatCollection from '../screens/Decoration/DecorationCatCollection';
import DrawerNavigation from '../components/DrawerNavigation';
import OrderDetails from '../screens/orderdetails/OrderDetails';
const Stack = createNativeStackNavigator();


const StackNavigation = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ route }) => { },
      }}
      initialRouteName='Login'
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
      <Stack.Screen name="DecorationCatCollection" component={DecorationCatCollection} options={{ headerShown: true }} />
      <Stack.Screen name="OrderDetails" component={OrderDetails} options={{ headerShown: true }} />
    </Stack.Navigator>
  );
};
export default StackNavigation;