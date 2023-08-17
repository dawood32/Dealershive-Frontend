import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import LoginHeader from './Loginheader';
import WeChatLogin from './WeChatLogin';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {googlesign} from '../../redux/action/authcall';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const buketData = async () => {
    await AsyncStorage.setItem(
      '@platform_tuity_link',
      'https://dealershive.s3.us-east-2.amazonaws.com/',
    );
    await AsyncStorage.setItem('@aws_bucket', 'dealershive');
    await AsyncStorage.setItem('@aws_bucket_region', 'us-east-2');
    await AsyncStorage.setItem('@aws_bucket_accessKey', 'AKIAZTBNYPEJWY7ZOQ4N');
    await AsyncStorage.setItem(
      '@aws_bucket_secretKey',
      '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',
    );
  };
  const [weChatPanel, setWeChatPanel] = useState(false);
  const [showmessage, setshowmessage] = useState(false);
  const [message, setmessage] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    buketData();
    GoogleSignin.configure({
      webClientId:
        '665991374017-ktuhg54pdoshfah2bvjag8ik1dg9ro83.apps.googleusercontent.com',
    });
  });

  const googlelogin = async () => {
    setshowmessage(false);

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('==>>  ', {userInfo});
      let params = JSON.stringify({
        email: userInfo.user.email,
      });
      dispatch(googlesign(params, onSucces4));
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  const onSucces4 = async res => {
    console.log('user already exist', res);

    if (res.status == false) {
      // Alert.alert(res.message);
      setmessage(res.message);
      setshowmessage(true);

      await GoogleSignin.signOut();
    } else if (res.status == true) {
      if (res.authorized) {
        AsyncStorage.setItem('@IsLogin', 'true');
        const access_token = res.token;
        const username = res.user.username;
        const userid = res.user.id;
        const useremail = res.user.email;

        await AsyncStorage.setItem('@access_token', access_token);

        await AsyncStorage.setItem('@username', username);
        await AsyncStorage.setItem('@user_id', userid.toString());

        await AsyncStorage.setItem('@user_email', useremail);
        console.log(res, 'rrrr');
        navigation.replace('AppStack');
      } else {
        navigation.navigate('AccountValidation');
      }
    }
  };

  const loginwithemail = () => {
    setshowmessage(false);

    navigation.navigate('LoginWithEmail');
  };
  const whatsapplogin = () => {
    setshowmessage(false);

    navigation.navigate('WhatsAppLogin');
  };
  const wechatlogin = () => {
    setshowmessage(false);

    setWeChatPanel(true);
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <ImageBackground
        source={AppImages.Loginbackground}
        style={styles.loginbackground}>
        <LoginHeader />
        <View style={styles.bottomContainer}>
          <TouchableOpacity onPress={loginwithemail} style={styles.loginview}>
            <Image style={{width: 32, height: 32}} source={AppImages.emial} />

            <Text style={styles.text}>Email Address</Text>
            <Text style={styles.txt}>a</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={whatsapplogin} style={styles.loginview}>
            <Image
              style={{width: 32, height: 32}}
              source={AppImages.whatsapp}
            />

            <Text style={styles.text}>WhatsApp</Text>
            <Text style={styles.txt}>a</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={googlelogin} style={styles.loginview}>
            <Image style={{width: 24, height: 24}} source={AppImages.Google} />

            <Text style={styles.text}>Google</Text>
            <Text style={styles.txt}>a</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={wechatlogin} style={styles.loginview}>
            <Image style={{width: 32, height: 32}} source={AppImages.wechat} />

            <Text style={styles.text}>WeChat</Text>
            <Text style={styles.txt}>a</Text>
          </TouchableOpacity>
          <View style={styles.emailformat}>
            {showmessage ? (
              <Text style={styles.rightformat}>{message}</Text>
            ) : null}
          </View>
        </View>
      </ImageBackground>
      {weChatPanel ? <WeChatLogin setWeChatPanel={setWeChatPanel} /> : null}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },

  loginbackground: {
    width: '100%',
    height: '100%',
  },

  bottomContainer: {
    flex: 3,
    paddingHorizontal: 30,
    paddingTop: 40,
  },
  loginview: {
    width: '100%',
    height: 60,
    borderRadius: 70,
    borderWidth: 1,
    padding: 7,
    flexDirection: 'row',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },

  text: {
    color: '#838FA0',
    fontFamily: 'Nunito-Medium',
  },
  txt: {
    color: '#FFF',
  },
  rightformat: {
    width: '90%',
    textAlign: 'center',
    fontSize: 12,
    color: '#CD1B1B',
    lineHeight: 16,
    fontFamily: 'Nunito-Medium',
  },
  emailformat: {
    alignItems: 'center',
    height: 35,
    justifyContent: 'flex-end',
  },
});
