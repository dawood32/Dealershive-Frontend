import React from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import {AppImages} from '../../components/AppImages';
const DocumentVerify = ({navigation}) => {
  const documentverify = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Image source={AppImages.documentverification} />
      </View>
      <View style={styles.middleContainer}>
        <Text
          style={{
            color: '#111B31',
            fontSize: 18,
            fontFamily: 'Nunito-Bold',
            top: 20,
          }}>
          Documents Submission
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: '#838FA0',
            fontFamily: 'Nunito-Medium',
          }}>
          Please Submit your documents to our e-mail support@dealershive.com or
          to our WhatsApp.
        </Text>
        <View
          style={{backgroundColor: '#FFF4E3', padding: 20, borderRadius: 10}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#6D7989',
              fontFamily: 'Nunito-Medium',
              lineHeight: 22,
            }}>
            Please note that this process may take some time, but we will notify
            you as soon as your documents have been validated. We appreciate
            your patience and understanding.
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable onPress={documentverify} style={styles.loginview1}>
          <Text style={styles.login1}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flex: 1.6,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  middleContainer: {
    flex: 2,
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
    // backgroundColor:"lightblue",
    alignItems: 'center',
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    // backgroundColor:"green",
  },
  loginview1: {
    width: '100%',
    height: 60,
    borderRadius: 70,
    borderWidth: 1,
    // padding: 7,
    flexDirection: 'row',
    borderColor: 'rgba(159, 159, 159, 0.3)',
    //  marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19242C',
    paddingHorizontal: 20,
  },
  login1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
});
export default DocumentVerify;
