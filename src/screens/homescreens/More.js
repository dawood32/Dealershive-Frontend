import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const More = () => {
  const navigation = useNavigation();

  const signout = async () => {
    await AsyncStorage.setItem('@IsLogin', 'false');
    await AsyncStorage.removeItem('@username');
    await AsyncStorage.removeItem('@user_id');
    await AsyncStorage.removeItem('@access_token');

    await GoogleSignin.signOut();

    navigation.replace('AuthStack');
  };
  useEffect(() => {
    configureGoogleSignIn(); // Call the configure method when the component mounts
  }, []);

  const configureGoogleSignIn = async () => {
    GoogleSignin.configure({
      webClientId:
        '665991374017-ktuhg54pdoshfah2bvjag8ik1dg9ro83.apps.googleusercontent.com',
    });
  };

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => signout()}
        style={{
          width: 120,
          height: 50,
          backgroundColor: '#EA8C00',
          justifyContent: 'center',
          borderRadius: 10,
        }}>
        <Text style={styles.loading}>SignOut</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loading: {
    fontFamily: 'Nunito-Medium',
    color: '#FFF',
    fontSize: 18,
    alignSelf: 'center',
  },
});
export default More;
