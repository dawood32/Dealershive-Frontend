import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
const Header = () => {
  const navigation = useNavigation();
  const userData = useSelector(state => state?.UserProfileReducer?.data?.data);
  const [tuitylink, setTuitylink] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    getuserData();
  }, []);

  const getuserData = async () => {
    let userName = await AsyncStorage.getItem('@username');
    let link = await AsyncStorage.getItem('@platform_tuity_link');
    setTuitylink(link);
    setUsername(userName);
  };

  return (
    <ImageBackground source={AppImages.bakground} style={styles.header}>
      <View style={styles.mainContainer}>
        <View style={styles.leftContainer}>
          {userData?.dealer_image ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('DealerProfile')}>
              <Image
                source={{
                  uri: userData?.dealer_image,
                }}
                style={{borderRadius: 50, width: 40, height: 40}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('DealerProfile')}>
              <Image
                borderRadius={100}
                source={AppImages.dummyprofile}
                style={{borderRadius: 500, width: 40, height: 40}}
              />
            </TouchableOpacity>
          )}
          <View style={styles.textbox}>
            <Text style={styles.wlcmtext}>Welcome Back</Text>
            <Text style={styles.nametext}>{userData?.username}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('notification')}>
          <Image
            style={{width: 24, height: 24}}
            source={AppImages.notification}></Image>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    paddingTop: 25,
  },
  mainContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 150,
  },
  leftContainer: {
    flexDirection: 'row',
    width: '80%',
  },
  textbox: {
    marginLeft: 20,
    width: '70%',
  },
  wlcmtext: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
  nametext: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
});

export default Header;
