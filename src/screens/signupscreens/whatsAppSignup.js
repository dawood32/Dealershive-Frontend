import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {CountryCodes} from '../../components/CountryCodes';
import {whatsappsignup} from '../../redux/action/authcall';
import {useDispatch} from 'react-redux';
import WechatSignup from './WechatSignup';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {googlesignup} from '../../redux/action/authcall';

const WhatsAppSignup = ({navigation}) => {
  const [weChatPanel, setWeChatPanel] = useState(false);

  const dispatch = useDispatch();
  const [dialsCode, setDialsCode] = useState(1);
  const [flag, setFlage] = useState(AppImages.USA);
  const [showCountryList, setShowCountryList] = useState(false);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [whatsappnumber, setWhatsAppNumber] = useState();
  const [country, setCountry] = useState();
  const [changebuttonColor, setChangeButtonColor] = useState(false);
  const [showmessage, setshowmessage] = useState(false);
  const [message, setmessage] = useState('');
  const [countryList, setCountryList] = useState([]);
  const googlescreen = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('==>>  ', {userInfo});
      let params = JSON.stringify({
        name: userInfo.user.name,
        email: userInfo.user.email,
      });
      dispatch(googlesignup(params, onSuccess4));
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
  const onSuccess4 = async res => {
    console.log('user already exist', res.status);
    if (res.status == false) {
      setmessage('User already exist');
      setshowmessage(true);
      try {
        await GoogleSignin.signOut();

        // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
    } else {
      navigation.navigate('AccountValidation');
    }
  };

  useEffect(() => {
    setCountryList(CountryCodes);
  }, []);

  const searchCountry = srchText => {
    let searchData;

    if (srchText.length > 0) {
      searchData = countryList.filter(item =>
        item.name.toUpperCase().includes(srchText.toUpperCase()),
      );
      setCountryList(searchData);
    } else {
      setCountryList(CountryCodes);
    }
  };
  const loginscreen = () => {
    navigation.navigate('LoginScreen');
  };
  const loginemail = () => {
    navigation.navigate('SignupScreen');
  };
  const countryselect = e => {
    setShowCountryList(false);
    setDialsCode(e.dialCode);
    setFlage(e.flag);
    setCountry(e.name);
  };

  const handlewhatsappnumber = e => {
    setshowmessage(false);
    setmessage('');
    setWhatsAppNumber(e);
    setButtonDisable(false);
    if (!e) {
      setButtonDisable(true);
    }
  };
  const wechatscreen = () => {
    setWeChatPanel(true);
  };
  const countrydropdown = () => {
    Keyboard.dismiss();
    setShowCountryList(!showCountryList);
  };

  /// apicode
  const signupverifypassword = () => {
    var date = new Date();
    var offsetInHours = date.getTimezoneOffset();
    let params = JSON.stringify({
      number: +(dialsCode + whatsappnumber),
      country: country,
      timezone: offsetInHours,
    });

    dispatch(whatsappsignup(params, success));
    // navigation.navigate('SignupVerifyPassword')
  };
  const success = res => {
    console.log(res);

    if (res.status == true) {
      navigation.navigate('SignupVerifyPassword', {
        status: 'whatsapp',
        number: dialsCode + whatsappnumber,
      });
    } else {
      // Alert.alert(res.message)
      setmessage(res.message);
      setshowmessage(true);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={AppImages.Loginbackground}
        style={styles.imgbackground}>
        <View style={styles.header}>
          <View style={styles.headrcomp}>
            <Text style={styles.welcome}>Welcome!</Text>
            <Text style={styles.accessAccount}>
              Please enter your WhatsApp phone number to register your account.
            </Text>
            <View style={styles.loginview}>
              <TouchableOpacity style={styles.signupview}>
                <Text style={styles.signup}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={loginscreen} style={styles.login}>
                <Text style={styles.logintext}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.middleContainer}>
          {showCountryList ? (
            <View
              style={{
                width: '100%',
                backgroundColor: '#FFF',
                position: 'absolute',
                top: '-47%',
                left: 30,
                height: '78%',
                borderRadius: 9,
                zIndex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingLeft: 20,
                  marginTop: 10,
                }}>
                <Image
                  style={{height: 26, width: 26}}
                  source={AppImages.searchiconflag}
                />

                <TextInput
                  placeholder="Search..."
                  placeholderTextColor={'#838FA0'}
                  style={{
                    paddingHorizontal: 10,
                    width: '85%',
                  }}
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  autoCorrect={false}
                  // keyboardType="numeric"
                  onChangeText={e => searchCountry(e)}
                />
              </View>
              <FlatList
                data={countryList}
                scrollEnabled
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => countryselect(item)}
                      style={{
                        flexDirection: 'row',
                        marginTop: 10,
                        paddingLeft: 20,
                      }}>
                      <Image
                        source={item.flag}
                        style={{marginRight: 10, width: 24, height: 17}}
                      />

                      <Text
                        style={{
                          alignSelf: 'center',
                          color: '#424243',
                          fontFamily: 'Nunito-Medium',
                        }}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : null}
          <View style={styles.loginview2}>
            <TouchableOpacity
              style={{flexDirection: 'row', height: 55}}
              onPress={() => countrydropdown()}>
              <Image
                source={flag}
                style={{
                  marginRight: 10,
                  alignSelf: 'center',
                  height: 20,
                  width: 30,
                  borderRadius: 3,
                }}
              />
              <Image
                style={{
                  marginRight: 10,
                  alignSelf: 'center',
                  width: 16,
                  height: 16,
                }}
                source={AppImages.selectcountrycode}
              />

              <Text style={{marginRight: 10, alignSelf: 'center'}}>
                +{dialsCode}
              </Text>
            </TouchableOpacity>

            <TextInput
              placeholder="000-0000"
              placeholderTextColor={'#838FA0'}
              style={styles.textinput}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={handlewhatsappnumber}
            />
          </View>
          <View style={styles.emailformat}>
            {showmessage ? (
              <Text style={styles.rightformat}>{message}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={signupverifypassword}
            disabled={buttonDisable ? true : false}
            style={[
              styles.loginview1,
              {
                backgroundColor: buttonDisable
                  ? 'rgba(25, 36, 44,0.2)'
                  : 'rgba(25, 36, 44,1)',
              },
            ]}>
            <Text style={styles.login1}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.loginwith}>or sign up with</Text>
          <View style={styles.iconsubcontainer}>
            <TouchableOpacity onPress={loginemail} style={styles.iconView}>
              <Image style={{width: 32, height: 32}} source={AppImages.emial} />
            </TouchableOpacity>
            <TouchableOpacity onPress={googlescreen} style={styles.iconView}>
              <Image
                style={{width: 24, height: 24}}
                source={AppImages.Google}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={wechatscreen} style={styles.iconView}>
              <Image
                style={{width: 32, height: 32}}
                source={AppImages.wechat}
              />
            </TouchableOpacity>
          </View>
        </View>
        {weChatPanel ? <WechatSignup setWeChatPanel={setWeChatPanel} /> : null}
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
  progressCircle: {
    width: 24,
    height: 24,
    backgroundColor: '#EA8C00',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inside: {
    width: 14,
    height: 14,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  horizontalLine: {
    borderBottomWidth: 2,
    width: '30%',
    alignSelf: 'center',
    marginHorizontal: 8,
    borderColor: '#D9D9D9',
  },
  otpcircle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: '#D9D9D9',
  },
  header: {
    flex: 2,
    // backgroundColor:'lightblue',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  middleContainer: {
    flex: 1.6,
    // backgroundColor:'orange',
    paddingHorizontal: 30,
    justifyContent: 'center',
    // paddingTop:30
  },
  bottomContainer: {
    flex: 1.7,
    // backgroundColor:'green',
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 40,
  },
  loginview: {
    width: '100%',
    height: 60,
    borderRadius: 70,
    borderWidth: 1,
    padding: 7,
    flexDirection: 'row',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',
    marginTop: 25,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  loginview2: {
    width: '100%',
    height: 62,
    borderRadius: 50,
    borderWidth: 1,
    padding: 7,
    flexDirection: 'row',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  signupview: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EA8C00',
    borderRadius: 40,
  },
  signup: {
    fontSize: 12,
    color: '#FFF',
    fontFamily: 'Nunito-Bold',
  },
  login: {
    width: '50%',
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  logintext: {
    color: '#838FA0',
    fontFamily: 'Nunito-Medium',
  },
  welcome: {
    textAlign: 'center',
    color: '#111B31',
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
    // lineHeight:20
    top: -10,
  },
  accessAccount: {
    textAlign: 'center',
    color: '#838FA0',
    fontFamily: 'Nunito-Medium',
    lineHeight: 22,
  },
  loginview1: {
    width: '100%',
    height: 60,
    borderRadius: 70,
    borderWidth: 1,
    // padding: 7,
    flexDirection: 'row',
    borderColor: 'rgba(159, 159, 159, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    top: -7,
  },
  login1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  textinput: {
    width: '70%',
    color: '#424243',
    fontFamily: 'Nunito-Medium',
  },
  sign: {
    fontSize: 12,
    // fontFamily:'Nunito',
    color: '#000000',
  },
  otp: {
    color: '#838FA0',
    fontFamily: 'Nunito-Medium',
  },
  headrcomp: {
    height: '68%',
    // justifyContent:",
    // backgroundColor:'red'
  },
  progressview: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progresstext: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  iconsubcontainer: {
    width: '66%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    // backgroundColor:'lightblue',
    height: 40,
    justifyContent: 'flex-end',
  },
});
export default WhatsAppSignup;
