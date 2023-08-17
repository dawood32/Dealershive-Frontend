import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Clipboard,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopInfo = () => {
  const userData = useSelector(state => state?.UserProfileReducer?.data?.data);
  const [username, setUsername] = useState('');
  useEffect(() => {
    getuserData();
  }, []);

  const getuserData = async () => {
    let userName = await AsyncStorage.getItem('@username');
    setUsername(userName);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={{paddingHorizontal: 20, height: '100%'}}>
        <View style={styles.content}>
          <Text style={styles.contentheading}>Business Name</Text>
          <View style={styles.midview}>
            {userData?.background_image ? (
              <Image
                borderRadius={100}
                style={{width: 30, height: 30}}
                source={{uri: userData?.background_image}}
              />
            ) : (
              <Image
                source={AppImages.business}
                style={{width: 30, height: 30}}></Image>
            )}
            {userData?.shop_name ? (
              <Text style={styles.contentinput}>{userData?.shop_name}</Text>
            ) : (
              <Text style={styles.contentinput}>-</Text>
            )}
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentheading}>Contact Name</Text>
          <View style={styles.midview}>
            {userData?.dealer_image ? (
              <Image
                borderRadius={100}
                style={{width: 30, height: 30}}
                source={{uri: userData?.dealer_image}}
              />
            ) : (
              <Image
                borderRadius={100}
                source={AppImages.dummyprofile}
                style={{borderRadius: 500, width: 30, height: 30}}></Image>
            )}

            <Text style={styles.contentinput}>{userData?.username}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text
            onPress={() => console.log(userData)}
            style={styles.contentheading}>
            E-mail
          </Text>
          <View style={styles.midview}>
            <TouchableOpacity style={styles.copylink}>
              <Image
                style={{width: 20, height: 20}}
                source={AppImages.sms}></Image>
              {userData?.email ? (
                <Text style={styles.copylinktext}>{userData?.email}</Text>
              ) : (
                <Text style={styles.copylinktext}>-</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentheading}>Phone Number</Text>
          <View style={styles.midview}>
            <Image
              style={{width: 20, height: 20}}
              source={AppImages.phon}></Image>
            {userData?.phone ? (
              <Text style={styles.copylinktext}>+{userData?.phone}</Text>
            ) : (
              <Text style={styles.copylinktext}>-</Text>
            )}
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentheading}>Dealer Type</Text>
          <View style={styles.midview}>
            {userData?.dealer_type ? (
              <Text style={styles.shop}>{userData?.dealer_type}</Text>
            ) : (
              <Text style={styles.shop}>-</Text>
            )}
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentheading}>Currency</Text>
          <View style={styles.midview}>
            <Image
              style={{marginRight: 10, width: 20, height: 20}}
              source={AppImages.Group}></Image>
            {userData?.shop_currency ? (
              <Text style={styles.shop}>{userData?.shop_currency}</Text>
            ) : (
              <Text style={styles.shop}>-</Text>
            )}
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentheading}>Store URL</Text>
          <View style={styles.midview}>
            <Image
              style={{width: 20, height: 20}}
              source={AppImages.link}></Image>
            {userData?.storeurl ? (
              <Text style={styles.copylinktext}>{userData?.storeurl}</Text>
            ) : (
              <Text style={styles.copylinktext}>-</Text>
            )}
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentheading}>Country</Text>
          <View style={styles.midview}>
            <Image
              style={{width: 20, height: 20, marginRight: 10}}
              source={AppImages.location}></Image>
            {userData?.country ? (
              <Text style={styles.shop}>{userData?.country}</Text>
            ) : (
              <Text style={styles.shop}>-</Text>
            )}
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.contentheading}>Business Location</Text>
          <View style={styles.midview}>
            <Image
              style={{width: 20, height: 20}}
              source={AppImages.location}></Image>
            {userData?.address ? (
              <Text style={styles.contentinputt}>{userData?.address}</Text>
            ) : (
              <Text style={styles.contentinputt}>-</Text>
            )}
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.contentheading}>Description</Text>
          <View style={styles.midview}>
            <Image
              style={{marginRight: 10, width: 20, height: 20}}
              source={AppImages.note}></Image>
            {userData?.shop_description ? (
              <Text style={styles.descriptiontext}>
                {userData?.shop_description}
              </Text>
            ) : (
              <Text style={styles.descriptiontext}>-</Text>
            )}
          </View>
        </View>
        <View style={{height: 130}} />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-around',
    marginTop: 20,
    // backgroundColor:"lightblue"
  },
  contentheading: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
  midview: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  copylink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copylinktext: {
    color: '#19242C',
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    maxWidth: '90%',
  },
  contentinput: {
    color: '#19242C',
    paddingLeft: 11,
    fontSize: 14,
    fontFamily: 'Nunito-medium',
    maxWidth: '90%',
  },
  contentinputt: {
    color: '#19242C',
    paddingLeft: 12,
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    maxWidth: '90%',
  },
  description: {
    height: 60,
    marginTop: 5,
  },
  descriptiontext: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',

    width: '90%',
  },
  shop: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',

    width: '90%',
  },
});
export default ShopInfo;
