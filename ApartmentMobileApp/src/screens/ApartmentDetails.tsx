import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {config} from '../../config';

const ApartmentDetails = ({route}) => {
  const {apartment} = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{apartment.name}</Text>
      <Image
        source={{uri: config.picURL + apartment.pic_url}}
        style={styles.image}
      />
      <Text style={styles.description}>{apartment.description}</Text>
      <Text style={styles.price}>{apartment.price.toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    color: 'green',
  },
});

export default ApartmentDetails;
