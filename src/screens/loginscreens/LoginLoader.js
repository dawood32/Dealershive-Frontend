import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {BubblesLoader} from 'react-native-indicator';
import {useNavigation} from '@react-navigation/native';

const LoginLoader = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(navigate, 2000);
  }, []);

  const navigate = () => {
    navigation.replace('AppStack');
  };
  return (
    <View style={styles.mainContainer}>
      <BubblesLoader color="#EA8C00" size={100} />
      <View style={{marginTop: 30}}>
        <Text style={styles.loading}>loading...</Text>
      </View>
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
    // marginTop: 30,
    fontFamily: 'Nunito-Medium',
    color: '#838FA0',
  },
});
export default LoginLoader;
