import React, {useState, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {CountryCodes} from '../../components/CountryCodes';
import {useDispatch} from 'react-redux';
import WechatSignup from './WechatSignup';
import {emailsignup} from '../../redux/action/authcall';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {googlesignup} from '../../redux/action/authcall';
const SignupScreen = ({navigation}) => {
  const [weChatPanel, setWeChatPanel] = useState(false);

  const [showCountryList, setShowCountryList] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, SetEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dialsCode, setDialsCode] = useState(+1);
  const [flag, setFlage] = useState(AppImages.USA);
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [country, setCountry] = useState();
  const [disableButton, setDisableButton] = useState(true);
  const [userexist, setUserexist] = useState(false);
  const [showmessage, setshowmessage] = useState(false);
  const [message, setmessage] = useState('');
  const [countryList, setCountryList] = useState({});
  const dispatch = useDispatch();
  const googlescreen = async () => {
    setshowmessage(false);

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('==>> this is token ', {userInfo});
      let params = JSON.stringify({
        token: userInfo.idToken,
        // name: userInfo.user.name,
        // email: userInfo.user.email,
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
      // Alert.alert('user already exist');
      setmessage('User already exist with this email');
      setshowmessage(true);
      try {
        await GoogleSignin.signOut();

        // Remember to remove the user from your app's state as well
      } catch (error) {
        console.error(error);
      }
    } else {
      navigation.navigate('DocumentVerify');
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

  const countydropdown = () => {
    Keyboard.dismiss();
    setShowCountryList(!showCountryList);
  };
  const wechatscreen = () => {
    setWeChatPanel(true);
  };
  const handleusername = e => {
    setshowmessage(false);
    setmessage('');

    setUserName(e);
    if (!email) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
    if (!e) {
      setDisableButton(true);
    }
  };
  const handleemail = e => {
    setshowmessage(false);
    setmessage('');

    SetEmail(e);
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    if (!pattern.test(e)) {
      setInvalidEmail(true);
    }
    if (!e) {
      setDisableButton(true);
    } else {
      if (!userName) {
        setDisableButton(true);
      } else {
        setDisableButton(false);
      }
    }
    if (!e) {
      setDisableButton(true);
    }
  };
  const handlephoneNumber = e => {
    setshowmessage(false);
    setmessage('');

    if (!email || !userName) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }

    setPhoneNumber(e);
  };

  const countryselect = e => {
    setShowCountryList(false);
    setDialsCode(e.dialCode);
    setFlage(e.flag);
    setCountry(e.name);
  };

  // api code............................
  const signupverifypassword = () => {
    var date = new Date();
    var offsetInHours = date.getTimezoneOffset();

    let params = JSON.stringify({
      username: userName,
      email: email,
      timeZone: offsetInHours,
      country: country,
      phone: +(dialsCode + phoneNumber),
    });

    dispatch(emailsignup(params, onSuccess));
  };
  const onSuccess = res => {
    if (res.status == true) {
      navigation.navigate('SignupVerifyPassword', {
        email: email,
        status: 'email',
      });
    } else {
      // Alert.alert(res.message);
      setmessage(res.message);
      setshowmessage(true);
    }
  };

  const loginscreen = () => {
    navigation.navigate('LoginScreen');
  };
  const whatsappscreen = () => {
    navigation.navigate('WhatsAppSignup');
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
        style={styles.imgbackground}>
        <View style={styles.header}>
          <View style={styles.headrcomp}>
            <Text style={styles.welcome}>Welcome!</Text>
            <Text style={styles.accessAccount}>
              Please enter your email to register your account.
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
            <View style={styles.countrymodal}>
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
                      <Text style={{alignSelf: 'center', color: '#424243'}}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          ) : null}
          <View style={styles.loginview2}>
            <View style={{width: 35}}>
              <Image
                style={{width: 24, height: 24}}
                source={AppImages.profile}
              />
            </View>
            <TextInput
              placeholder="User Name"
              placeholderTextColor={'#838FA0'}
              style={styles.textinput}
              underlineColorAndroid="transparent"
              autoCapitalize="words"
              autoCorrect={false}
              keyboardType={
                Platform.OS == 'android' ? 'visible-password' : null
              }
              onChangeText={handleusername}
            />
          </View>

          <View style={styles.loginview3}>
            <View style={{width: 35}}>
              <Image source={AppImages.emial} style={{width: 25, height: 25}} />
            </View>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={'#838FA0'}
              style={styles.textinput}
              autoCorrect={false}
              keyboardType={
                Platform.OS == 'android' ? 'visible-password' : null
              }
              underlineColorAndroid="transparent"
              onChangeText={handleemail}
            />
          </View>

          <View style={styles.loginview2}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{flexDirection: 'row', height: 55}}
                onPress={() => countydropdown()}>
                <Image source={flag} style={styles.flagimg} />
                <Image
                  style={{
                    marginRight: 10,
                    alignSelf: 'center',
                    width: 16,
                    height: 16,
                  }}
                  source={AppImages.selectcountrycode}
                />

                <Text style={styles.dialcodest}>+{dialsCode}</Text>
              </TouchableOpacity>

              <TextInput
                placeholder="000-0000"
                placeholderTextColor={'#838FA0'}
                style={styles.textinput1}
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={handlephoneNumber}
                keyboardType="numeric"
                underlineColorAndroid="transparent"
              />
            </View>
            <View style={{width: 60, height: 20}}>
              <Text
                style={{
                  alignSelf: 'center',
                  // left: 5,
                  color: '#838FA0',

                  fontFamily: 'Nunito-Medium',
                }}>
                optional
              </Text>
            </View>
          </View>
          <View style={styles.emailformat}>
            {showmessage ? (
              <Text style={styles.rightformat}>{message}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            disabled={disableButton ? true : false}
            onPress={signupverifypassword}
            style={[
              styles.loginview1,
              {
                backgroundColor: disableButton
                  ? 'rgba(25, 36, 44,0.2)'
                  : 'rgba(25, 36, 44,1)',
              },
            ]}>
            <Text style={styles.login1}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.loginwith}>or sign up with</Text>
          <View style={styles.iconsubcontainer}>
            <TouchableOpacity onPress={googlescreen} style={styles.iconView}>
              <Image
                style={{width: 24, height: 24}}
                source={AppImages.Google}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={whatsappscreen} style={styles.iconView}>
              <Image
                style={{width: 32, height: 32}}
                source={AppImages.whatsapp}
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
    flex: 1.7,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  middleContainer: {
    flex: 1.9,
    paddingHorizontal: 30,
    justifyContent: 'center',
    // paddingBottom: 20,
  },
  bottomContainer: {
    flex: 1.5,
    paddingHorizontal: 30,
    alignItems: 'center',
    // backgroundColor:"green",
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
    marginTop: 30,
    alignItems: 'center',
  },
  loginview2: {
    width: '100%',
    height: 62,
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  loginview3: {
    width: '100%',
    height: 62,
    borderRadius: 50,
    borderWidth: 1,
    padding: 7,
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',

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
    flexDirection: 'row',
    borderColor: 'rgba(159, 159, 159, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  login1: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  textinput: {
    width: '90%',
    color: '#424243',
    fontFamily: 'Nunito-Medium',
    top: 1,
    paddingLeft: -3,
  },
  textinput1: {
    width: '50%',
    color: '#424243',
    fontFamily: 'Nunito-Medium',
    top: 2,
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
    justifyContent: 'space-evenly',
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
  countrymodal: {
    width: '100%',
    backgroundColor: '#FFF',
    height: '64%',
    position: 'absolute',
    top: -14,
    left: 30,
    borderRadius: 9,
    zIndex: 1,
  },
  flagimg: {
    marginRight: 10,
    alignSelf: 'center',
    height: 20,
    width: 30,
    borderRadius: 3,
  },
  dialcodest: {
    marginRight: 10,
    alignSelf: 'center',
    color: '#424243',
  },
});
export default SignupScreen;
