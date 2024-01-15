import React from "react";
import { StyleSheet, ScrollView, Text, View, TouchableOpacity, Linking, TouchableHighlight ,Image } from 'react-native';
import { BASE_URL, USER_DETAILS_ENDPOINT } from '../../utils/ApiConstants';
import CustomHeader from '../../components/CustomeHeader';
import { Dimensions } from 'react-native';

const handlePage = () => {
    Linking.openURL('whatsapp://send?phone=+918884221487');
}

const foodDelivery = ({ navigation }) => {
    const screenHeight = Dimensions.get('window').height - 30;

    return (
        <View>
            <ScrollView>
                <CustomHeader title={"Food Delivery"} navigation={navigation} />
                <View style={{ ...styles.container, height: screenHeight }}>
                    <Image source={require('../../assets/foodDelivery.jpg')} style={styles.image} />
                    <Text style={{ color: "#9252AA", fontSize: 16, textAlign: "center", marginTop: 20, marginBottom: 20 }}>Please connect with us regarding doorstep delivery of food</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.customButton} activeOpacity={1} onPress={handlePage}>
                            <Text style={styles.buttonText}>Click here to book Order</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally
        position: "relative"
    },
    image: {
        width: '100%',
        height: 300,
        resizeMode: 'cover', // or 'contain' based on your preference
        position: "absolute",
        top: 0,
        left: 0,
        right: 0
    },
    buttonContainer: {
        backgroundColor: "#9252AA",
        width: 200,
        paddingVertical: 10,
        borderRadius: 5,
        justifyContent: "center", // Center the content vertically
        alignItems: "center", // Center the content horizontally
        alignSelf: "center", // Center the container within its parent
        marginTop: 0,
    },
    customButton: {
        textAlign: "center",
        marginHorizontal: "auto",
        marginVertical: 0,
    },
    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 16,
        fontWeight: '700',
    }
});

export default foodDelivery;
