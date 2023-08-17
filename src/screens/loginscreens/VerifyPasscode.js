import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import CountDown from 'react-native-countdown-component';
import {loginemail} from '../../redux/action/authcall';
import {useDispatch, useSelector} from 'react-redux';
import {whatsapplogin} from '../../redux/action/authcall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Image} from 'react-native-animatable';
const VerifyPasscode = ({navigation, route}) => {
  const rember = useSelector(state => state?.RembermeReducer?.data);
  useEffect(() => {}, [pin1, pin2, pin3, pin4]);
  const dispatch = useDispatch();
  const [wrongPasscode, setWrongPasscode] = useState(false);
  const [expire, setExpire] = useState(false);
  let [timerVisible, setTimerVisible] = useState(true);
  const [pin1, setPin1] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [pin2, setPin2] = useState('');
  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const timeout = () => {
    setTimerVisible(false);
  };
  const remeberme = () => {
    {
      rember
        ? AsyncStorage.setItem('@IsLogin', 'true')
        : AsyncStorage.setItem('@IsLogin', 'false');
    }
  };

  const storeData = async res => {
    const username = res.user.username;
    const userid = res.user.id;
    const useremail = res.user.email;
    const accesstoken = res.token;
    console.log(res.token, 'kkkddd');

    await AsyncStorage.setItem('@username', username);
    await AsyncStorage.setItem('@user_id', userid.toString());

    await AsyncStorage.setItem('@user_email', useremail);

    await AsyncStorage.setItem('@access_token', accesstoken);
    navigation.replace('AppStack');
  };
  const handlePin1Change = text => {
    p1 = text;
    setPin1(text);
    if (text !== '') {
      setTimeout(() => pin2Ref.current.focus(), 100); // Delay the focus action by 300 milliseconds
    }
  };
  const handlePin2Change = text => {
    p2 = text;

    setPin2(text);
    if (text !== '') {
      setTimeout(() => pin3Ref.current.focus(), 100); // Delay the focus action by 300 milliseconds
    }
  };
  const handlePin3Change = text => {
    p3 = text;

    setPin3(text);
    if (text !== '') {
      setTimeout(() => pin4Ref.current.focus(), 100); // Delay the focus action by 300 milliseconds
    }
  };

  const handlePin4Change = text => {
    p4 = text;

    setPin4(text);
    console.log(text, 'eee');
  };

  //api code...................................................
  const verifycode = () => {
    console.log(rember, 'remember');
    var date = new Date();
    var offsetInHours = date.getTimezoneOffset();
    if (route.params.status == 'email') {
      let params = JSON.stringify({
        email: route.params.email,
        type: 'verify',
        passcode: +(pin1 + pin2 + pin3 + pin4),
        timezone: offsetInHours,
      });
      dispatch(loginemail(params, success));
    } else if (route.params.status == 'whatsapp') {
      let params = JSON.stringify({
        number: route.params.number,
        type: 'verify',
        passcode: +(pin1 + pin2 + pin3 + pin4),
      });
      dispatch(whatsapplogin(params, success2));
    }
  };

  const success2 = res => {
    console.log(res.message, 'checki91');
    if (res.status == true) {
      remeberme();
      storeData(res);
      // navigation.navigate('LoginLoader')
    } else {
      {
        res.message == 'Invalid '
          ? (setWrongPasscode(true), setExpire(false))
          : (setExpire(true), setWrongPasscode(false));
      }
    }
  };
  const success = res => {
    console.log(res, 'loginresponse');
    if (res.status == true) {
      remeberme();
      storeData(res);
      //  navigation.navigate('LoginLoader')
    } else {
      {
        res.message == 'Invalid '
          ? (setWrongPasscode(true), setExpire(false))
          : (setExpire(true), setWrongPasscode(false));
      }
    }
  };
  const resendagain = () => {
    setWrongPasscode(false);
    setExpire(false);
    setPin1();
    setPin2();
    setPin3();
    setPin4();

    var date = new Date();
    var offsetInHours = date.getTimezoneOffset();
    if (route.params.status == 'email') {
      let params = JSON.stringify({
        email: route.params.email,
        type: 'login',
        timezone: offsetInHours,
      });
      dispatch(loginemail(params, success1));
    } else {
      console.log('kkkk');
      let params = JSON.stringify({
        number: +route.params.number,
        type: 'login',
      });
      dispatch(whatsapplogin(params, success3));
    }
  };
  const success3 = res => {
    console.log(res, 'ppppp');
    if (res.status == true) {
      setTimerVisible(true);
    }
  };

  const success1 = res => {
    if (res.status == true) {
      setTimerVisible(true);
    }
  };
  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={AppImages.Loginbackground}
        style={styles.imgbackground}>
        {/* top Container */}

        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              width: 50,
              height: 40,
              top: -35,
              justifyContent: 'center',
              left: -10,
            }}>
            <Image
              style={{left: 10, width: 24, height: 24}}
              source={AppImages.arrowback}
            />
          </TouchableOpacity>
          <Text style={styles.verifypasscode}>Verify Passcode</Text>

          {route.params.status == 'email' ? (
            <View style={styles.topview}>
              <Text style={styles.entercode}>
                Enter the code sent to{' '}
                <Text style={styles.emailtext}>{route.params.email}</Text>
              </Text>
            </View>
          ) : null}
          {route.params.status == 'whatsapp' ? (
            <View style={styles.topview}>
              <Text style={styles.entercode}>
                Enter the passcode sent to your {'\n'} WhatsApp "
                <Text style={styles.emailtext}>
                  +{route.params.number}
                  <Text style={styles.entercode}>"</Text>
                </Text>
              </Text>
            </View>
          ) : null}
        </View>
        {/* middleContainer */}
        <View style={styles.middleContainer}>
          <View style={styles.midleheight}>
            <View style={styles.otpview}>
              <TextInput
                ref={pin1Ref}
                style={styles.textinput}
                maxLength={1}
                keyboardType={'numeric'}
                onChangeText={handlePin1Change}
                value={pin1}
              />
              <TextInput
                ref={pin2Ref}
                style={styles.textinput}
                maxLength={1}
                keyboardType={'numeric'}
                onChangeText={handlePin2Change}
                value={pin2}
              />

              <TextInput
                ref={pin3Ref}
                style={styles.textinput}
                maxLength={1}
                keyboardType={'numeric'}
                onChangeText={handlePin3Change}
                value={pin3}
              />

              <TextInput
                ref={pin4Ref}
                style={styles.textinput}
                maxLength={1}
                keyboardType={'numeric'}
                onChangeText={handlePin4Change}
                value={pin4}
              />
            </View>
            {wrongPasscode ? (
              <Text style={styles.wrongpasscode}>
                Wrong passcode used, Try again.
              </Text>
            ) : null}
            {expire ? (
              <Text style={styles.wrongpasscode}>Passcode expired</Text>
            ) : null}

            <View style={{flexDirection: 'row', paddingLeft: 20}}>
              <Text style={styles.notrecivedotp}>
                Didn't received the passcode?
                {timerVisible ? null : (
                  <Text
                    onPress={() => {
                      resendagain();
                    }}
                    style={styles.resend}>
                    {' '}
                    Resend Again
                  </Text>
                )}
              </Text>
              <View
                style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                {timerVisible ? (
                  <View style={{flexDirection: 'row'}}>
                    <CountDown
                      until={60}
                      onFinish={() => timeout()}
                      size={17}
                      timeToShow={['S']}
                      digitStyle={{backgroundColor: 'transparent'}}
                      digitTxtStyle={{
                        color: '#EA8C00',
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                      style={{fontFamily: 'Nunito', left: -8, top: 12}}
                      timeLabels={{s: ''}}
                    />
                    <Text
                      style={{
                        alignSelf: 'flex-end',
                        left: -16,
                        color: '#EA8C00',
                      }}>
                      Sec
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
        {/* bottomContainer */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            onPress={() => {
              verifycode();
            }}
            style={styles.loginview}>
            <Text style={styles.verify}>Verify</Text>
          </TouchableOpacity>
        </View>
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
  topContainer: {
    flex: 1.26,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
  },
  middleContainer: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  topview: {
    height: 80,
    justifyContent: 'space-between',
    top: 10,
  },
  verifypasscode: {
    color: '#0C0C0C',
    fontSize: 32,
    fontFamily: 'Nunito-Bold',
    textAlign: 'center',
  },
  entercode: {
    color: '#838FA0',
    fontFamily: 'Nunito-Medium',
    textAlign: 'center',
    lineHeight: 23,
  },
  loginview: {
    width: '100%',
    height: 62,
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19242C',
  },
  verify: {
    color: '#FFFFFF',
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
  },
  emailtext: {
    color: '#19242C',
    fontFamily: 'Nunito-Bold',
  },
  otpview: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  textinput: {
    width: 55,
    height: 70,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: '#FFF',
    flexDirection: 'row',
    marginRight: 10,
    borderRadius: 10,
    borderColor: 'rgba(93, 105, 118, 0.1)',
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    fontSize: 24,
    color: '#424243',
  },
  wrongpasscode: {
    color: '#CD1B1B',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    marginTop: 25,
    textAlign: 'center',
  },
  notrecivedotp: {
    color: '#838FA0',
    fontFamily: 'Nunito-Medium',
    marginTop: 25,
    textAlign: 'center',
  },
  midleheight: {
    height: 150,
  },
  resend: {
    color: '#EA8C00',
    fontFamily: 'Nunito-Medium',
    // alignSelf:'center',
  },
});

export default VerifyPasscode;
