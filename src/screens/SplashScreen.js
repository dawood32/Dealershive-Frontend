import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
} from 'react-native';
import {AppImages} from '../components/AppImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(replacescreen, 1400);
    changeNavigationBarColor('translucent', true);
  }, []);

  const replacescreen = () => {
    AsyncStorage.getItem('@IsLogin').then(value =>
      navigation.replace(value == 'true' ? 'AppStack' : 'AuthStack'),
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <ImageBackground
        source={AppImages.splashbackground}
        style={styles.imgbackground}>
        <Image source={AppImages.splashlogo} />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EA8C00',
  },
  imgbackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
