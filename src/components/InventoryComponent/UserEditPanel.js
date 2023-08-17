import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Clipboard,
  TextInput,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {SwipeablePanel} from 'rn-swipeable-panel-with-fade-out';
import {AppImages} from '../AppImages';
const {height, width} = Dimensions.get('screen');
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {UserEditProfile} from '../../redux/action/appcall';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {RNS3} from 'react-native-aws3';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserProfileData} from '../../redux/action/appcall';
var pimg;
var bimg;
const UserEditPanel = ({isPanelActive, setIsPanelActive, closePanel}) => {
  const userData = useSelector(state => state?.UserProfileReducer?.data?.data);
  const [coverFilePath, setCoverFilePath] = useState('');
  const dispatch = useDispatch();
  const [DT1, setDT1] = useState(true);
  const [DT2, setDT2] = useState(false);

  const [DT3, setDT3] = useState(false);

  const newArray = [
    {
      name: 'AED',
    },
    {
      name: 'pkr',
    },
  ];
  const [businessName, setBusinessName] = useState();
  const [contactName, setContactName] = useState();

  const [phoneNumber, setPhoneNumber] = useState();

  const [DealerType, setDealerType] = useState('shop');
  const [shopCurrency, setShopCurrency] = useState();
  const [storeURL, setStoreURL] = useState();
  const [busniessLocation, setBusinessLocation] = useState();
  const [countryname, setCountryName] = useState();
  const [userDescription, setUserDescription] = useState();
  const [filePath, setFilePath] = useState('');
  const [showIndicator, setShowIndicator] = useState(false);
  const [panelProps, setPanelProps] = useState({
    noBar: true,
    fullWidth: true,
    openLarge: true,
    closeOnTouchOutside: true,
    // onlyLarge: true,
    scrollViewProps: {
      // scrollEnabled:false,
      showsVerticalScrollIndicator: false,
    },
    showCloseButton: false,
    onClose: () => closePanel(),
    onPressCloseButton: () => closePanel(),
    // ...or any prop you want
  });

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const editfunc = (imgname, imgprofile) => {
    console.log(imgname, imgprofile, 'checkdata');
    let params = JSON.stringify({
      user_name: contactName,
      shop_name: businessName,
      dealer_type: DealerType,
      shop_currency: shopCurrency,
      storeurl: storeURL,
      location: busniessLocation,
      description: userDescription,
      image: imgprofile,
      background_image: imgname,
      phone: phoneNumber,
      country: countryname,
    });

    dispatch(UserEditProfile(params, onSuccess));
  };
  const editfunc1 = () => {
    let params = JSON.stringify({
      user_name: contactName,
      shop_name: businessName,
      dealer_type: DealerType,
      shop_currency: shopCurrency,
      storeurl: storeURL,
      location: busniessLocation,
      description: userDescription,
      image: pimg,
      background_image: bimg,
      phone: phoneNumber,
      country: countryname,
    });

    dispatch(UserEditProfile(params, onSuccess2));
  };

  const onSuccess = async res => {
    console.log(res, 'k1qc');
    if (res.status == true) {
      let userid = await AsyncStorage.getItem('@user_id');
      let iduser = +userid;
      let params = 'id=' + iduser;
      dispatch(UserProfileData(params, onSuccess1));
    }
  };
  const onSuccess2 = async res => {
    console.log(res, 'wk1qc');
    if (res.status == true) {
      let userid = await AsyncStorage.getItem('@user_id');
      let iduser = +userid;
      let params = 'id=' + iduser;
      dispatch(UserProfileData(params, onSuccess3));
    }
  };
  const onSuccess3 = () => {
  setShowIndicator(false)
    setIsPanelActive(false);
  };

  const onSuccess1 = () => {
    //  setIsPanelActive(false)
  };
  const imgbuketpath = async () => {
    let link = await AsyncStorage.getItem('@platform_tuity_link');
    if (userData?.dealer_image != null) {
      let path = userData?.dealer_image;
      setFilePath(path);
    }
    if (userData?.background_image != null) {
      let backimgpath = userData?.background_image;
      setCoverFilePath(backimgpath);
    }
  };

  useEffect(() => {
    setBusinessName(userData?.shop_name);
    setContactName(userData?.username);
    setPhoneNumber(userData?.phone);
    dealershopcondition();
    setShopCurrency(userData?.shop_currency);
    setStoreURL(userData?.storeurl);
    setUserDescription(userData?.shop_description);
    setCountryName(userData?.country);
    setBusinessLocation(userData?.address);
    imgbuketpath();
  }, []);
  const dealershopcondition = () => {
    {
      userData?.dealer_type
        ? setDealerType(userData?.dealer_type)
        : setDealerType('shop');
    }
  };
  function makeid(length) {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const imagepicker = type => {
    var options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose Photo from Custom Option',
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        {
          type == 'cover'
            ? (setCoverFilePath(response.assets[0].uri),
              uploadimage(response.assets[0].uri, 'cover'))
            : (setFilePath(response.assets[0].uri),
              uploadimage(response.assets[0].uri, 'profile'));
        }
      }
    });
  };
  const uploadimage = async (uri, imgtype) => {
    let aws_bucket = await AsyncStorage.getItem('@aws_bucket');
    let aws_bucket_region = await AsyncStorage.getItem('@aws_bucket_region');
    let aws_bucket_accessKey = await AsyncStorage.getItem(
      '@aws_bucket_accessKey',
    );
    let aws_bucket_secretKey = await AsyncStorage.getItem(
      '@aws_bucket_secretKey',
    );
    let randomName = makeid(20);
    console.log(imgtype, 'rns3421');
    // let imagename = randomName + '.png';
    if (imgtype == 'cover') {
      var imagename =
        'https://dealershive.s3.us-east-2.amazonaws.com/' +
        'users/' +
        randomName +
        '.png';
    } else if (imgtype == 'profile') {
      var imageprofilename =
        'https://dealershive.s3.us-east-2.amazonaws.com/' +
        'users/' +
        randomName +
        '.png';
    }
    (pimg = imageprofilename), (bimg = imagename);
    editfunc(imagename, imageprofilename);
    const file = {
      uri: uri,
      name: randomName + '.png',
      type: 'image/png',
    };

    const options = {
      keyPrefix: 'users/',
      bucket: aws_bucket,
      region: aws_bucket_region,
      accessKey: aws_bucket_accessKey,
      secretKey: aws_bucket_secretKey,
      successActionStatus: 201,
    };
    try {
      RNS3.put(file, options)
        .then(response => {
          if (response.status !== 201) {
            console.log('RNS3 bucket upload ');

            throw new Error('Failed to upload image to S3');
          } else {
            console.log(response, 'kkkkkuploading');
          }
        })
        .catch(e => {
          console.log(e, 'RNS3 bucket upload thumbnail error');
        });
    } catch (error) {
      console.log(error, 'RNS3 bucket upload Thumbnail error');
    }
  };

  return (
    <SwipeablePanel
      style={{height: height * 0.82}}
      {...panelProps}
      isActive={isPanelActive}>
      {coverFilePath ? (
        <ImageBackground style={{height: 160}} source={{uri: coverFilePath}}>
          <TouchableOpacity
            style={styles.coverbtn}
            onPress={() => {
              imagepicker('cover');
            }}>
            <Image style={styles.imgcamera} source={AppImages.camera} />
          </TouchableOpacity>
        </ImageBackground>
      ) : (
        <ImageBackground
          style={{height: 160, alignItems: 'flex-end'}}
          source={AppImages.editbusinessimg}>
          <TouchableOpacity
            style={styles.changecover}
            onPress={() => {
              imagepicker('cover');
            }}>
            <Text style={{color: '#FFF', fontFamily: 'Nunito-Medium'}}>
              upload your store/business logo
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      )}

      <View style={styles.imgg}>
        <TouchableOpacity onPress={() => imagepicker('profile')}>
          {filePath ? (
            <ImageBackground
              borderRadius={500}
              style={styles.profileimg}
              source={{
                uri: filePath,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  tintColor: '#000',
                  width: 30,
                  height: 30,
                }}
                source={AppImages.camera}
              />
            </ImageBackground>
          ) : (
            <Image
              borderRadius={500}
              style={styles.changeprofile}
              source={AppImages.circle}></Image>
          )}
        </TouchableOpacity>
        <Text style={styles.changeprofiletext}>change your profile</Text>
      </View>

      <View style={styles.Swipeabletxt}>
        <Text style={styles.txtheading}>Business Name</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Platform.OS == 'ios' ? 5 : null,
          }}>
          <Image
            style={{marginRight: 10, width: 20, height: 20}}
            source={AppImages.user}></Image>
          <TextInput
            placeholder="Enter business name"
            placeholderTextColor="#606468"
            style={styles.input}
            value={businessName}
            onChangeText={e => setBusinessName(e)}></TextInput>
        </View>
      </View>
      <View style={styles.Swipeabletxt}>
        <Text style={styles.txtheading}>Contact Name</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Platform.OS == 'ios' ? 10 : null,
          }}>
          {filePath ? (
            <Image
              borderRadius={50}
              style={{marginRight: 10, width: 30, height: 30}}
              source={{uri: filePath}}
            />
          ) : (
            <Image
              borderRadius={100}
              source={AppImages.dummyprofile}
              style={{borderRadius: 500, width: 30, height: 30}}
            />
          )}

          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#606468"
            style={styles.input}
            value={contactName}
            onChangeText={e => setContactName(e)}></TextInput>
        </View>
      </View>
      <View style={styles.Swipeabletxt}>
        <Text style={styles.txtheading}>Phone Number</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Platform.OS == 'ios' ? 10 : null,
          }}>
          <Image
            style={{marginRight: 10, width: 20, height: 20}}
            source={AppImages.phon}></Image>
          <TextInput
            placeholder="Enter phone number"
            placeholderTextColor="#606468"
            keyboardType="numeric"
            style={styles.input}
            value={phoneNumber}
            onChangeText={e => setPhoneNumber(e)}></TextInput>
        </View>
      </View>
      <View style={styles.txtheading2}>
        <Text style={styles.txt2}>Select Dealer Type</Text>

        <View style={styles.txt3}>
          <TouchableOpacity
            onPress={() => {
              setDT1(true), setDT2(false), setDT3(false), setDealerType('shop');
            }}
            style={styles.txt4}>
            {DT1 ? (
              <View style={styles.circl} />
            ) : (
              <View style={styles.circl2heading} />
            )}
            <Text style={styles.circltxt}>Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDT1(false),
                setDT2(true),
                setDT3(false),
                setDealerType('office');
            }}
            style={styles.circl2}>
            {DT2 ? (
              <View style={styles.circl} />
            ) : (
              <View style={styles.circl2heading} />
            )}

            <Text style={styles.circl2txt}>Office</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setDT1(false),
                setDT2(false),
                setDT3(true),
                setDealerType('independent');
            }}
            style={styles.circl3}>
            {DT3 ? (
              <View style={styles.circl} />
            ) : (
              <View style={styles.circl2heading} />
            )}

            <Text style={styles.circl3txt}>Independent</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.heading3}>Select Shop Currency</Text>
        <View style={styles.txtview}>
          <Image
            style={{marginRight: 25, width: 20, height: 20}}
            source={AppImages.Group}></Image>
          <View style={{width: '87%'}}>
            <Dropdown
              data={newArray}
              placeholder="Any"
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              placeholderStyle={styles.placeholderStyle}
              labelField="name"
              valueField="name"
              value={shopCurrency}
              onChange={e => {
                setShopCurrency(e.name);
              }}
              containerStyle={styles.containerStyle}
              itemTextStyle={styles.itemTextStyle}
              itemContainerStyle={styles.itemContainerStyle}
              iconColor="black"
            />
          </View>
        </View>
      </View>

      <View style={styles.Swipeabletxt}>
        <Text style={styles.contentheading}>Store URL</Text>
        {showIndicator ? (
          <ActivityIndicator position="absolute" size="large" color="#EA8C00" />
        ) : null}

        <View style={styles.midview}>
          <Image
            style={{marginRight: 10, width: 20, height: 20}}
            source={AppImages.link}></Image>
          <TextInput
            placeholder="Enter URL"
            placeholderTextColor="#606468"
            style={styles.input}
            value={storeURL}
            onChangeText={e => setStoreURL(e)}
          />
        </View>
      </View>
      <View style={styles.Swipeabletxt}>
        <Text style={styles.txtheading}>Country</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Platform.OS == 'ios' ? 10 : null,
          }}>
          <Image
            style={{marginRight: 10, width: 20, height: 20}}
            source={AppImages.location}></Image>
          <TextInput
            placeholder="Enter country name"
            placeholderTextColor="#606468"
            style={styles.input}
            value={countryname}
            onChangeText={e => setCountryName(e)}
          />
        </View>
      </View>

      <View style={styles.Swipeabletxt}>
        <Text style={styles.txtheading}>Business Location</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Platform.OS == 'ios' ? 10 : null,
          }}>
          <Image
            style={{marginRight: 10, width: 20, height: 20}}
            source={AppImages.location}></Image>
          <TextInput
            placeholder="Enter business address"
            placeholderTextColor="#606468"
            style={styles.input}
            value={busniessLocation}
            onChangeText={e => setBusinessLocation(e)}
          />
        </View>
      </View>
      <View style={styles.Swipeabletxtt}>
        <Text style={styles.txtheading}>Business Description</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: Platform.OS == 'ios' ? 10 : null,
          }}>
          <Image
            style={{marginRight: 10, width: 20, height: 20}}
            source={AppImages.note}></Image>
          <TextInput
            placeholder="type here..."
            placeholderTextColor="#606468"
            style={styles.input}
            value={userDescription}
            onChangeText={e => setUserDescription(e)}
          />
        </View>
      </View>
      <View style={styles.buttonview}>
        <TouchableOpacity onPress={() => closePanel()} style={styles.button}>
          <Text style={styles.buttontxt}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setShowIndicator(true);
            editfunc1();
          }}
          style={styles.button1}>
          <Text style={styles.button1txt}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 60}} />
    </SwipeablePanel>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // justifyContent: 'space-between'
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 20,
  },
  toastStyle: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 0,
    backgroundColor: 'black',
  },
  header: {
    flex: 0.2,
    backgroundColor: '#19242C',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  titleStyle: {
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Nunito-Medium',
  },
  indicatStyle: {
    width: '100%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
  },
  titleStylee: {
    fontSize: 14,
    alignSelf: 'center',
    textAlign: 'center',
    fontFamily: 'Nunito-Bold',
    width: 70,
  },
  contentheading: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
  midview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copylink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copylinktext: {
    color: '#19242C',
    paddingLeft: 10,
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
  },
  img: {
    width: 100,
    height: 80,
    marginTop: -50,
  },
  headerview: {
    height: 62,
    paddingHorizontal: 20,
    flexDirection: 'row',
    width: 170,
    justifyContent: 'space-between',
    paddingTop: 12,
  },
  headerviewtxt: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  headerviewtxt1: {
    fontSize: 14,
    fontFamily: 'Nunito-bold',
    color: '#838FA0',
    paddingTop: 5,
  },
  heading: {
    paddingHorizontal: 20,
    height: 63,
    flexDirection: 'row',
    justifyContent: 'space-around',

    alignItems: 'center',
    backgroundColor: '#FCFDFE',
  },

  card: {
    flex: 0.13,
    paddingHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    // backgroundColor:'red'
  },
  card1: {
    backgroundColor: '#F9F9F9',
    width: 150,
    justifyContent: 'center',
    borderRadius: 12,
    height: 80,
    paddingLeft: 15,
  },
  card3: {
    color: '#19242C',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    paddingBottom: 6,
  },
  card1text: {
    color: '#19242C',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    paddingBottom: 6,
  },
  card1textt: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  card2: {
    backgroundColor: '#F9F9F9',
    width: 150,
    justifyContent: 'center',
    borderRadius: 12,
    height: 80,
    paddingLeft: 15,
  },
  card2text: {
    color: '#19242C',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    paddingBottom: 6,
  },
  card2textt: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  contentview: {
    flex: 0.44,
    paddingHorizontal: 20,
    // backgroundColor:'green'
  },
  headingg: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 295,
    alignItems: 'center',
    height: 40,
  },
  headinggtxt: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Nunito-ExtraBold',
  },
  headinggtxt1: {
    color: '#EA8C00',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nunito-Medium',
  },
  textview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 275,
    alignItems: 'center',
    height: 60,
  },
  text1: {
    color: '#19242C',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
  text2: {
    color: '#838FA0',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nunito-Medium',
  },
  text3: {
    color: '#EA8C00',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nunito-Medium',
  },
  text4: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },

  Swipeableheader: {
    backgroundColor: '#B7C4CC',
    height: 150,
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 25,
    // backgroundColor:"red"r
  },
  imgg: {
    alignItems: 'center',
    marginTop: -50,
    // backgroundColor: 'red',
  },
  Swipeabletxt: {
    marginTop: 20,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    // height: 60,
    borderColor: '#EAECF0',
    // backgroundColor:'lightgreen',
    paddingBottom: Platform.OS == 'ios' ? 10 : null,
  },
  Swipeabletxtt: {
    marginTop: 15,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    // paddingBottom:10,
    borderColor: '#EAECF0',
    // backgroundColor:'red'
  },
  txtheading: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
  input: {
    color: '#19242C',
    paddingLeft: 14,
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    width: '93%',
    // backgroundColor: 'red',
  },
  inputt: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    // backgroundColor:'red',
    width: 290,
  },
  txtheading2: {
    marginTop: 10,
    marginHorizontal: 20,
    borderBottomWidth: 1,
    height: 120,
    borderColor: '#EAECF0',
  },
  txt2: {
    color: '#838FA0',
    fontSize: 13,
    fontWeight: 400,
    fontStyle: 'normal',
    fontFamily: 'Nunito-Medium',
  },
  txt3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  txt4: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circl: {
    borderRadius: 50,
    borderColor: '#EA8C00',
    borderWidth: 5,
    width: 18,
    height: 18,
  },
  circltxt: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    paddingLeft: 10,
  },
  circl2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circl2heading: {
    borderRadius: 50,
    borderColor: '#838FA0',
    borderWidth: 1,
    width: 16,
    height: 16,
  },
  circl2txt: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    paddingLeft: 10,
  },
  circl3: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  circl3heading: {
    borderRadius: 50,
    borderColor: '#838FA0',
    borderWidth: 1,
    width: 16,
    height: 16,
  },
  circl3txt: {
    color: '#19242C',
    fontSize: 15,
    fontFamily: 'Nunito-Medium',
    paddingLeft: 10,
  },
  heading3: {
    color: '#838FA0',
    fontSize: 13,
    fontWeight: 400,
    fontStyle: 'normal',
    fontFamily: 'Nunito-Medium',
    paddingTop: 15,
  },
  txtview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 6,
  },
  txtviewtxt: {
    color: '#19242C',
    fontSize: 15,
    fontFamily: 'Nunito-Bold',
    paddingLeft: 10,
  },
  buttonview: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttontxt: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
  button1: {
    backgroundColor: '#EA8C00',
    width: 150,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  button1txt: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
  selectedTextStyle: {
    color: '#202342',
    fontFamily: 'Nunito-Medium',
  },
  inputSearchStyle: {
    color: '#202342',
  },
  placeholderStyle: {
    color: '#606468',

    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  itemTextStyle: {
    color: '#202342',

    // borderColor:'black',
    // padding:2,
    // borderRadius:20
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  coverbtn: {
    width: '100%',
    height: '100%',
    alignItems: 'flex-end',
  },
  imgcamera: {
    marginRight: 20,
    marginTop: 20,
    width: 30,
    height: 30,
    tintColor: '#FFF',
  },
  changecover: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileimg: {
    width: 89,
    height: 89,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeprofile: {
    width: 89,
    height: 89,
  },
  changeprofiletext: {
    color: '#EA8C00',
    fontFamily: 'Nunito-Medium',
    textDecorationLine: 'underline',
  },
});

export default UserEditPanel;
