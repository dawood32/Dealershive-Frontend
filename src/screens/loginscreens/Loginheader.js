import React from 'react';
import {Text, View, StyleSheet,Pressable,TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const LoginHeader = () => {
  const navigation = useNavigation();

  const signupscreen=()=>{
   navigation.replace('SignupScreen')
  }
  return (
    <View style={styles.topContainer}>
      <View style={styles.header}>
        <Text style={styles.hello}>Hello, {'\n'} Welcome Back!</Text>
        <Text style={styles.account}>
          Please enter your email and password details to access your account.
        </Text>
        <View style={styles.loginview}>
          <TouchableOpacity 
          onPress={signupscreen}
          style={styles.signupview}>
            <Text style={styles.signup}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.login}>
            <Text style={styles.logintext}>Login</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,

  },
  header: {
    height: 240,
    justifyContent: 'space-between',
  },
  loginview: {
    width: '100%',
    height: 60,
    borderRadius: 70,
    borderWidth: 1,
    padding: 7,
    flexDirection: 'row',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
   
  },
  hello: {
    textAlign: 'center',
    color: '#111B31',
    fontSize: 32,
    fontFamily:'Nunito-Bold'

  },
  account: {
    textAlign: 'center',
    color: '#838FA0',
    fontFamily:'Nunito-Medium',
    lineHeight:22
  },
  signupview: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signup: {
    color: '#838FA0',
   
    fontFamily:'Nunito-Medium'
 

  },
  login: {
    width: '50%',
    height: '100%',
    backgroundColor: '#EA8C00',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logintext: {
    color: '#FFF',
    fontFamily:'Nunito-Bold'
    
  },
});
export default LoginHeader;
