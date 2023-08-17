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
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {} from 'react';
import {AppImages} from '../../components/AppImages';
const {width, height} = Dimensions.get('screen');
import Received from '../../components/ActivityComponent/Received';
import Hold from '../../components/ActivityComponent/Hold';
import Confirmed from '../../components/ActivityComponent/Confirmed';
import {Completed} from '../../components/ActivityComponent/Completed';
// import { Received } from "./Received";
// import { Holde } from "./Holde";
// import { Confirmed } from "./Confirmed";
// import { Completed } from "./Completed";

const App = () => {
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
          height: '16%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          alignItems: 'flex-end',
          //   backgroundColor: 'red',
          borderBottomWidth: 1,
          paddingBottom: 20,
        }}>
        <View>
          <Image source={AppImages.arrowback} style={{width: 24, height: 24}} />
        </View>
        <View>
          <Text
            style={{fontSize: 18, fontFamily: 'Nunito-Bold', color: '#19242C'}}>
            Offers
          </Text>
        </View>
        <View>
          <Image source={AppImages.men} style={{width: 24, height: 24}} />
        </View>
      </View>

      <View
        style={{
          height: '20%',
          justifyContent: 'space-evenly',
          //   backgroundColor: 'green',
          alignItems: 'center',
        }}>
        <ImageBackground
          // resizeMode='contain'
          borderRadius={10}
          source={AppImages.rename}
          style={styles.imgbg}>
          <TextInput
            placeholder="Search watches, parts..."
            style={styles.searchinput}
            autoCorrect={false}
            autoCapitalize="none"
            // value={searchText}
            keyboardType={Platform.OS == 'android' ? 'visible-password' : null}
            // onChangeText={e => searchresult(e)}
            placeholderTextColor={'#9D9D9D'}
          />

          <TouchableOpacity style={{height: 51, width: 80}}></TouchableOpacity>
        </ImageBackground>
        <View style={{height: 60, paddingHorizontal: 20}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={user}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => setvalue(index)} style={{}}>
                  <Text
                    style={{
                      padding: 12,
                      marginRight: 10,
                      backgroundColor: value == index ? '#EA8C00' : '#F8F8F8',

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
      </View>

      <View style={{height: '100%'}}>
        {value == 0 ? (
          <Received />
        ) : value == 1 ? (
          <Hold />
        ) : value == 2 ? (
          <Confirmed />
        ) : value == 3 ? (
          <Completed />
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgbg: {
    // maxWidth: Platform.OS=="ios"?284:273,
    height: 50,
    justifyContent: 'space-between',
    width: width * 0.9,
    // top:10
    // alignItems:'center'
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  searchinput: {
    color: '#000000',
    fontSize: 14,

    fontFamily: 'Nunito-Medium',
    width: 260,
    paddingLeft: 15,
    // backgroundColor: 'lightgray',
    height: 40,
    width: '60%',
    alignSelf: 'center',
  },
});
export default App;
