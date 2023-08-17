import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import {AppImages} from '../AppImages';
import Video from 'react-native-video';
const {height, width} = Dimensions.get('screen');
import {PermissionsAndroid} from 'react-native';
import {DocumentPick} from './Documents';
import Location from './Location';
import {
  Menu,
  MenuOption,
  MenuTrigger,
  MenuOptions,
  MenuProvider,
} from 'react-native-popup-menu';
import Modal from 'react-native-modal';
import moment, {duration} from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {recentChat, sendmessage} from '../../redux/action/chatapi';
import {searchInbox} from '../../redux/action/chatapi';
import {recentchatsuccess} from '../../redux/type';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Uploadtobucket} from './Uploastobucket';
import {fileView} from './Documents';
import {messagelistsuccess} from '../../redux/type';
import {mutechat} from '../../redux/action/chatapi';
import {deleteChat} from '../../redux/action/chatapi';
import EmojiPicker from 'rn-emoji-keyboard';
import Geolocation from '@react-native-community/geolocation';
import MapView from 'react-native-maps';
import Audios from './Audios';
import RecordingWave from './Waves';
import PlayAudio from './PlayAudio';
var longitudes;
var latitudes;
var latitude;
var longitude;

const Chat = ({navigation, route}) => {
  const [location, setLocation] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [search, setSaearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [chat, setChat] = useState(false);
  const [blockChat, setBlockChat] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [mesgText, setMesgText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [imgPath, setImgPath] = useState(null);
  const [itemIndex, SetitemIndex] = useState(0);
  const [paused, setPaused] = useState(true);
  const [isLink, setisLink] = useState(false);
  const [muteTiming, setMuteTiming] = useState('8 hours');
  const [ispalying, setIsPlaying] = useState(false);

  const messageListData = useSelector(
    state => state?.MessageListReducer?.data?.chat_list,
  );
  const [isOpen, setIsOpen] = useState(false);
  const videoPlayer = useRef(null);
  const formatDuration = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };
  const deletechatfunc = item => {
    // setChat(true);

    if (item.status == 'send') {
      const chat_list = messageListData?.filter(
        data => data.to_user != route.params.Messagelist.to_user,
      );

      let k = {chat_list, status: true};

      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
      let params = 'id=' + route.params.Messagelist.to_user;
      dispatch(deleteChat(params));
      navigation.goBack();
    } else {
      const chat_list = messageListData?.filter(
        data => data.to_user != route.params.Messagelist.from_user,
      );

      let k = {chat_list, status: true};

      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
      let params = 'id=' + route.params.Messagelist.from_user;
      dispatch(deleteChat(params));
      // setChat(false);
      navigation.goBack();
    }
  };
  const dispatch = useDispatch();
  const recentchatdata = useSelector(
    state => state?.RecentChatReducer?.data?.data,
  );
  useEffect(() => {
    recentchatfunc(route.params.Messagelist);

    setUserInfo(route.params.Messagelist);
  }, []);
  const openUrl = url => {
    Linking.openURL(url);
  };
  const profilescreen = item => {
    if (item.status == 'send') {
      navigation.navigate('ViewProfile', {
        userId: route.params.Messagelist.to_user,
      });
    } else {
      navigation.navigate('ViewProfile', {
        userId: route.params.Messagelist.from_user,
      });
    }
  };
  const Mediascreen = item => {
    if (item.status == 'send') {
      navigation.navigate('Media', {
        userId: route.params.Messagelist.to_user,
      });
    } else {
      navigation.navigate('Media', {
        userId: route.params.Messagelist.from_user,
      });
    }
  };
  const recentchatfunc = item => {
    if (item.status == 'send') {
      let params = 'id=' + route.params.Messagelist.to_user;
      dispatch(recentChat(params));
    } else {
      let params = 'id=' + route.params.Messagelist.from_user;
      dispatch(recentChat(params));
    }
  };

  const handleback = () => {
    setSaearch(false);
    recentchatfunc(userInfo);
  };
  const urlRegex = /(https?|ftp):\/\/[^\s/$.?#].[^\s]*/i;
  const handleTextInput = () => {
    const isLink = urlRegex.test(mesgText);
    console.log(isLink, 'linkkkk');
    {
      isLink
        ? sendmesgfunc('link', 0, mesgText)
        : sendmesgfunc('text', 0, mesgText);
    }
  };
  const sendmesgfunc = (type, duration, msgText, orgname) => {
    console.log(userInfo.status, 'kiki');
    if (userInfo.status == 'send') {
      setMesgText('');
      const params = JSON.stringify({
        id: +userInfo.to_user,
        message: msgText,
        type: type,
        duration: duration,
        orignal_name: orgname,
      });
      dispatch(sendmessage(params, onSuccess));
    } else {
      setMesgText('');
      const params = JSON.stringify({
        id: +userInfo.from_user,
        message: msgText,
        type: type,
        duration: duration,
        orignal_name: orgname,
      });
      dispatch(sendmessage(params, onSuccess));
    }
  };

  const onSuccess = () => {
    recentchatfunc(userInfo);
    setLocation(false);
  };

  const searchresultfunc = item => {
    if (!searchText) {
      console.log('oic');
    } else {
      if (item.status == 'send') {
        let params =
          'id=' + route.params.Messagelist.to_user + '&search=' + searchText;
        dispatch(searchInbox(params, onSuccess1));
      } else {
        let params =
          'id=' + route.params.Messagelist.from_user + '&search=' + searchText;
        dispatch(searchInbox(params, onSuccess1));
      }
    }
  };

  const onSuccess1 = res => {
    console.log(res, 'kres');
    let data = res.message;
    let k = {data, status: true};
    dispatch({
      type: recentchatsuccess,
      payload: k,
    });
  };
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const opencamera = () => {
    requestCameraPermission();
    var options = {
      title: 'Select Image',
      mediaType: 'camera',
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
    launchCamera(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log(response, 'response32');
        let path = response.assets[0].uri;

        Uploadtobucket(path, 'image', sendmesgfunc);
      }
    });
  };
  const imgvideopicker = () => {
    var options = {
      fullscreen: true,
      title: 'Select Image',
      mediaType: 'video/image',

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
        console.log(response, 'response32');

        let pimage = response.assets[0].type.slice(0, 5);
        if (pimage == 'image') {
          console.log(response, 'gh32');
          setImgPath(response.assets[0].uri);
          Uploadtobucket(response.assets[0].uri, pimage, sendmesgfunc);
        } else if (pimage == 'video') {
          Uploadtobucket(
            response.assets[0].uri,
            pimage,
            sendmesgfunc,
            response.assets[0].duration,
          );
        }
      }
    });
  };
  const mutefunc = () => {
    if (userInfo.status == 'send') {
      const updatedData = messageListData?.map(data => {
        if (data?.to_user == +userInfo.to_user) {
          return {
            ...data,
            mute: true,
          };
        }
        return data;
      });

      let k = {chat_list: updatedData, status: true};

      dispatch({
        type: messagelistsuccess,
        payload: k,
      });

      let params =
        'duration=' + muteTiming.toString() + '&id=' + +userInfo.to_user;

      dispatch(mutechat(params));
      // setmute(true);
      setShowModal(false);
    } else {
      const updatedData = messageListData?.map(data => {
        if (data?.to_user == +userInfo.from_user) {
          return {
            ...data,
            mute: true,
          };
        }
        return data;
      });

      let k = {chat_list: updatedData, status: true};

      dispatch({
        type: messagelistsuccess,
        payload: k,
      });

      let params =
        'duration=' + muteTiming.toString() + '&id=' + +userInfo.from_user;

      dispatch(mutechat(params));
      // setmute(true);
      setShowModal(false);
    }
  };
  const handlePick = e => {
    setMesgText(mesgText + e.emoji);
  };

  const locationacall = () => {
    Geolocation.getCurrentPosition(info => {
      longitudes = info.coords.longitude;
      latitudes = info.coords.latitude;
      setLocation(true);
    });
  };

  const opengeolocation = (Lt, Long) => {
    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
    var url = scheme + `${Lt},${Long}`;
    Linking.openURL(url);
  };
  const [state, setState] = useState({
    isPlaying: false,
    isSelectedPlayId: null,
  });
  return (
    <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      {location ? (
        <Location
          sendmesgfunc={sendmesgfunc}
          longitudes={longitudes}
          latitudes={latitudes}
          setLocation={setLocation}
        />
      ) : (
        <View style={styles.container}>
          <EmojiPicker
            open={isOpen}
            onEmojiSelected={handlePick}
            onClose={() => setIsOpen(false)}
          />
          <View style={styles.header}>
            {search ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => handleback()}>
                  <Image
                    style={{width: 24, height: 24}}
                    source={AppImages.arrowback}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.mainsearch}>
                  <ImageBackground
                    // resizeMode='contain'
                    borderRadius={10}
                    source={AppImages.rename}
                    style={styles.imgbg}>
                    <TextInput
                      placeholder="Search watches, parts..."
                      style={styles.searchinput}
                      autoCorrect={false}
                      autoCapitalize="none"
                      value={searchText}
                      keyboardType={
                        Platform.OS == 'android' ? 'visible-password' : null
                      }
                      returnKeyType="search"
                      onChangeText={e => setSearchText(e)}
                      placeholderTextColor={'#9D9D9D'}
                    />

                    <TouchableOpacity
                      onPress={() => {
                        searchresultfunc(userInfo);
                      }}
                      style={{height: 51, width: 80}}></TouchableOpacity>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.headerview}>
                <View style={styles.header1}>
                  <TouchableOpacity
                    style={{
                      // backgroundColor: 'green',
                      width: 30,
                      height: 40,
                      // top: -10,
                    }}
                    onPress={() => {
                      navigation.goBack();
                    }}>
                    <Image
                      source={AppImages.arrowback}
                      style={{top: 7, width: 24, height: 24}}></Image>
                  </TouchableOpacity>
                  {userInfo?.image ? (
                    <Image
                      borderRadius={100}
                      style={{width: 40, height: 40, left: 10}}
                      source={{uri: userInfo?.image}}></Image>
                  ) : (
                    <Image
                      style={{width: 40, height: 40, left: 10}}
                      source={AppImages.dummyprofile}></Image>
                  )}
                  <View style={{left: 10}}>
                    <Text style={styles.headertext}>{userInfo?.user}</Text>
                    {userInfo?.online ? (
                      <Text style={styles.headertext1}>Online</Text>
                    ) : (
                      <Text style={styles.headertext1}>Seen recently</Text>
                    )}
                  </View>
                </View>
                <View style={styles.header2}>
                  <TouchableOpacity onPress={() => setSaearch(!search)}>
                    <Image
                      style={{height: 26, width: 26}}
                      source={AppImages.searchiconflag}
                    />
                  </TouchableOpacity>
                  <View>
                    <Menu>
                      <MenuTrigger>
                        <Image
                          source={AppImages.dotss}
                          style={{width: 24, height: 24}}></Image>
                      </MenuTrigger>
                      <MenuOptions
                        optionsContainerStyle={{
                          width: 150,
                          backgroundColor: 'white',
                          height: 190,
                          marginLeft: -20,
                          borderRadius: 10,
                          // justifyContent: 'center',
                          // alignItems:'flex-start',
                          paddingHorizontal: 15,
                        }}>
                        <View>
                          <MenuOption onSelect={() => profilescreen(userInfo)}>
                            <Text style={styles.menutxt}>View profile</Text>
                          </MenuOption>
                          <MenuOption onSelect={() => Mediascreen(userInfo)}>
                            <Text style={styles.menutxt}>Media</Text>
                          </MenuOption>
                          <MenuOption onSelect={() => setShowModal(true)}>
                            <Text style={styles.menutxt}>
                              Mute notification
                            </Text>
                          </MenuOption>
                          <MenuOption onSelect={() => setChat(true)}>
                            <Text style={styles.menutxt}>Clear Chat</Text>
                          </MenuOption>
                          <MenuOption onSelect={() => setBlockChat(true)}>
                            <Text style={styles.menutxt}>Block</Text>
                          </MenuOption>
                        </View>
                      </MenuOptions>
                    </Menu>
                  </View>
                </View>
              </View>
            )}
          </View>

          <View style={styles.flatlistview}>
            <View style={styles.fltlisttxt}>
              <Text style={styles.fltlisttxt1}>
                {moment(userInfo?.message_time).format('D MMM')}
              </Text>
            </View>
            <FlatList
              data={recentchatdata}
              inverted={search ? false : true}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                if (item.type == 'pdf') {
                  let cmnt = item.message;
                  Type = cmnt?.substr(cmnt.lastIndexOf('.') + 1);
                }
                if (item.type == 'location') {
                  const maplocation = item.message;
                  [latitude, longitude] = maplocation.split(',');
                  console.log(longitude, 'icccc');
                  var Lt = parseFloat(latitude);
                  var Long = parseFloat(longitude);
                  setShowMap(true);
                }
                return (
                  <View>
                    {item.status == 'recive' ? (
                      item.type == 'text' ? (
                        <View style={styles.otherview}>
                          <View style={{width: '15%'}}>
                            <Image source={item.image}></Image>
                          </View>
                          <View style={styles.category1}>
                            <View style={{width: '76%'}}>
                              <Text style={styles.categorytxt1}>
                                {item.message}
                              </Text>
                            </View>

                            <View
                              style={{
                                width: '22%',
                                fontFamily: 'Nunito-Medium',
                                alignSelf: 'flex-end',
                                // backgroundColor: 'green',
                              }}>
                              <Text style={styles.categorytime1}>
                                {moment(userInfo?.message_time).format('LT')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ) : item.type == 'img' ? (
                        <View style={styles.otherview}>
                          <View style={styles.category3}>
                            <TouchableOpacity>
                              <Image
                                style={{width: 100, height: 100}}
                                source={{uri: item.message}}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : item.type == 'video' ? (
                        <View style={styles.otherview}>
                          <TouchableOpacity
                            onPress={() => {
                              setPaused(!paused);
                              SetitemIndex(index);
                            }}
                            style={styles.category4}>
                            <Video
                              source={{
                                uri: item.message,
                              }}
                              resizeMode={'cover'}
                              ref={videoPlayer}
                              repeat={true}
                              onEnd={() => setPaused(true)}
                              style={{
                                position: 'relative',
                                height: 140,
                                width: 140,

                                borderRadius: 10,
                                backgroundColor: '#000000',
                                justifyContent: 'center',
                              }}
                              controls={false}
                              volume={100}
                              // resizeMode={"contain"}
                              fullscreen={true}
                              fullscreenAutorotate={true}
                              paused={index === itemIndex ? paused : true}
                            />

                            {index == itemIndex ? (
                              paused ? (
                                <Image
                                  style={{
                                    // tintColor: 'red',
                                    width: 30,
                                    height: 30,

                                    position: 'absolute',
                                    // alignSelf: 'center',
                                  }}
                                  source={AppImages.videoplay}
                                />
                              ) : null
                            ) : (
                              <Image
                                style={{
                                  // tintColor: 'red',
                                  width: 30,
                                  height: 30,
                                  // top: -73,
                                  // left: -40,
                                  position: 'absolute',
                                  // alignSelf: 'center',
                                }}
                                source={AppImages.videoplay}
                              />
                            )}

                            {index == itemIndex ? (
                              paused ? (
                                <Text
                                  style={{
                                    color: '#FFFFFF',
                                    fontSize: 14,

                                    top: 110,
                                    left: 80,

                                    position: 'absolute',
                                  }}>
                                  {formatDuration(item.duration)}
                                </Text>
                              ) : null
                            ) : (
                              <Text
                                style={{
                                  color: '#FFFFFF',
                                  fontSize: 14,

                                  top: 110,
                                  left: 80,
                                  position: 'absolute',
                                }}>
                                {formatDuration(item.duration)}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
                      ) : item.type == 'pdf' ? (
                        <View style={styles.otherview}>
                          <View
                            style={[
                              styles.category5,
                              {backgroundColor: '#F1F5F9'},
                            ]}>
                            <TouchableOpacity
                              onPress={() => fileView(item.message)}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                resizeMode="contain"
                                source={
                                  //icon for type pdf
                                  Type == 'pdf'
                                    ? AppImages.pdf
                                    : // icon for types doc and docx
                                    Type === 'doc' || Type == 'docx'
                                    ? AppImages.doc
                                    : Type === 'xls' || Type === 'xlsx'
                                    ? AppImages.xlsxicon
                                    : Type === 'png' ||
                                      Type === 'jpg' ||
                                      Type === 'jpeg'
                                    ? AppImages.imageicon
                                    : AppImages.othericon
                                }
                                style={{
                                  width: 36,
                                  height: 36,
                                  // position: "relative",
                                  right: 5,
                                }}
                              />
                              <Text
                                style={{
                                  color: '#838FA0',
                                  fontFamily: 'Nunito-Bold',
                                  width: '84%',
                                }}>
                                {item.orignal_name}
                              </Text>
                            </TouchableOpacity>
                            <View
                              style={{
                                width: '22%',
                                fontFamily: 'Nunito-Medium',
                                // backgroundColor: 'red',
                                justifyContent: 'flex-end',
                                alignSelf: 'flex-end',
                              }}>
                              <Text style={styles.categorytime1}>
                                {moment(userInfo?.message_time).format('LT')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ) : item.type == 'link' ? (
                        <View style={styles.otherview}>
                          <TouchableOpacity
                            onPress={() => openUrl(item.message)}
                            style={[
                              styles.category2,
                              {backgroundColor: '#F1F5F9'},
                            ]}>
                            <View style={{width: '76%'}}>
                              <Text
                                style={[
                                  styles.categorytxt1,
                                  {color: '#EA8C00'},
                                ]}>
                                {item.message}
                              </Text>
                            </View>

                            <View
                              style={{
                                width: '22%',
                                fontFamily: 'Nunito-Medium',
                                // backgroundColor: 'red',
                                justifyContent: 'flex-end',
                                alignSelf: 'flex-end',
                              }}>
                              <Text style={styles.categorytime1}>
                                {moment(userInfo?.message_time).format('LT')}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : item.type == 'location' ? (
                        <View style={styles.otherview}>
                          {showMap ? (
                            <TouchableOpacity
                              onPress={() => opengeolocation(Lt, Long)}
                              style={{
                                width: '76%',
                                height: 200,
                                padding: 5,
                                backgroundColor: '#F1F5F9',
                              }}>
                              <MapView
                                style={{
                                  width: '100%',
                                  height: '100%',
                                }}
                                scrollEnabled={false}
                                initialRegion={{
                                  latitude: Lt,
                                  longitude: Long,
                                  latitudeDelta: 0.0022,
                                  longitudeDelta: 0.0021,
                                }}
                              />
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      ) : item.type == 'audio' ? (
                        <View
                          style={{
                            marginBottom: 10,
                            backgroundColor: 'red',
                            width: '70%',
                            // alignSelf: 'flex-end',
                            borderRadius: 8,
                            // backgroundColor: '#EA8C00',
                            backgroundColor: 'lightgray',
                          }}>
                          <PlayAudio
                            item={item}
                            state={state}
                            setState={setState}
                          />
                        </View>
                      ) : null
                    ) : // send message

                    item.status == 'send' ? (
                      item.type === 'text' ? (
                        <View style={styles.normalview}>
                          <View style={styles.category2}>
                            <View style={{width: '76%'}}>
                              <Text style={styles.categorytxt11}>
                                {item.message}
                              </Text>
                            </View>

                            <View
                              style={{
                                width: '22%',
                                fontFamily: 'Nunito-Medium',
                                alignSelf: 'flex-end',
                              }}>
                              <Text style={styles.categorytime11}>
                                {moment(userInfo?.message_time).format('LT')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ) : item.type == 'img' ? (
                        <View style={styles.normalview}>
                          <View style={styles.category3}>
                            <TouchableOpacity>
                              <Image
                                style={{width: 100, height: 100}}
                                source={{uri: item.message}}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ) : item.type == 'video' ? (
                        <View style={styles.normalview1}>
                          <TouchableOpacity
                            onPress={() => {
                              setPaused(!paused);
                              SetitemIndex(index);
                            }}
                            style={styles.category4}>
                            <Video
                              source={{
                                uri: item.message,
                              }}
                              resizeMode={'cover'}
                              ref={videoPlayer}
                              repeat={true}
                              onEnd={() => setPaused(true)}
                              style={{
                                position: 'relative',
                                height: 140,
                                width: 140,

                                borderRadius: 10,
                                backgroundColor: '#000000',
                                justifyContent: 'center',
                              }}
                              controls={false}
                              volume={100}
                              // resizeMode={"contain"}
                              fullscreen={true}
                              fullscreenAutorotate={true}
                              paused={index === itemIndex ? paused : true}
                            />

                            {index == itemIndex ? (
                              paused ? (
                                <Image
                                  style={{
                                    // tintColor: 'red',
                                    width: 30,
                                    height: 30,

                                    position: 'absolute',
                                    // alignSelf: 'center',
                                  }}
                                  source={AppImages.videoplay}
                                />
                              ) : null
                            ) : (
                              <Image
                                style={{
                                  // tintColor: 'red',
                                  width: 30,
                                  height: 30,
                                  // top: -73,
                                  // left: -40,
                                  position: 'absolute',
                                  // alignSelf: 'center',
                                }}
                                source={AppImages.videoplay}
                              />
                            )}

                            {index == itemIndex ? (
                              paused ? (
                                <Text
                                  style={{
                                    color: '#FFFFFF',
                                    fontSize: 14,

                                    top: 110,
                                    left: 80,

                                    position: 'absolute',
                                  }}>
                                  {formatDuration(item.duration)}
                                </Text>
                              ) : null
                            ) : (
                              <Text
                                style={{
                                  color: '#FFFFFF',
                                  fontSize: 14,

                                  top: 110,
                                  left: 80,
                                  position: 'absolute',
                                }}>
                                {formatDuration(item.duration)}
                              </Text>
                            )}
                          </TouchableOpacity>
                        </View>
                      ) : item.type == 'pdf' ? (
                        <View style={styles.normalview}>
                          <View style={styles.category5}>
                            <TouchableOpacity
                              onPress={() => fileView(item.message)}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Image
                                resizeMode="contain"
                                source={
                                  //icon for type pdf
                                  Type == 'pdf'
                                    ? AppImages.pdf
                                    : // icon for types doc and docx
                                    Type === 'doc' || Type === 'docx'
                                    ? AppImages.doc
                                    : Type === 'xls' || Type === 'xlsx'
                                    ? AppImages.xlsxicon
                                    : Type === 'png' ||
                                      Type === 'jpg' ||
                                      Type === 'jpeg'
                                    ? AppImages.imageicon
                                    : AppImages.othericon
                                }
                                style={{
                                  width: 36,
                                  height: 36,
                                  // position: "relative",
                                  right: 5,
                                }}
                              />
                              <Text
                                style={{
                                  color: '#FFF',
                                  fontFamily: 'Nunito-Bold',
                                  width: '84%',
                                }}>
                                {item.orignal_name}
                              </Text>
                            </TouchableOpacity>
                            <View
                              style={{
                                width: '22%',
                                fontFamily: 'Nunito-Medium',
                                justifyContent: 'flex-end',
                                alignSelf: 'flex-end',
                              }}>
                              <Text style={styles.categorytime11}>
                                {moment(userInfo?.message_time).format('LT')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ) : item.type == 'link' ? (
                        <View style={styles.normalview}>
                          <TouchableOpacity
                            onPress={() => openUrl(item.message)}
                            style={styles.category2}>
                            <View style={{width: '76%'}}>
                              <Text style={styles.categorytxt11}>
                                {item.message}
                              </Text>
                            </View>

                            <View
                              style={{
                                width: '22%',
                                fontFamily: 'Nunito-Medium',
                                // backgroundColor: 'red',
                                justifyContent: 'flex-end',
                                alignSelf: 'flex-end',
                              }}>
                              <Text style={styles.categorytime11}>
                                {moment(userInfo?.message_time).format('LT')}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : item.type == 'location' ? (
                        <View style={styles.normalview3}>
                          {/* <View
                            style={{
                              width: '76%',
                              height: 200,
                              backgroundColor: 'red',
                            }}></View> */}
                          {showMap ? (
                            <TouchableOpacity
                              onPress={() => opengeolocation(Lt, Long)}
                              style={{
                                width: '76%',
                                height: 200,
                                padding: 5,
                                backgroundColor: '#EA8C00',
                              }}>
                              <MapView
                                style={{
                                  width: '100%',
                                  height: '100%',
                                }}
                                scrollEnabled={false}
                                initialRegion={{
                                  latitude: Lt,
                                  longitude: Long,
                                  latitudeDelta: 0.0022,
                                  longitudeDelta: 0.0021,
                                }}
                              />
                            </TouchableOpacity>
                          ) : null}
                        </View>
                      ) : item.type == 'audio' ? (
                        <View
                          style={{
                            marginBottom: 10,
                            backgroundColor: 'red',
                            width: '70%',
                            alignSelf: 'flex-end',
                            borderRadius: 8,
                            backgroundColor: '#EA8C00',
                          }}>
                          <PlayAudio
                            item={item}
                            state={state}
                            setState={setState}
                          />
                        </View>
                      ) : null
                    ) : null}
                  </View>
                );
              }}
            />
          </View>

          <Modal isVisible={showModal}>
            <View style={styles.mutenotificationview}>
              <View>
                <Text style={styles.mutenotification}>Mute Notifications</Text>
                <Text style={styles.mutenotificationtext}>
                  Other participants will not see that you muted this chat. You
                  will still be notified if you are mentioned.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setMuteTiming('8 hours')}
                style={styles.contentview}>
                {muteTiming == '8 hours' ? (
                  <View style={styles.circlestyle} />
                ) : (
                  <View style={styles.circlestyle1} />
                )}

                <View>
                  <Text style={styles.circlestyletext}>8 hours</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMuteTiming('1 week')}
                style={styles.contentview}>
                {muteTiming == '1 week' ? (
                  <View style={styles.circlestyle} />
                ) : (
                  <View style={styles.circlestyle1} />
                )}
                <View>
                  <Text style={styles.circlestyletext}>1 Week</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setMuteTiming('always')}
                style={styles.contentview}>
                {muteTiming == 'always' ? (
                  <View style={styles.circlestyle} />
                ) : (
                  <View style={styles.circlestyle1} />
                )}
                <View>
                  <Text style={styles.circlestyletext}>Always</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.TouchableOpacityview}>
                <TouchableOpacity
                  onPress={() => setShowModal(false)}
                  style={styles.btn1}>
                  <Text style={styles.btntext}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => mutefunc()}
                  style={styles.btn2}>
                  <Text style={styles.btn2text}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* closed mute notification */}
          {/* start clear chat */}
          <Modal isVisible={chat}>
            <View style={styles.clearchatview}>
              <View>
                <Text style={styles.chatheading}>Clear Chat</Text>
                <Text style={styles.chattext}>
                  Messages will only be removed from this device and your
                  devices on the newer versions of Dealers Hive.
                </Text>
              </View>
              <View style={styles.checkboxview}></View>
              <View style={styles.btnview}>
                <TouchableOpacity
                  onPress={() => setChat(false)}
                  style={styles.chatbtn}>
                  <Text style={styles.chatbtntext}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deletechatfunc(userInfo)}
                  style={styles.chatbtn2}>
                  <Text style={styles.chatbtn2text}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* closed clear chat */}

          {/* start block chat */}
          <Modal isVisible={blockChat}>
            <View style={styles.blockchatview}>
              <View style={styles.blockChatt}>
                <Image source={AppImages.blockk} style={styles.blockChattimg} />
                <Text style={styles.blockChattheading}>Block Chat</Text>
                <Text style={styles.blockChatttext}>
                  Are you sure, you want to block the chat with this dealer?
                  After block this dealer, you won't be able to connect again
                  with this dealer
                </Text>
              </View>
              <View style={styles.blockChattbtnview}>
                <TouchableOpacity
                  onPress={() => setBlockChat(false)}
                  style={styles.blockChattbtn}>
                  <Text style={styles.blockChattbtntext}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.blockChattbtn2}>
                  <Text style={styles.blockChattbtn2text}>Yes, Block</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* closed block chat */}

          {/* start menu provider */}
          {ispalying ? (
            <Audios sendmesgfunc={sendmesgfunc} setIsPlaying={setIsPlaying} />
          ) : (
            <View style={styles.bottomview}>
              <View style={styles.bottom}>
                <View style={styles.bottom1}>
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 35,
                      // backgroundColor: 'red',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setIsOpen(true)}>
                    <Image
                      source={AppImages.happyy}
                      style={{width: 24, height: 24}}></Image>
                  </TouchableOpacity>
                  <TextInput
                    placeholder="Type a message"
                    // placeholderTextColor="#838FA0"
                    multiline
                    value={mesgText}
                    onChangeText={e => setMesgText(e)}
                    style={styles.bottomtxtinput}
                    returnKeyType="send"

                    // onEndEditing={}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    // backgroundColor: 'green',
                    width: '25%',
                    justifyContent: 'space-between',
                  }}>
                  <Menu>
                    <MenuTrigger>
                      {/* <View style={{width: 30}}> */}
                      <Image
                        source={AppImages.pinnn}
                        style={{width: 24, height: 24}}
                      />
                      {/* </View> */}
                    </MenuTrigger>
                    <MenuOptions
                      optionsContainerStyle={{
                        width: '90%',
                        marginHorizontal: 20,
                        backgroundColor: '#EA8C00',
                        height: 120,
                        marginLeft: -20,
                        borderRadius: 15,
                        justifyContent: 'center',
                        marginTop: -40,
                        alignSelf: 'center',
                      }}>
                      <View style={styles.menuoptionview}>
                        <MenuOption
                          onSelect={() => {
                            imgvideopicker();
                          }}>
                          <View>
                            <Image
                              source={AppImages.Gellry}
                              style={styles.menuoptionimg}
                            />
                            <Text style={styles.menuoptiontxt}>Gallery</Text>
                          </View>
                        </MenuOption>
                        <MenuOption onSelect={() => opencamera()}>
                          <View>
                            <Image
                              source={AppImages.cameraicon}
                              style={styles.menuoptionimg}
                            />
                            <Text style={styles.menuoptiontxt}>Camera</Text>
                          </View>
                        </MenuOption>
                        <MenuOption onSelect={() => locationacall()}>
                          <View>
                            <Image
                              source={AppImages.loc}
                              style={styles.menuoptionimg}
                            />
                            <Text style={styles.menuoptiontxt}>Location</Text>
                          </View>
                        </MenuOption>
                        <MenuOption onSelect={() => DocumentPick(sendmesgfunc)}>
                          <View>
                            <Image
                              source={AppImages.document}
                              style={styles.menuoptionimg}
                            />
                            <Text style={styles.menuoptiontxt}>Documents</Text>
                          </View>
                        </MenuOption>
                      </View>
                    </MenuOptions>
                  </Menu>
                  {/* <View style={styles.bottom3}> */}
                  <TouchableOpacity onPress={() => setIsPlaying(true)}>
                    <Image
                      source={AppImages.mutee}
                      style={{width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleTextInput()}>
                    <Image
                      source={AppImages.sentt}
                      style={{width: 24, height: 24}}
                    />
                  </TouchableOpacity>
                </View>
                {/* </View> */}
              </View>
            </View>
          )}
          {/* closed menu provider */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },

  txtinput: {
    color: '#838FA0',
    paddingLeft: 10,
    maxWidth: '80%',
  },

  header: {
    // height: 70,
    // marginHorizontal: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: '#EAECF0',

    backgroundColor: 'green',
    flex: 1,
  },
  headerview: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingTop: 20,
    // backgroundColor: "green",
    // marginTop: 20,
    justifyContent: 'space-between',
  },
  header1: {
    flexDirection: 'row',
    // alignItems: 'center',
    // width: '85%',
    // backgroundColor: 'white',
  },
  headertext: {
    color: '#19242C',
    fontSize: 18,
    fontFamily: 'Nunito-Medium',
    paddingLeft: 15,
    // paddingBottom: 5,
  },
  headertext1: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    paddingLeft: 15,
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '17%',
    justifyContent: 'space-between',
    // backgroundColor:'red'
  },

  searchinput: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    maxWidth: 210,
    paddingLeft: 15,
  },
  menutxt: {
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    marginTop: 7,
    color: '#19242C',
  },

  flatlistview: {
    flex: 7,
    paddingTop: 15,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
  },
  fltlisttxt: {
    alignItems: 'center',
    paddingBottom: 20,
    // backgroundColor: 'red',
    height: 35,
  },
  fltlisttxt1: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
  otherview: {
    // flexDirection: 'row',
    marginBottom: 10,
    // justifyContent: 'center',
    // backgroundColor: 'red',
    alignItems: 'flex-start',
  },

  category1: {
    width: '75%',
    backgroundColor: '#F1F5F9',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    // marginLeft: 10,
    // paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  category2: {
    width: '75%',
    // height: 150,
    backgroundColor: '#EA8C00',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  category3: {
    width: '35%',
    // height: 150,
    // backgroundColor: '#F1F5F9',
    backgroundColor: '#EA8C00',

    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  category4: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  category5: {
    maxWidth: '75%',
    // height: 150,
    backgroundColor: '#EA8C00',

    borderRadius: 10,
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  categorytxt1: {
    color: '#19242C',
    fontSize: 10.5,
    fontFamily: 'Nunito-Medium',
    // backgroundColor:'green',
    width: '85%',
  },
  categorytxt2: {
    color: '#19242C',
    fontSize: 10.5,
    fontFamily: 'Nunito-Medium',
    // backgroundColor:'green',
    width: '85%',
  },
  categorytime: {
    width: '15%',
    paddingTop: 15,
    alignItems: 'flex-end',
    // backgroundColor:'red'
  },
  categorytime1: {
    color: '#838FA0',
    fontSize: 10,
    fontFamily: 'Nunito-Medium',
  },
  normalview: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  normalview3: {
    marginBottom: 10,
    alignItems: 'flex-end',
    // backgroundColor: 'red',
  },
  normalview1: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  categorytxt11: {
    color: '#838FA0',
    fontSize: 10,
    fontFamily: 'Nunito-Medium',
    color: 'white',
  },
  categorytime: {
    width: '15%',
    paddingTop: 15,
    alignItems: 'flex-end',
    // backgroundColor:'red'
  },
  categorytime11: {
    color: '#838FA0',
    fontSize: 10,
    fontFamily: 'Nunito-Medium',
    color: 'white',
    paddingLeft: 7,
  },
  categorytimeR: {
    color: '#838FA0',
    fontSize: 10,
    fontFamily: 'Nunito-Medium',

    paddingLeft: 7,
  },
  customview: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  custommsg: {
    width: '75%',
    backgroundColor: '#EA8C00',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    padding: 6,
  },
  custom1: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    paddingBottom: 4,
    paddingTop: 10,
  },
  custom2: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    paddingBottom: 4,
  },
  custom3: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
  customtime: {
    fontSize: 10,
    fontFamily: 'Nunito-Medium',
    color: 'white',
  },
  bottomview: {
    // backgroundColor: 'green',
    flex: 1,
  },
  bottom: {
    // backgroundColor: 'red',
    height: 55,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#EAECF0',
    marginHorizontal: 20,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bottom1: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '66%',
    // backgroundColor: 'red',
  },
  bottomtxtinput: {
    left: 10,
    color: '#19242C',
    maxWidth: '80%',
    fontFamily: 'Nunito-Medium',
  },
  menuoptionview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  menuoptionimg: {
    width: 52,
    height: 52,
  },
  menuoptiontxt: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    marginTop: 7,
    color: '#FFFFFF',
  },
  bottom3: {
    alignItems: 'center',
    flexDirection: 'row',
    width: 30,
    backgroundColor: 'green',
  },
  swipeblepanelView: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  SwipeablePanel1: {
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
  },
  filterby: {
    color: '#1F1F39',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingBottom: 20,
  },
  SwipeablePanel2: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SwipeablePaneltxt: {
    color: '#1F1F39',
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },

  // start mute notification

  mutenotificationview: {
    height: '45%',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  mutenotification: {
    color: '#19242C',
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  mutenotificationtext: {
    color: '#838FA0',
    fontSize: 11,
    fontFamily: 'Nunito-Medium',
    paddingTop: 15,
    lineHeight: 15,
  },
  contentview: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
  },
  circlestyle: {
    width: 24,
    height: 24,
    borderRadius: 50,
    borderWidth: 8,
    borderColor: '#EA8C00',
  },
  circlestyletext: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    paddingLeft: 10,
  },
  circlestyle1: {
    width: 24,
    height: 24,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#D9D9D9',
  },
  TouchableOpacityview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20,
  },
  btn1: {
    borderWidth: 1,
    borderColor: '#19242C',
    width: 125,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btntext: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  btn2: {
    width: 125,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EA8C00',
  },
  btn2text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },

  //  closed mute notification

  //  start clear chat
  clearchatview: {
    height: '35%',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  chatheading: {
    color: '#19242C',
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  chattext: {
    color: '#838FA0',
    fontSize: 11,
    fontFamily: 'Nunito-Medium',
    paddingTop: 15,
    lineHeight: 15,
  },
  checkboxview: {
    height: 60,
    paddingTop: 15,
  },
  btnview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
  },
  chatbtn: {
    borderWidth: 1,
    borderColor: '#19242C',
    width: 125,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatbtntext: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  chatbtn2: {
    width: 125,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EA8C00',
  },
  chatbtn2text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },

  // closed clear chat

  // start block chat
  blockchatview: {
    height: '37%',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  blockChatt: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  blockChattimg: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  blockChattheading: {
    color: '#19242C',
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  blockChatttext: {
    color: '#838FA0',
    fontSize: 11,
    fontFamily: 'Nunito-Medium',
    paddingTop: 15,
    lineHeight: 16,
    textAlign: 'center',
    lineHeight: 15,
  },
  blockChattbtnview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 20,
  },
  blockChattbtn: {
    borderWidth: 1,
    borderColor: '#19242C',
    width: 125,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockChattbtntext: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  blockChattbtn2: {
    width: 125,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CD1B1B',
  },
  blockChattbtn2text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  mainsearch: {
    height: 70,
    flexDirection: 'row',
    // paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  imgbg: {
    // maxWidth: Platform.OS=="ios"?284:273,
    height: 50,
    justifyContent: 'space-between',
    width: width * 0.82,
    // top:10
    // alignItems:'center'
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  searchinput: {
    color: '#000000',
    fontSize: 14,

    fontFamily: 'Nunito-Medium',
    width: 260,
    paddingLeft: 15,
    // backgroundColor: 'lightgray',
    height: 40,
    width: '60%',
    alignSelf: 'center',
  },
});

export default Chat;
