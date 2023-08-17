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
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {} from 'react';
import {AppImages} from '../../components/AppImages';
const {width, height} = Dimensions.get('screen');

import {useNavigation} from '@react-navigation/native';

const Activities = () => {
  const navigation = useNavigation();
  const [value, setvalue] = useState(0);
  // let textcolor;
  // useEffect(() => {
  // //   console.log(item.completedtxt, 'usman');
  //   textcolor = item.completedtxt;
  // });
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
  const Received = [
    {
      watch: AppImages.rolexwatch,
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
      date: '20, July 2023',
    },
    {
      watch: AppImages.rolexwatch,
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
      date: '20, July 2023',
    },
    {
      watch: AppImages.rolexwatch,
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
      date: '20, July 2023',
    },
    {
      watch: AppImages.rolexwatch,
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
      date: '20, July 2023',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image
            source={AppImages.arrowback}
            style={{width: 24, height: 24, tintColor: '#FFF'}}
          />
        </View>
        <View>
          <Text style={styles.headertxt}> Activities</Text>
        </View>
        <View>
          <Image source={AppImages.men} style={{width: 24, height: 24}} />
        </View>
      </View>

      <View style={styles.header1}>
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
            keyboardType={Platform.OS == 'android' ? 'visible-password' : null}
            placeholderTextColor={'#9D9D9D'}
          />
          <TouchableOpacity style={{height: 48, width: 80}}></TouchableOpacity>
        </ImageBackground>
        <View style={styles.categoryview}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={user}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => setvalue(index)}>
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

      <View style={styles.flatlistview}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={Received}
          renderItem={({item, index}) => {
            return (
              <View style={styles.cardflatlist}>
                <View style={styles.cardview}>
                  <View style={{width: '20%'}}>
                    <Image
                      source={item.watch}
                      style={{width: 50, height: 50}}
                    />
                  </View>

                  <View style={styles.card1}>
                    <Text style={styles.cardimg}>{item.rolex}</Text>
                    <Text style={styles.cardyear}>{item.year}</Text>
                    <Text style={styles.cardused}>{item.used}</Text>
                  </View>
                  <View style={{height: '70%'}}>
                    <View>
                      <Text style={styles.cardprice}>{item.price}</Text>
                    </View>
                    <View style={styles.card2}>
                      <View style={{paddingRight: 5}}>
                        <Image
                          style={{width: 20, height: 20}}
                          source={item.certificate}
                        />
                      </View>
                      <View>
                        <Image
                          style={{width: 20, height: 20}}
                          source={item.certificate2}
                        />
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.card3}>
                  <View style={{paddingVertical: 12}}>
                    <Text style={styles.cardtxt}>{item.textinfor}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <View style={{width: '20%'}}>
                      <Image
                        source={item.ractanglepic}
                        style={{width: 40, height: 40}}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '80%',
                        height: 40,
                      }}>
                      <View style={{}}>
                        <Text
                          style={{
                            fontSize: 14,
                            fontFamily: 'Nunito-Bold',
                            color: '#19242C',
                          }}>
                          {item.manahil}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: 'Nunito-Medium',
                            color: '#838FA0',
                            paddingTop: 6,
                          }}>
                          {item.numbber}
                        </Text>
                      </View>

                      <View style={{}}>
                        <View style={{alignItems: 'center'}}>
                          <Text
                            style={{
                              fontSize: 14,
                              fontFamily: 'Nunito-Bold',
                              color: '#E93131',
                            }}>
                            {item.completedtxt}
                          </Text>
                        </View>
                        <View style={{paddingTop: 6}}>
                          <View>
                            <Text
                              style={{
                                color: '#838FA0',
                                fontSize: 12,
                                fontFamily: 'Nunito-Medium',
                              }}>
                              {item.date}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <View style={{height: 100}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
  },
  header: {
    height: '12%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    alignItems: 'center',
    //   backgroundColor: 'red',
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
  },
  imgbg: {
    justifyContent: 'space-between',
    width: width * 0.9,
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  searchinput: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    width: '70%',
    alignSelf: 'center',
    padding: 10,
  },
  headertxt: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#19242C',
  },
  header1: {
    height: '20%',
    justifyContent: 'space-evenly',
    //   backgroundColor: 'green',
    alignItems: 'center',
  },
  categoryview: {
    height: 60,
    paddingHorizontal: 20,
  },
  cardflatlist: {
    // width: '79%',
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 5,
    borderColor: '#E93131',
    shadowColor: 'gray',
    marginBottom: 15,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  cardview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '50%',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderColor: '#EAECF0',
  },
  flatlistview: {
    paddingHorizontal: 20,
    height: '70%',
  },
  card1: {
    width: '57%',
    height: '70%',
    justifyContent: 'space-around',
  },
  cardimg: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#19242C',
  },
  cardyear: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: '#19242C',
  },
  cardused: {
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    color: '#19242C',
  },
  cardprice: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#E93131',
  },
  card2: {
    flexDirection: 'row',
    paddingTop: 7,
    justifyContent: 'flex-end',
  },
  card3: {
    height: '50%',
    paddingHorizontal: 15,
  },
  cardtxt: {
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    color: '#19242C',
  },
});
export default Activities;
