import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import CompletedCard from './CardsData';
import {AppImages} from '../AppImages';

const Received = () => {
  const Received = [
    {
      watch: AppImages.rolex,
      rolex: 'Rolex Z902',
      year: 'Patek Philippe - 2022',
      used: 'Condition: Used',
      price: '$2400,90',
      certificate: AppImages.certificate1,
      certificate2: AppImages.certificate2,
      textinfor: 'Buyer information',
      ractanglepic: AppImages.dummyprofile,
      manahil: 'Manahil',
      numbber: 'AMB2345359',
      completedtxt: 'Received',
      date: '20, July',
      date1: ' 2023',
    },
    {
      watch: AppImages.rolex,

      rolex: 'Rolex Z902',
      year: 'Patek Philippe - 2022',
      used: 'Condition: Used',
      price: '$2400,90',
      certificate: AppImages.certificate1,
      certificate2: AppImages.certificate2,
      textinfor: 'Buyer information',
      ractanglepic: AppImages.dummyprofile,

      manahil: 'Manahil',
      numbber: 'AMB2345359',
      completedtxt: 'Received',
      date: '20, July',
      date1: ' 2023',
    },
  ];

  return (
    <View style={{paddingHorizontal: 20, height: '100%'}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Received}
        renderItem={({item}) => <CompletedCard data={item} />}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Received;
