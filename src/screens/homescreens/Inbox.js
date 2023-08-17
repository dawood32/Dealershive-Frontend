import React, {useState, useEffect} from 'react';
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
  Switch,
  Platform,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {SwipeablePanel} from 'rn-swipeable-panel-with-fade-out';
const {height, width} = Dimensions.get('screen');
import Swipeable from 'react-native-swipeable';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native';
import io from 'socket.io-client';
import {
  chatsearch,
  markreadmessage,
  markunreadmessage,
  messageList,
  pinchat,
  unpinchat,
} from '../../redux/action/chatapi';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Modal from 'react-native-modal';
import {mutechat} from '../../redux/action/chatapi';
import {unmutechat} from '../../redux/action/chatapi';
import {messagelistsuccess} from '../../redux/type';
import {deleteChat} from '../../redux/action/chatapi';
import {filterbyunread} from '../../redux/action/chatapi';
import SkeletonMessage from '../../components/InboxComponent/SkeltonMessage';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../../components/Path';
var itemvalue;

const Inbox = () => {
  const navigation = useNavigation();
  const messageListData = useSelector(
    state => state?.MessageListReducer?.data?.chat_list,
  );

  const [mute, setmute] = useState(null);
  const [refreh, setrefreh] = useState(false);
  const [refreh1, setrefreh1] = useState(false);
  const [imgpin, setImgpin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [muteTiming, setMuteTiming] = useState('8 hours');
  const [deleteModal, setDeleteModal] = useState(false);
  const [readmsg, setreadmsg] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setisLoading] = useState(true);
  const [id, setid] = useState();
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(messageList(onSuccess3));
    getSocketsData();
  }, [searchText]);
  useEffect(() => {}, [id, userInfo]);

  const getSocketsData = async () => {
    let access_token = await AsyncStorage.getItem('@access_token');
    let userid = await AsyncStorage.getItem('@user_id');
    console.log('chatlist' + userid, 'pzzzzz', URL.baseURL);
    let socket = io(URL.baseURL, {
      extraHeaders: {
        Authorization: 'Bearer ' + access_token,
      },
    });

    socket.on('chatlist' + userid, msg => {
      console.log(msg, 'timechattt');
      updatelist(msg);
      setrefreh1(true);
      setrefreh(true);
      // socketpros(msg);
      setrefreh(false);
    });
  };

  const updatelist = msg => {
    let k = {chat_list: msg, status: true};

    dispatch({
      type: messagelistsuccess,
      payload: k,
    });
  };
  const onSuccess3 = () => {
    setisLoading(false);
  };
  const handlechange = srch => {
    setSearchText(srch);
  };

  const filterby = () => {
    setChecked(!checked);
    let update = !checked;
    console.log(update, 'kkkkkkk');

    if (update == true) {
      dispatch(filterbyunread(onsuccess5));
    } else if (update == false) {
      dispatch(messageList());
    }
  };

  const onsuccess5 = res => {
    console.log(res.chat_list, 'iiiii');
    let chat_list = res.chat_list;

    let k = {chat_list, status: true};
    dispatch({
      type: messagelistsuccess,
      payload: k,
    });
  };

  const searchchatlist = () => {
    let params = 'search=' + searchText;
    if (!searchText) {
      console.log('oic');
    } else {
      dispatch(chatsearch(params, onSuccess));
    }
  };
  const onSuccess = res => {
    console.log(res.data, 'qw');
    const chat_list = res.data;
    let k = {chat_list, status: true};
    dispatch({
      type: messagelistsuccess,
      payload: k,
    });
  };
  const rightaction = item => {
    if (item.status == 'send') {
      setid(item.to_user);
      setUserInfo(item);
    } else {
      setid(item.from_user);
      setUserInfo(item);
    }

    {
      item.mute ? setmute(true) : setmute(false);
    }

    {
      item.pin ? setImgpin(true) : setImgpin(false);
    }
  };
  const mutefunc = item => {
    setmute(true);
    if (item.status == 'received') {
      const updatedData = messageListData?.map(data => {
        if (data?.from_user == id) {
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
    } else {
      const updatedData = messageListData?.map(data => {
        if (data?.to_user == id) {
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
    }
    let params = 'duration=' + muteTiming.toString() + '&id=' + id;

    dispatch(mutechat(params));

    setShowModal(false);
  };

  const unmutefunc = item => {
    setmute(false);
    if (item.status == 'received') {
      const updatedData = messageListData?.map(data => {
        if (data?.from_user == id) {
          return {
            ...data,
            mute: false,
          };
        }
        return data;
      });

      let k = {chat_list: updatedData, status: true};

      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    } else {
      const updatedData = messageListData?.map(data => {
        if (data?.to_user == id) {
          return {
            ...data,
            mute: false,
          };
        }
        return data;
      });

      let k = {chat_list: updatedData, status: true};

      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    }
    let params = 'id=' + id;

    dispatch(unmutechat(params));
  };

  const deletechatfunc = item => {
    console.log(item, 'jkjkjk');
    if (item.status == 'received') {
      const chat_list = messageListData?.filter(data => data.from_user != id);

      let k = {chat_list, status: true};

      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
      let params = 'id=' + id;
      dispatch(deleteChat(params));
      setDeleteModal(false);
    } else {
      const chat_list = messageListData?.filter(data => data.to_user != id);

      let k = {chat_list, status: true};

      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
      let params = 'id=' + id;
      dispatch(deleteChat(params));
      setDeleteModal(false);
    }
  };

  const rightButtons = [
    <View
      style={{
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        paddingLeft: 15,
      }}>
      <TouchableOpacity onPress={() => setDeleteModal(true)}>
        <Image
          source={AppImages.trash}
          style={{width: 20, height: 20, marginRight: 15}}
        />
      </TouchableOpacity>

      {mute ? (
        <TouchableOpacity onPress={() => unmutefunc(userInfo)}>
          <Image
            source={AppImages.microphoneslash}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Image
            source={AppImages.microphone}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      )}
    </View>,
  ];
  const leftButtons = [
    <View
      style={{
        flexDirection: 'row',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        paddingRight: 15,
        justifyContent: 'flex-end',
      }}>
      {imgpin ? (
        <TouchableOpacity onPress={() => unpinchatfunc(userInfo)}>
          <Image
            source={AppImages.unpin}
            style={{width: 20, height: 20, marginRight: 15}}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => pinchatfunc(userInfo)}>
          <Image
            source={AppImages.pin}
            style={{width: 20, height: 20, marginRight: 15}}
          />
        </TouchableOpacity>
      )}
      {readmsg ? (
        <TouchableOpacity onPress={() => unreadmessagefunc(userInfo)}>
          <Image source={AppImages.sms} style={{width: 20, height: 20}} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => readmessagefunc(userInfo)}>
          <Image source={AppImages.nosms} style={{width: 20, height: 20}} />
        </TouchableOpacity>
      )}
    </View>,
  ];

  const pinchatfunc = item => {
    setImgpin(true);
    if (item.status == 'received') {
      const updatedData = messageListData.map(data => {
        if (data.from_user == id) {
          return {
            ...data,
            pin: true,
          };
        }
        return data;
      });
      let k = {chat_list: updatedData, status: true};
      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    } else {
      const updatedData = messageListData.map(data => {
        if (data.to_user == id) {
          return {
            ...data,
            pin: true,
          };
        }
        return data;
      });
      let k = {chat_list: updatedData, status: true};
      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    }
    let params = 'id=' + id;
    dispatch(pinchat(params));
  };

  const unpinchatfunc = item => {
    setImgpin(false);
    if (item.status == 'received') {
      const updatedData = messageListData?.map(data => {
        if (data.from_user == id) {
          return {
            ...data,
            pin: false,
          };
        }
        return data;
      });
      let k = {chat_list: updatedData, status: true};

      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    } else {
      const updatedData = messageListData?.map(data => {
        if (data.to_user == id) {
          return {
            ...data,
            pin: false,
          };
        }
        return data;
      });
      let k = {chat_list: updatedData, status: true};

      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    }
    let params = 'id=' + id;
    dispatch(unpinchat(params));
  };

  const readmessagefunc = item => {
    if (item.status == 'received') {
      const updatedData = messageListData?.map(data => {
        if (data.from_user == id) {
          return {
            ...data,
            unread_messages: 0,
          };
        }
        return data;
      });

      let k = {chat_list: updatedData, status: true};
      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    } else {
      const updatedData = messageListData?.map(data => {
        if (data.to_user == id) {
          return {
            ...data,
            unread_messages: 0,
          };
        }
        return data;
      });

      let k = {chat_list: updatedData, status: true};
      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    }
    setreadmsg(true);
    let params = 'id=' + id;
    dispatch(markreadmessage(params));
  };
  const chatscreen = item => {
    let uid;
    if (item.status == 'send') {
      uid = item.to_user;
    } else {
      uid = item.from_user;
    }

    setreadmsg(true);
    let params = 'id=' + uid;
    dispatch(markreadmessage(params));
    if (item.status == 'received') {
      console.log('99999999', id);
      const updatedData = messageListData?.map(data => {
        if (data.from_user == uid) {
          return {
            ...data,
            unread_messages: 0,
          };
        }
        return data;
      });

      let k = {chat_list: updatedData, status: true};
      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    } else {
      const updatedData = messageListData?.map(data => {
        if (data.to_user == uid) {
          return {
            ...data,
            unread_messages: 0,
          };
        }
        return data;
      });

      let k = {chat_list: updatedData, status: true};
      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    }
    navigation.navigate('Chat', {
      navigation: navigation,
      Messagelist: item,
    });
  };

  const unreadmessagefunc = item => {
    if (item.status == 'received') {
      const updatedData = messageListData?.map(data => {
        if (data.from_user == id) {
          return {
            ...data,
            unread_messages: -1,
          };
        }
        return data;
      });

      let k = {chat_list: updatedData, status: true};
      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    } else {
      const updatedData = messageListData?.map(data => {
        if (data.to_user == id) {
          return {
            ...data,
            unread_messages: -1,
          };
        }
        return data;
      });

      let k = {chat_list: updatedData, status: true};
      dispatch({
        type: messagelistsuccess,
        payload: k,
      });
    }
    setreadmsg(false);
    let params = 'id=' + id;
    dispatch(markunreadmessage(params));
  };

  const [checked, setChecked] = useState(false);

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
  const [isPanelActive, setIsPanelActive] = useState(false);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setIsPanelActive(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <SkeletonMessage />
      ) : (
        <>
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
                  onPress={() => mutefunc(userInfo)}
                  style={styles.btn2}>
                  <Text style={styles.btn2text}>Ok</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal isVisible={deleteModal}>
            <View style={styles.blockchatview}>
              <View style={styles.blockChatt}>
                <Image source={AppImages.delete} style={styles.blockChattimg} />
                <Text style={styles.blockChattheading}>Confirmation</Text>
                <Text style={styles.blockChatttext}>
                  Are you sure, you want to delete this chat?
                </Text>
              </View>
              <View style={styles.blockChattbtnview}>
                <TouchableOpacity
                  onPress={() => setDeleteModal(false)}
                  style={styles.blockChattbtn}>
                  <Text style={styles.blockChattbtntext}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deletechatfunc(userInfo)}
                  style={styles.blockChattbtn2}>
                  <Text style={styles.blockChattbtn2text}>Yes, Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.header}>
            <Text style={styles.headertext}>Inbox</Text>
            <View style={styles.header2}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('notification');
                }}>
                <Image
                  style={{width: 24, height: 24, left: -20}}
                  source={AppImages.notification}></Image>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsPanelActive(true)}>
                <Image
                  style={{width: 24, height: 24}}
                  source={AppImages.men}></Image>
              </TouchableOpacity>
            </View>
          </View>
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
                onChangeText={e => handlechange(e)}
                returnKeyType="search"
                onSubmitEditing={() => searchchatlist()}
                placeholderTextColor={'#9D9D9D'}
              />

              <TouchableOpacity
                onPress={() => searchchatlist()}
                style={{height: 51, width: 80}}></TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>
          <View style={styles.flatlistview}>
            <FlatList
              data={messageListData}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                if (item.message_type == 'pdf') {
                  let cmnt = item.last_message;
                  Type = cmnt.substr(cmnt.lastIndexOf('.') + 1);
                }
                return (
                  <View>
                    <Swipeable
                      leftButtons={leftButtons}
                      onSwipeStart={() => {
                        rightaction(item, index);
                      }}
                      rightButtons={rightButtons}>
                      <TouchableOpacity
                        onPress={() => {
                          chatscreen(item);
                        }}
                        style={[
                          styles.categoryview,

                          {
                            shadowColor:
                              index == itemvalue ? '#19242C' : '#FFF',
                            shadowOffset: {
                              width: 0,
                              height: 0,
                            },
                            shadowOpacity: 0.1,
                            shadowRadius: 1,

                            elevation: 5,
                          },
                        ]}>
                        <View style={{width: '15%'}}>
                          {item.image ? (
                            <Image
                              borderRadius={100}
                              style={{width: 48, height: 48}}
                              source={{uri: item.image}}
                            />
                          ) : (
                            <Image
                              style={{width: 48, height: 48}}
                              source={AppImages.dummyprofile}
                            />
                          )}

                          <View
                            style={{
                              width: 10,
                              height: 10,
                              backgroundColor: item.online
                                ? '#8FFF00'
                                : 'transparent',
                              alignSelf: 'flex-end',
                              top: -11,
                              left: -8,
                              borderRadius: 20,
                            }}
                          />
                        </View>

                        <View style={{width: '85%'}}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={{
                                width: '80%',
                                paddingLeft: 10,
                                flexDirection: 'row',
                              }}>
                              <Text style={styles.categorytxt}>
                                {item?.user}
                              </Text>
                              {item.unread_messages > 0 ? (
                                <View
                                  style={{
                                    backgroundColor: 'red',
                                    borderRadius: 500,
                                    height: 22,
                                    width: 22,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 10,
                                      color: '#FFF',
                                      fontFamily: 'Nunito-Bold',
                                    }}>
                                    {item.unread_messages}
                                  </Text>
                                </View>
                              ) : item.unread_messages == -1 ? (
                                <View
                                  style={{
                                    backgroundColor: 'red',
                                    borderRadius: 500,
                                    height: 22,
                                    width: 22,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 5,
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: 10,
                                      color: 'red',
                                      fontFamily: 'Nunito-Bold',
                                    }}>
                                    {item.unread_messages}
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                width: '20%',
                                justifyContent: 'space-between',
                              }}>
                              <View style={{width: 22}}>
                                {item.pin ? (
                                  <Image
                                    style={{width: 20, height: 20}}
                                    source={AppImages.pin}
                                  />
                                ) : null}
                              </View>
                              {item.mute ? (
                                <Image
                                  style={{width: 20, height: 20}}
                                  source={AppImages.microphone}
                                />
                              ) : null}
                            </View>
                          </View>
                          <View style={styles.category1}>
                            <View style={{width: '89%'}}>
                              {item?.message_type == 'text' ? (
                                <Text
                                  numberOfLines={1}
                                  style={styles.categorytxt1}>
                                  {item.last_message}
                                </Text>
                              ) : item.message_type == 'img' ? (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    style={{width: 20, height: 20}}
                                    source={AppImages.photoicon}
                                  />
                                  <Text
                                    style={[styles.categorytxt1, {right: -5}]}>
                                    Photo
                                  </Text>
                                </View>
                              ) : item.message_type == 'video' ? (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    style={{width: 20, height: 20}}
                                    source={AppImages.videocircle}
                                  />
                                  <Text
                                    style={[styles.categorytxt1, {right: -5}]}>
                                    Video
                                  </Text>
                                </View>
                              ) : item.message_type == 'pdf' ? (
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                  }}>
                                  <Image
                                    style={{width: 20, height: 20}}
                                    source={
                                      Type == 'pdf'
                                        ? AppImages.pdf
                                        : // icon for types doc and docx
                                        Type === 'doc' || Type === 'docx'
                                        ? AppImages.docicon
                                        : Type === 'xls' || Type === 'xlsx'
                                        ? AppImages.xlsxicon
                                        : Type === 'png' ||
                                          Type === 'jpg' ||
                                          Type === 'jpeg'
                                        ? AppImages.imageicon
                                        : AppImages.othericon
                                    }
                                  />
                                  <Text
                                    numberOfLines={1}
                                    style={[styles.categorytxt1, {right: -5}]}>
                                    {item.orignal_name}
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                            {/* <View style={styles.categorytime}> */}
                            <Text style={styles.categorytime1}>
                              {moment(item?.message_time).format('D MMM')}
                            </Text>
                          </View>
                          {/* </View> */}
                        </View>
                      </TouchableOpacity>
                    </Swipeable>
                  </View>
                );
              }}
            />
            <View style={{height: 63, backgroundColor: 'transparent'}} />
          </View>

          {/* strt panel */}
          <SwipeablePanel
            style={{height: height * 0.24}}
            {...panelProps}
            isActive={isPanelActive}>
            <View style={styles.swipeblepanelView}>
              <View style={styles.SwipeablePanel1}>
                <Text style={styles.filterby}>Filter by</Text>
              </View>
              <View style={styles.SwipeablePanel2}>
                <Text style={styles.SwipeablePaneltxt}>
                  Read / Unread Messages
                </Text>
                <Switch
                  value={checked}
                  onValueChange={() => filterby()}
                  trackColor={{false: '#838FA0', true: '#EEA83E'}}
                  thumbColor={checked ? 'white' : 'white'}
                />
              </View>
            </View>
          </SwipeablePanel>
        </>
      )}
      {/* closed panel */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginTop: Platform.OS == 'ios' ? 20 : 60,
    height: 57,
    justifyContent: 'space-between',
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
    // backgroundColor: 'lightblue',
    flexDirection: 'row',
    alignItems: 'center',
  },

  headertext: {
    color: '#19242C',
    fontSize: 18,
    fontFamily: 'Nunito-Medium',
  },
  header2: {
    flexDirection: 'row',
  },
  searchbar: {
    flex: 0.13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },

  imgbg: {
    height: 50,
    justifyContent: 'space-between',
    width: width * 0.9,
    flexDirection: 'row',
  },
  searchinput: {
    color: '#000000',
    fontSize: 14,

    fontFamily: 'Nunito-Medium',
    width: 260,
    paddingLeft: 15,
    height: 40,
    width: '60%',
    alignSelf: 'center',
  },
  imgbg1: {
    width: 85,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistview: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  categoryview: {
    paddingHorizontal: 10,
    marginTop: 10,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,

    backgroundColor: '#FFF',
  },
  category1: {
    width: '100%',
    paddingLeft: 10,
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categorytxt: {
    color: '#19242C',
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    paddingBottom: 10,
    maxWidth: '80%',
  },
  categorytxt1: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    maxWidth: '70%',
  },
  categorytime: {
    width: '15%',
    paddingTop: 15,
    alignItems: 'flex-end',
  },
  categorytime1: {
    color: '#838FA0',
    // paddingTop: 15,
    fontSize: 12,
    fontFamily: 'Nunito-Bold',
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
  mainsearch: {
    height: 70,
    flexDirection: 'row',
    // paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: 'red',
  },
  mutenotificationview: {
    // height: '40%',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
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

    marginTop: 23,
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
    // paddingTop: 20,
    marginTop: 35,
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
    tintColor: 'black',
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
    textAlign: 'center',
  },
  blockChattbtnview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
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
});

export default Inbox;
