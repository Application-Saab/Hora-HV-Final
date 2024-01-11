import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Pressable, TouchableOpacity } from 'react-native';
import CustomHeader from '../../components/CustomeHeader';

const DecorationPage = ({ navigation }) => {

  const bottomSheetRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const openCatItems = (category) => {
    navigation.navigate('DecorationCatPage', { category }, { navigation });
  }

  const [decCat, setDecCat] = useState([
    { id: '1', image: require('../../assets/Birthday_dec_cat.jpg'), name: 'Birthday' },
    { id: '2', image: require('../../assets/first_night_cat_dec.jpg'), name: 'First Night' },
    { id: '3', image: require('../../assets/aniversary_Cat_Dec.jpg'), name: 'Anniversary' },
    { id: '4', image: require('../../assets/kids_birthday_decoration.jpg'), name: 'Kids Birthday' },
    { id: '5', image: require('../../assets/baby-shower-dec-cat.jpg'), name: 'Baby Shower' },
    { id: '6', image: require('../../assets/welcome_baby_dec.jpg'), name: 'Welcome Baby' },
    { id: '7', image: require('../../assets/preminumdecor.jpg'), name: 'premium Decoration' },
    { id: '8', image: require('../../assets/Balloon-B.jpeg'), name: 'Ballon Bouquets' }
  ]);

  return (
    <ScrollView>
      <CustomHeader title={"Select Occasions"} navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.decContainer}>
          {decCat.map(({ image, name, openLink }, index) => (
            <Pressable key={index} onPress={() => openCatItems(name)} style={styles.decImageContainer}>
              <Image source={image} style={styles.decCatimage} />

            </Pressable>
          ))}
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 10,
  },
  decImageContainer: {
    width: '48%', // Set to 48% width to fit two items in a row
    aspectRatio: 1, // Maintain the aspect ratio of the images
    textAlign: 'center',
  },
  decCatimage: {
    width: '100%', // Set to 100% width
    height: 151,
    borderRadius: 10, // Optional: Add border-radius for rounded corners
  },
  decImageText: {
    fontSize: 14,
    color: '#444',
    fontWeight: '500',
    marginTop: 1,
    textAlign: 'left',
    paddingLeft: 8,
    marginTop: 2,
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
});

export default DecorationPage;
