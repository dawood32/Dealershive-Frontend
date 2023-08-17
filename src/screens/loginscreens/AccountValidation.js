import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, Pressable, TouchableOpacity} from 'react-native';
import {AppImages} from '../../components/AppImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const AccountValidation = ({navigation}) => {
  useEffect(() => {
    signOut();
  });
  const signOut = async () => {
    try {
      await GoogleSignin.signOut();

      // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  const loginscreen = () => {
    // AsyncStorage.setItem('@IsLogin', 'true');
    navigation.navigate('LoginScreen');
  };
  return (
    <View style={styles.mainContainer}>
      <View style={styles.topContainer}>
        <Image source={AppImages.documentverification} />
      </View>
      <View style={styles.middleContainer}>
        <Text style={styles.validation}>Account Validation Pending</Text>
        <Text style={styles.validationtext}>
          Please note that your account validation is still pending as we
          diligently review the submitted documents. Our team is working
          diligently to complete the process as quickly as possible. We
          apologize for any inconvenience caused and assure you that your
          application is receiving our utmost attention. We will notify you as
          soon as the review is complete. Thank you for your patience and
          understanding.
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={loginscreen} style={styles.loginview}>
          <Text style={styles.verify}>Okay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  topContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  middleContainer: {
    flex: 3,
    justifyContent: 'center',
    paddingBottom: 30,
    paddingHorizontal: 30,
  },
  bottomContainer: {
    flex: 1.2,
    paddingHorizontal: 30,
    // backgroundColor:'red'
  },
  validation: {
    color: '#111B31',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
  validationtext: {
    marginTop: 20,
    fontFamily: 'Nunito-Medium',
    color: '#838FA0',
    textAlign: 'center',
    lineHeight: 21,
  },
  loginview: {
    width: '100%',
    height: 60,
    borderRadius: 70,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19242C',
  },
  verify: {
    color: '#FFFFFF',
    fontFamily: 'Nunito-ExtraBold',
  },
});

export default AccountValidation;
