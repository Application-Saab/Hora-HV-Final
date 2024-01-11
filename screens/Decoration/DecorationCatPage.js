import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, Dimensions, ImageBackground, TouchableOpacity, TouchableHighlight } from 'react-native';
import CustomHeader from '../../components/CustomeHeader';
import RBSheet from 'react-native-raw-bottom-sheet';

const DecorationCatPage = ({ route, navigation }) => {
    const { category } = route.params;
    const bottomSheetRef = useRef(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectedProductPrice, setSelectedProductPrice] = useState(0)
    const [selectedCount, setSelectedCount] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [isProductSelected, setIsProductSelected] = useState(false);
    const [itemDetail, setItemDetail] = useState(null)
    const [catalogueData, setCatalogueData] = useState([
        { id: 1, name: 'Red and Yellow Balloon Decoration', image: require('../../assets/decimage1.jpg'), price: 200 },
        { id: 2, name: 'Unicorn Theme Decoration', image: require('../../assets/ballon-dec2.jpg'), price: 300 },
        { id: 3, name: 'Car Decoration Theme', image: require('../../assets/ballon-dec3.jpg'), price: 500 },
        { id: 4, name: 'Red and Yellow Balloon Decoration', image: require('../../assets/decimage1.jpg'), price: 200 },
        { id: 5, name: 'Unicorn Theme Decoration', image: require('../../assets/ballon-dec2.jpg'), price: 300 },
        { id: 6, name: 'Car Decoration Theme', image: require('../../assets/ballon-dec3.jpg'), price: 500 },
        { id: 7, name: 'Red and Yellow Balloon Decoration', image: require('../../assets/decimage1.jpg'), price: 200 },
        { id: 8, name: 'Unicorn Theme Decoration', image: require('../../assets/ballon-dec2.jpg'), price: 300 },
        { id: 9, name: 'Car Decoration Theme', image: require('../../assets/ballon-dec3.jpg'), price: 500 },
    ]);

    const handleIncreaseQuantity = (item) => {
        const isItemAlreadySelected = selectedProducts.some(product => product.id === item.id);

        if (isItemAlreadySelected) {
            // Decrease quantity (remove item)
            const updatedProducts = selectedProducts.filter(product => product.id !== item.id);
            const updatedTotalPrice = totalPrice - item.price;
            setSelectedProducts(updatedProducts);
            setTotalPrice(updatedTotalPrice);
            setSelectedCount(updatedProducts.length);
            setIsProductSelected(updatedProducts.length > 0);
        } else {
            // Increase quantity (add item)
            const updatedProducts = [...selectedProducts, item];
            const updatedTotalPrice = totalPrice + item.price;
            setSelectedProducts(updatedProducts);
            setTotalPrice(updatedTotalPrice);
            setSelectedCount(updatedProducts.length);
            setIsProductSelected(true);
        }
    };

    const addDish = (selectedProducts, totalPrice) => {
        navigation.navigate('ProductDateSummary', { selectedProducts, totalPrice });
    }

    const openBottomSheet = (item, bottomSheetRef) => {
        setItemDetail(item)
        bottomSheetRef.current.open();

    };

    const closeBottomSheet = () => {
        setDishDetail(null)
        bottomSheetRef.current.close();
    };


    const RenderBottomSheetContent = () => (
        <View>
            <View style={{ paddingTop: 5, paddingRight: 5 }}>
                {/* <Image source={{ uri: `https://horaservices.com/api/uploads/${itemDetail.image}` }} style={{ width: Dimensions.get('window').width * 0.9, height: 184, borderTopLeftRadius: 45, borderTopRightRadius: 45 }} /> */}
                <Image source={itemDetail.image} style={{ width: Dimensions.get('window').width, height: 400, aspectRatio: 1, borderTopLeftRadius: 5, borderTopRightRadius: 5 }} />
                <Text style={{ color: '#1C1C1C', fontSize: 23, fontWeight: '800' }}>{itemDetail.name}</Text>
                <Image source={require('../../assets/Vector4.png')} style={{ width: 332.5, height: 1 }} />
                <Text>{itemDetail.price}</Text>
                <Text style={{ color: '#736F6F', fontSize: 9, fontWeight: '400', opacity: 0.9 }}>{itemDetail.description}</Text>
                <Image source={require('../../assets/Vector4.png')} style={{ width: 332.5, height: 1 }} />
            </View>
        </View>

    );


    return (
        <View style={styles.screenContainer}>
            <CustomHeader title={"Catalouge"} navigation={navigation} />
            <ScrollView>
              
                <View style={styles.container}>
                    <View style={styles.decContainer}>
                        {catalogueData.map((item) => (
                            <View style={{ width: Dimensions.get('window').width * 0.46 }}>
                                <ImageBackground
                                    source={
                                        selectedProducts.some(product => product.id === item.id)
                                            ? require('../../assets/Rectanglepurple.png')
                                            : require('../../assets/rectanglewhite.png')
                                    }
                                    style={{ width: "100%", height: 232, marginTop: 10 }}
                                    imageStyle={{ borderRadius: 16 }}
                                >
                                    <TouchableOpacity
                                        onPress={() => openBottomSheet(item, bottomSheetRef)} activeOpacity={1}
                                        key={item.id}
                                        style={styles.decImageContainer}
                                    >
                                        <Image source={item.image} style={styles.decCatimage} />

                                    </TouchableOpacity>
                                    <Text
                                        style={{
                                            marginHorizontal: 3,
                                            textAlign: 'left',
                                            fontWeight: '600',
                                            fontSize: 11,
                                            color: 'transparent',
                                            opacity: 0.9,
                                            height: 28,
                                            marginTop: 0,
                                            paddingLeft: 3,
                                            marginBottom: 2,
                                            color: selectedProducts.some(product => product.id === item.id)
                                                ? 'white' : '#9252AA',
                                        }}
                                    >
                                        {item.name}
                                    </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 2, paddingLeft: 4, paddingRight: 10, justifyContent: 'space-between' }}>
                                        <Text style={{
                                            color: '#9252AA',
                                            fontWeight: '700',
                                            fontSize: 17,
                                            opacity: 0.9,
                                            color: selectedProducts.some(product => product.id === item.id)
                                                ? 'white' : '#9252AA',
                                        }}> ₹ {item.price}</Text>


                                        <TouchableOpacity onPress={() => handleIncreaseQuantity(item)}>
                                            <Image
                                                source={
                                                    selectedProducts.some(product => product.id === item.id)
                                                        ? require('../../assets/minus.png')
                                                        : require('../../assets/plus.png')
                                                }
                                                style={{ width: 21, height: 21 }}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                </ImageBackground>
                            </View>


                        ))}
                    </View>
                </View>


            </ScrollView>

            <View style={{ paddingHorizontal: 16, paddingTop: 5, justifyContent: 'space-between' }}>
                <TouchableHighlight
                    onPress={() => addDish(selectedProducts, totalPrice)}
                    style={[
                        styles.continueButton,
                        {
                            backgroundColor: isProductSelected ? '#9252AA' : '#F9E9FF',
                            borderColor: isProductSelected ? '#9252AA' : '#F9E9FF',
                        },
                    ]}
                    underlayColor="#9252AA"
                    activeOpacity={1}
                    disabled={!isProductSelected}
                >
                    <View style={styles.buttonContent}>
                        <Text
                            style={[
                                styles.continueButtonLeftText,
                                { color: isProductSelected ? 'white' : '#343333' },
                            ]}
                        >
                            Continue
                        </Text>
                        <Text
                            style={[
                                styles.continueButtonRightText,
                                { color: isProductSelected ? 'white' : '#343333' },
                            ]}
                        >
                            {selectedCount} Items | ₹ {totalPrice}
                        </Text>

                    </View>
                </TouchableHighlight>
            </View>

            <RBSheet
                ref={bottomSheetRef}
                closeOnDragDown={[true, closeBottomSheet]}
                height={650}
                customStyles={{
                    container: styles.bottomSheetContainer,
                    wrapper: styles.bottomSheetWrapper,
                    draggableIcon: styles.draggableIcon,
                }}
            >
                <RenderBottomSheetContent />

            </RBSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    container: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 2,
    },
    decContainer: {
        flexDirection: 'row',
        padding: 0,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap', // Allow items to wrap to the next line
    },
    decImageContainer: {
        width: '100%', // Set to 48% width to fit two items in a row
        aspectRatio: 1, // Maintain the aspect ratio of the images
        textAlign: 'center',
        elevation: 2, // Android shadow (adjust as needed)
        shadowColor: '#000',
        shadowOffset: {
        },
        shadowOpacity: 0.14,
        shadowRadius: 16,
        padding: 5
    },
    decCatimage: {
        width: '100%', // Set to 100% width
        height: '100%',
        borderRadius: 10, // Optional: Add border-radius for rounded corners
    },
    decImageText: {
        fontSize: 14,
        color: '#444',
        fontWeight: '500',
        marginTop: 1,
        textAlign: 'left',
        paddingLeft: 33,
        marginTop: 6,
    },
    catalogueTitle: {
        fontWeight: '600',
        fontSize: 16,
        color: '#000',
        textAlign: 'left',
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 0,
    },
    bottomButtonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    bottomSheetContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomSheetWrapper: {
        backgroundColor: 'transparent',
    },
    draggableIcon: {
        backgroundColor: '#000',
    },
    bottomSheetItem: {
        alignItems: 'center',
        marginVertical: 20,
    },
    bottomSheetItemImage: {
        width: 330,
        height: 400,
        borderRadius: 10,
    },
    bottomSheetItemText: {
        fontSize: 18,
        fontWeight: '600',
        marginTop: 10,
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
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
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
    }
});

export default DecorationCatPage;
