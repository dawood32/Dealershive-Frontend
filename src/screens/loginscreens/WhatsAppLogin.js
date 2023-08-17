import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import LoginHeader from './Loginheader';
import WeChatLogin from './WeChatLogin';
import {CountryCodes} from '../../components/CountryCodes';
import {whatsapplogin} from '../../redux/action/authcall';
import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {googlesign} from '../../redux/action/authcall';

const WhatsAppLogin = ({navigation}) => {
  const dispatch = useDispatch();
  const [showCountryList, setShowCountryList] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState();
  const [CwhatsappNumber, setCWhatsappNumber] = useState();
  const [checkterms, setCheckTerms] = useState(true);
  const [rember, setRember] = useState(true);
  const [countryList, setCountryList] = useState([]);
  const [dialsCode, setDialsCode] = useState(+1);
  const [flag, setFlage] = useState(AppImages.USA);
  const [country, setCountry] = useState();
  const [disableButton, setDisableButton] = useState(true);
  const [showmessage, setshowmessage] = useState(false);
  const [message, setmessage] = useState('');

  const [weChatPanel, setWeChatPanel] = useState(false);
  const handleterms = () => {
    const updateterms = !checkterms;
    setCheckTerms(!checkterms);
    if (!whatsappNumber || updateterms == false) {
      setDisableButton(true);
    } else {
      setDisableButton(false);
    }
  };
  const remberme = () => {
    setRember(!rember);
  };

  const countrydropdown = () => {
    Keyboard.dismiss();
    setShowCountryList(!showCountryList);
  };
  const handlewhatsappnumber = e => {
    setshowmessage(false);
    setWhatsappNumber(e);
    {
      checkterms ? setDisableButton(false) : null;
    }

    setCWhatsappNumber(dialsCode + e);
    if (!e) {
      setDisableButton(true);
    }
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
  const onSucces4 = async res => {
    console.log('user already exist', res.status);
    if (res.message == false) {
      // Alert.alert(res.message);
      navigation.navigate('AccountValidation');

      await GoogleSignin.signOut();
    } else {
      navigation.replace('AppStack');
    }
  };

  const loginwithemail = () => {
    navigation.navigate('LoginWithEmail');
  };
  const wechat = () => {
    setWeChatPanel(true);
    console.log('true');
  };
  const countryselect = e => {
    console.log(e.flag, 'jjjj');

    setShowCountryList(false);
    setDialsCode(e.dialCode);
    setFlage(e.flag);
    setCountry(e.name);
    setCWhatsappNumber(e + whatsappNumber);
  };
  // api code
  const verifypasscode = () => {
    var phoneno = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
    if (whatsappNumber.match(phoneno)) {
      console.log('kkkkk');
    } else {
      console.log('jjjjj');
    }
    let params = JSON.stringify({
      number: +(dialsCode + whatsappNumber),
      type: 'login',
    });
    dispatch(whatsapplogin(params, success));
  };

  const success = res => {
    if (res.status == true) {
      if (res.authorized) {
        navigation.navigate('VerifyPasscode', {
          status: 'whatsapp',
          number: +(dialsCode + whatsappNumber),
        });
      } else {
        navigation.navigate('AccountValidation');
      }
    } else {
      setmessage(res.message);
      setshowmessage(true);
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
          {showCountryList ? (
            <View
              style={{
                width: '100%',
                backgroundColor: '#FFF',
                height: '79%',
                position: 'absolute',
                top: '-61%',
                left: 30,
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
                    // backgroundColor: 'red',
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
                        // backgroundColor: 'green',
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
          <View style={styles.loginview}>
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

              <Text
                style={{
                  marginRight: 10,
                  alignSelf: 'center',
                  color: '#424243',
                }}>
                +{dialsCode}
              </Text>
            </TouchableOpacity>
            <TextInput
              placeholder="000-0000"
              placeholderTextColor={'#838FA0'}
              style={styles.textinput}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="numeric"
              onChangeText={handlewhatsappnumber}
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
              <TouchableOpacity style={{width: 30}} onPress={remberme}>
                {rember ? (
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
              <Text style={styles.termtext}>Remember me</Text>
            </View>
          </View>
        </View>
        {/* bottomContainer */}

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            disabled={disableButton ? true : false}
            onPress={() => {
              verifypasscode();
            }}
            style={[
              styles.loginview1,
              {
                backgroundColor: disableButton
                  ? 'rgba(25, 36, 44,0.2)'
                  : 'rgba(25, 36, 44,1)',
                top: 5,
              },
            ]}>
            <Text style={styles.login}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.loginwith}>or login with</Text>
          <View style={styles.bottomiconContainer}>
            <View style={styles.iconsubcontainer}>
              <TouchableOpacity
                onPress={loginwithemail}
                style={styles.iconView}>
                <Image
                  style={{width: 32, height: 32}}
                  source={AppImages.emial}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={googlelogin} style={styles.iconView}>
                <Image
                  style={{width: 32, height: 32}}
                  source={AppImages.Google}
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
          {/* {
          showCountryList?
         <View style={{width:'100%',backgroundColor:"#FFF",height:'65%',position:'absolute',top:-38,left:30,borderRadius:9}}>
            <FlatList
            data={CountryCodes}
            scrollEnabled
            keyExtractor={(item,index)=>index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({item})=>{
                return(
                    <TouchableOpacity 
                    onPress={()=>countryselect(item)}
                    style={{flexDirection:'row',marginTop:15,paddingLeft:20}}>
                        <Image
                        source={item.flag}
                        style={{marginRight:10}}
                        />
                        <Text style={{alignSelf:'center',color:"#424243"}}>{item.name}</Text>
                        </TouchableOpacity>
                )
            }}
            
            />
            </View> :null} */}
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
    // paddingTop: 40,
    justifyContent: 'space-between',
  },
  loginview: {
    width: '100%',
    height: 60,
    borderRadius: 70,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',
    marginTop: 50,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  loginview1: {
    width: '100%',
    height: 62,
    borderRadius: 50,
    borderWidth: 1,
    flexDirection: 'row',
    borderColor: 'solid rgba(159, 159, 159, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#19242C',
    paddingHorizontal: 20,
  },
  textinput: {
    width: '70%',
    color: '#424243',
    fontFamily: 'Nunito-Medium',
  },
  login: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
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
    paddingBottom: 40,
    justifyContent: 'space-evenly',
  },
  termscondition: {
    flexDirection: 'row',
  },
  termscondition1: {
    flexDirection: 'row',
    top: 4,
  },

  termtext: {
    maxWidth: '90%',
    color: '#838FA0',
    fontFamily: 'Nunito-Medium',
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
  vectoricon: {
    marginRight: 13,
  },
  termtext: {
    maxWidth: '90%',
    color: '#838FA0',
    fontFamily: 'Nunito-Medium',
    lineHeight: 22,
  },
  termtextunderline: {
    color: '#EA8C00',
    textDecorationLine: 'underline',
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
    height: 35,
  },
});
export default WhatsAppLogin;
