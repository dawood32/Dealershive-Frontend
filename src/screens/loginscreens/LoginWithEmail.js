import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import LoginHeader from './Loginheader';
import WeChatLogin from './WeChatLogin';
import {loginemail} from '../../redux/action/authcall';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {googlesign} from '../../redux/action/authcall';
import {rememberme} from '../../redux/type';
const LoginWithEmail = ({navigation}) => {
  const [weChatPanel, setWeChatPanel] = useState(false);
  const [checkterms, setCheckTerms] = useState(true);
  const [rember, setRember] = useState(false);

  const [email, setEmail] = useState();
  const [disablebutton, setDisablebutton] = useState(true);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [emptyemail, setemptyEmail] = useState(true);
  const [showmessage, setshowmessage] = useState(false);
  const [message, setmessage] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '665991374017-ktuhg54pdoshfah2bvjag8ik1dg9ro83.apps.googleusercontent.com',
    });
  });

  const remberme = () => {
    const updatedRember = !rember;
    setRember(updatedRember);
    dispatch({
      type: rememberme,
      payload: updatedRember,
    });
  };

  const handleterms = () => {
    const updatacheckterm = !checkterms;
    setCheckTerms(!checkterms);
    if (updatacheckterm == false) {
      setDisablebutton(true);
    } else if (updatacheckterm == true && invalidEmail == false) {
      setDisablebutton(false);
    } else {
      setDisablebutton(true);
    }
  };
  const useremail = e => {
    setshowmessage(false);
    setEmail(e);
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    if (!e && checkterms == false) {
      setDisablebutton(true);
    } else {
      setDisablebutton(false);
    }
    if (!pattern.test(e)) {
      setInvalidEmail(true);
    } else {
      setInvalidEmail(false);
      if (checkterms == true) {
        setDisablebutton(false);
      }
    }
    if (!e) {
      setDisablebutton(true);
    }
  };

  const whatsappscreen = () => {
    navigation.navigate('WhatsAppLogin');
  };
  //api code...........
  const verifypasscode = () => {
    var date = new Date();
    var offsetInHours = date.getTimezoneOffset();
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );

    setemptyEmail(false);
    setInvalidEmail(false);
    let params = JSON.stringify({
      email: email,
      type: 'login',
      timezone: offsetInHours,
    });
    dispatch(loginemail(params, success));
  };

  const success = res => {
    if (res.status == true) {
      if (res.authorized) {
        navigation.navigate('VerifyPasscode', {
          status: 'email',
          email: email,
        });
      } else {
        navigation.navigate('AccountValidation');
      }
    } else {
      // Alert.alert(res.message)
      setshowmessage(true);
      setmessage(res.message);
    }
  };
  //...........
  const wechat = () => {
    setWeChatPanel(true);
    console.log('true');
  };
  const googlelogin = async () => {
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
    console.log('user already exist', res.status);
    if (res.status == false) {
      // Alert.alert(res.message);
      setmessage(res.message);
      setshowmessage(true);
      await GoogleSignin.signOut();
    } else {
      navigation.navigate('AccountValidation');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={AppImages.Loginbackground}
        style={styles.imgbackground}>
        <LoginHeader />
        {/* middle container */}

        <View style={styles.middleContainer}>
          <View style={styles.loginview}>
            <Image style={{width: 32, height: 32}} source={AppImages.emial} />
            <TextInput
              placeholder="Email Address"
              keyboardType={
                Platform.OS == 'android' ? 'visible-password' : null
              }
              underlineColorAndroid="transparent"
              placeholderTextColor={'#838FA0'}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={useremail}
              style={styles.textinput}
            />
          </View>
          <View style={styles.emailformat}>
            {showmessage ? (
              <Text style={styles.rightformat}>{message}</Text>
            ) : null}
          </View>

          <View>
            <View style={styles.termscondition}>
              <TouchableOpacity style={{width: 30}} onPress={handleterms}>
                {checkterms ? (
                  <Image
                    style={{width: 24, height: 24}}
                    source={AppImages.Vector}
                  />
                ) : (
                  <View
                    style={{
                      width: 19,
                      height: 19,
                      borderWidth: 1,
                      top: 2,
                      borderRadius: 3,
                    }}
                  />
                )}
              </TouchableOpacity>
              <Text style={styles.termtext}>
                I Agree to all {''}
                <Text style={styles.termtextunderline}>
                  Terms & Conditions
                </Text>{' '}
                and I have read the {''}
                <Text style={styles.termtextunderline}>Privacy Policy</Text>
              </Text>
            </View>
            <View style={styles.termscondition1}>
              <TouchableOpacity
                style={{width: 30, height: 30}}
                onPress={remberme}>
                {rember ? (
                  <Image
                    style={{width: 24, height: 24}}
                    source={AppImages.Vector}
                  />
                ) : (
                  <View style={{width: 24, height: 24}}>
                    <View
                      style={{
                        width: 19,
                        height: 19,
                        borderWidth: 1,
                        top: 2,
                        borderRadius: 3,
                      }}
                    />
                  </View>
                )}
              </TouchableOpacity>
              <Text style={styles.termtext}>Remember me</Text>
            </View>
          </View>
        </View>
        {/* bottomContainer */}

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={verifypasscode}
            disabled={disablebutton ? true : false}
            style={[
              styles.loginview1,
              {
                backgroundColor: disablebutton
                  ? 'rgba(25, 36, 44,0.2)'
                  : 'rgba(25, 36, 44,1)',
              },
            ]}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.loginwith}>or login with</Text>
          <View style={styles.bottomiconContainer}>
            <View style={styles.iconsubcontainer}>
              <TouchableOpacity onPress={googlelogin} style={styles.iconView}>
                <Image
                  style={{width: 24, height: 24}}
                  source={AppImages.Google}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={whatsappscreen}
                style={styles.iconView}>
                <Image
                  style={{width: 32, height: 32}}
                  source={AppImages.whatsapp}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={wechat} style={styles.iconView}>
                <Image
                  style={{width: 32, height: 32}}
                  source={AppImages.wechat}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {weChatPanel ? <WeChatLogin setWeChatPanel={setWeChatPanel} /> : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  imgbackground: {
    width: '100%',
    height: '100%',
  },
  middleContainer: {
    flex: 1.5,
    paddingHorizontal: 30,
    // backgroundColor:"red",
    justifyContent: 'space-between',
    // paddingTop:40
  },
  loginview: {
    width: '100%',
    height: 60,
    borderRadius: 70,
    borderWidth: 1,
    padding: 7,
    flexDirection: 'row',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',
    marginTop: 50,
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
  },
  loginview1: {
    width: '100%',
    height: 60,
    borderRadius: 70,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textinput: {
    width: '90%',
    color: '#424243',
    fontFamily: 'Nunito-Medium',
  },
  login: {
    color: '#FFFFFF',

    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    opacity: 1,
  },
  iconView: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(159, 159, 159, 0.2)',
  },
  bottomContainer: {
    flex: 1.5,
    paddingHorizontal: 30,
    justifyContent: 'space-evenly',
    paddingBottom: 40,
  },
  termscondition: {
    flexDirection: 'row',
    // marginTop: 10,
    // top:-10
  },
  termscondition1: {
    flexDirection: 'row',
    marginTop: 4,
    // top:-10
  },

  termtext: {
    maxWidth: '90%',
    color: '#838FA0',
    fontFamily: 'Nunito-Medium',
    lineHeight: 22,
  },
  bottomiconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconsubcontainer: {
    width: '66%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  termtextunderline: {
    color: '#EA8C00',
    textDecorationLine: 'underline',
    fontFamily: 'Nunito-Medium',
  },
  loginwith: {
    alignSelf: 'center',
    color: '#838FA0',
    fontFamily: 'Nunito-Medium',
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
    height: 25,
  },
});
export default LoginWithEmail;
