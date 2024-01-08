import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableHighlight, Pressable, Image, BackHandler, TouchableOpacity, ScrollView } from 'react-native';
import CarouselComponent from '../dialog/CarouselComponent';
import CustomHeader from '../../components/CustomeHeader';

const Home = ({ navigation }) => {
  const [decCat, setDecCat] = useState([
    { image: require('../../assets/Birthday_dec_cat.jpg'), name: 'Birthday' },
    { image: require('../../assets/first_night_cat_dec.jpg'), name: 'First Night' },
    { image: require('../../assets/aniversary_Cat_Dec.jpg'), name: 'Anniversary' },
    { image: require('../../assets/kids_birthday_decoration.jpg'), name: 'Kids Birthday' },
    { image: require('../../assets/baby-shower-dec-cat.jpg'), name: 'Baby Shower' },
    { image: require('../../assets/welcome_baby_dec.jpg'), name: 'Welcome Baby' },
  ]);

  const openCatItems = (category) => {
    // const categoryNameWithDashes = category.name.replace(/\s+/g, '-');
    navigation.navigate('DecorationCatCollection', { category });

  };

  const [currentAddress, setCurrentAddress] = useState(null);

  const bookNowData = [
    { id: '1', image: require('../../assets/homebanner1.png'), text: "Book Decorations for your Events" },
    { id: '2', image: require('../../assets/homebanner2.png'), text: "Chef for party - Food by Top Chef at just ₹80 / Person" },
    { id: '3', image: require('../../assets/homebanner3.png'), text: "Food Delivery - Starting at just Rs 300 per person with multiple dish options" },
    { id: '4', image: require('../../assets/homebanner4.png'), text: "Waiter/Cleaner/Helper - at just Rs 650" },
    { id: '5', image: require('../../assets/homebanner5.png'), text: "Explore Our Various Service" }
  ];

  const popularDishes = [
    { id: '1', image: require('../../assets/homeslider2-firstimg.png') },
    { id: '2', image: require('../../assets/homeslider2-secondimg.png') },
    { id: '3', image: require('../../assets/homeslider2-thirdimg.png') }
  ];



  const desertsData = [
    { id: '1', image: require('../../assets/burner.png') },
    { id: '2', image: require('../../assets/burner.png') },
    { id: '3', image: require('../../assets/burner.png') }
  ];

  const reviewData = [
    { id: '1', image: require('../../assets/happycustomers.png') },
    { id: '2', image: require('../../assets/happycustomers.png') },
    { id: '3', image: require('../../assets/happycustomers.png') }
  ];

  const openCreateOrder = () => {
    navigation.navigate('CreateOrder');
  }

  return (
    <ScrollView style={styles.container}>
      <CustomHeader title={"Home"} navigation={navigation} />
      <View style={{ marginTop: 2 }}>
        <CarouselComponent data={bookNowData} />
      </View>
      <View style={{ marginStart: 16, marginTop: 16 }}>
        <Text>
          <Text style={styles.normalText}>Explore Our  </Text>
          <Text style={styles.dishesText}>Services</Text>
        </Text>
      </View>
      <View style={styles.decContainer}>
        {decCat.map(({ image, name }, index) => (
          <Pressable key={index} onPress={() => openCatItems(name)} style={styles.decImageContainer}>
            <Image source={image} style={styles.decCatimage} />
          </Pressable>
        ))}
      </View>

      {/* celebrate section */}
      <View>
        <Image
          source={require('../../assets/celebrate.png')}
          style={{ height: 496, width: Dimensions.get('window').width, marginTop: 10 }}
        />
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.customButton} activeOpacity={1} onPress={openCreateOrder}>
            <Text style={styles.buttonText}> Book Now</Text>
          </TouchableOpacity>
        </View> */}
      </View>



      {/* howdoesitworks */}
      <View style={{ width: "100%", marginVertical: 30 }}>
        <View>
          <Image
            source={require('../../assets/how-work-icon.png')}
            style={{
              height: 90,
              width: 110,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 25 }}>
          <View style={styles.box}>
            <ImageBackground
              source={require('../../assets/hw-bg.png')}
              style={styles.imageBackground}
            >
              <View style={styles.content}>
                <Image
                  source={require('../../assets/how1.png')}
                  style={styles.hwicon}
                />
                <Text style={styles.hwheading}>Select Service</Text>
                <Text style={styles.hwtext}>Select from the wide range of cuisines & dishes</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.box}>
            <ImageBackground
              source={require('../../assets/hw-bg.png')}
              style={styles.imageBackground}
            >
              <View style={styles.content}>
                <Image
                  source={require('../../assets/how2.png')}
                  style={styles.hwicon}
                />
                <Text style={styles.hwheading}>Book a slot</Text>
                <Text style={styles.hwtext}>Pick your preferred date and time for service</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.box}>
            <ImageBackground
              source={require('../../assets/hw-bg.png')}
              style={styles.imageBackground}
            >
              <View style={styles.content}>
                <Image
                  source={require('../../assets/how3.png')}
                  style={styles.hwicon}
                />
                <Text style={styles.hwheading}>Confirm Order</Text>
                <Text style={styles.hwtext}>Confirm your order and rest back we ll take it from here</Text>
              </View>
            </ImageBackground>
          </View>
        </View>
      </View>


      {/* why hora */}

      <TouchableHighlight onPress={openCreateOrder}>
        <Image
          source={require('../../assets/whyHora.png')}
          style={{
            height: 500,
            width: 390,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        />
      </TouchableHighlight>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  normalText: { color: '#323643', fontSize: 14, fontWeight: '600' },
  dishesText: { color: '#9252AA', fontSize: 14, fontWeight: '600' },
  customButton: {
    height: 34,
    width: 138,
    marginTop: 10,
    backgroundColor: '#9252AA',
    marginHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 16,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  decContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  decImageContainer: {
    width: '30%', // Adjust as needed
    aspectRatio: 1, // Maintain the aspect ratio of the images
    marginBottom: 10,
  },
  decCatimage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  box: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 20, // Adjust as needed
    borderColor: '#E8E7E7',
    borderRadius: 9,
    borderWidth: 1,
    overflow: 'hidden', // Ensure content doesn't overflow the box
  },
  imageBackground: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 5,
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
  content: {
    textAlign: 'center',
  },
  hwicon: {
    height: 70,
    width: 80,
    marginBottom: 10, // Adjust as needed
    marginLeft: "auto",
    marginRight: "auto",
  },
  hwheading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
    marginBottom: 5, // Adjust as needed
    textAlign: 'center',
  },
  hwtext: {
    color: '#8C8C8C',
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
});

export default Home;

