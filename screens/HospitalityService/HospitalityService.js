import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView ,Text, View, Image, Button } from 'react-native';
import { BASE_URL, USER_DETAILS_ENDPOINT } from '../../utils/ApiConstants';
import CustomHeader from '../../components/CustomeHeader';


const HospitalityService = ({ navigation }) => {
   

    return (
        <ScrollView>
            <CustomHeader title={"Hospitality Services"} navigation={navigation} />
            <View style={styles.container}>    
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

export default HospitalityService