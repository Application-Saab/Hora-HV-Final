import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Linking, TouchableHighlight ,Image } from 'react-native';
import { BASE_URL, USER_DETAILS_ENDPOINT } from '../../utils/ApiConstants';
import CustomHeader from '../../components/CustomeHeader';


const Gifts = ({ navigation }) => {
   

    return (
        <ScrollView>
            <CustomHeader title={"Gifts"} navigation={navigation} />
            <View style={styles.container}>   
            <Text>{'Coming Soon'} </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'white',
        paddingTop: 20
    },
   
});

export default Gifts