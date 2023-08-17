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
import React, {useState} from 'react';
import {} from 'react';
// import {Received} from './Received';
// import {Holde} from './Holde';
// import {Confirmed} from './Confirmed';
// import {Completed} from './Completed';
import {AppImages} from '../../components/AppImages';

const Activities = () => {
  const [value, setvalue] = useState(0);
  const user = [
    {
      id: 1,
      name: 'Received',
    },
    {
      id: 2,
      name: 'Hold ',
    },
    {
      id: 3,
      name: 'Confirmed',
    },
    {
      id: 4,
      name: 'Completed ',
    },
  ];

  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          flex: 0.2,
          borderBottomWidth: 1,
          borderColor: '#19242C',
          flexDirection: 'row',
        }}>
        <Image source={AppImages.arrowback} style={{width: 24, height: 24}} />
        <Text
          style={{fontSize: 18, fontFamily: 'Nunito-Bold', color: '#19242C'}}>
          Offers
        </Text>
        <Image source={AppImages.men} style={{width: 24, height: 24}} />
      </View>
      <View></View>

      <View
        style={{
          height: '10%',
          paddingHorizontal: 20,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <ImageBackground
          source={AppImages.rename}
          style={{width: 360, height: 48}}>
          <TextInput
            placeholder="Search watches, parts, accessories..."
            style={{
              fontSize: 12,
              fontFamily: 'Nunito-Bold',
              color: '#9D9D9D',
              paddingLeft: 10,
            }}
          />
        </ImageBackground>
      </View>

      <View style={{height: '10%'}}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={user}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => setvalue(index)}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text
                  style={{
                    padding: 12,
                    height: 48,
                    backgroundColor: value == index ? '#EA8C00' : '#F8F8F8',
                    marginLeft: 15,
                    textAlign: 'center',
                    borderRadius: 10,
                    fontSize: 16,
                    fontFamily: 'Nunito-Bold',
                    color: value == index ? '#FFF' : '#000',
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <View>
        {/* {value == 0 ? (
            <Received />
          ) : value == 1 ? (
            <Holde />
          ) : value == 2 ? (
            <Confirmed />
          ) : value == 3 ? (
            <Completed />
          ) : null} */}
      </View>
    </View>
  );
};

export default Activities;
