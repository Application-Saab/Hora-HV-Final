import React from "react";
import { StyleSheet, ScrollView ,Text, View, Image, Button } from 'react-native';
import CustomHeader from '../../components/CustomeHeader';

const Faq = ({ navigation }) => {
    return (
        <ScrollView>
            <CustomHeader title={"Faq"} navigation={navigation} />

            <View style={styles.container}>
            <Text>{'FAQ'}</Text>
              
              
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
    contactnumber: {
        marginTop: 14
    }
});

export default Faq;