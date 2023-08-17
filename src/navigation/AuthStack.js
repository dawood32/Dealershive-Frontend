import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/loginscreens/LoginScreen';
import LoginWithEmail from '../screens/loginscreens/LoginWithEmail';
import VerifyPasscode from '../screens/loginscreens/VerifyPasscode';
import LoginLoader from '../screens/loginscreens/LoginLoader';
import AccountValidation from '../screens/loginscreens/AccountValidation';
import WhatsAppLogin from '../screens/loginscreens/WhatsAppLogin';
import SignupScreen from '../screens/signupscreens/SignupScreen';
import SignupVerifyPassword from '../screens/signupscreens/SignupVerifyPassword';
import WhatsAppSignup from '../screens/signupscreens/whatsAppSignup';
import Document from '../screens/signupscreens/Document';
import DocumentVerify from '../screens/signupscreens/DocumentVerify';
const AuthStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="LoginWithEmail" component={LoginWithEmail} />
      <Stack.Screen name="VerifyPasscode" component={VerifyPasscode} />
      <Stack.Screen name="LoginLoader" component={LoginLoader} />
      <Stack.Screen name="WhatsAppLogin" component={WhatsAppLogin} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen
        name="SignupVerifyPassword"
        component={SignupVerifyPassword}
      />

      <Stack.Screen name="WhatsAppSignup" component={WhatsAppSignup} />
      <Stack.Screen name="AccountValidation" component={AccountValidation} />

      <Stack.Screen name="DocumentVerify" component={DocumentVerify} />

      <Stack.Screen name="Document" component={Document} />
    </Stack.Navigator>
  );
};

export default AuthStack;
