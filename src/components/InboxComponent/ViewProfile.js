import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import Modal from 'react-native-modal';
import {SwipeablePanel} from 'rn-swipeable-panel-with-fade-out';
import {UserProfileData} from '../../redux/action/appcall';
import {useDispatch, useSelector} from 'react-redux';
import {reportchat} from '../../redux/action/chatapi';
import {deleteChat} from '../../redux/action/chatapi';
import {messagelistsuccess} from '../../redux/type';
const {height, width} = Dimensions.get('screen');

const ViewProfile = ({navigation, route}) => {
  const messageListData = useSelector(
    state => state?.MessageListReducer?.data?.chat_list,
  );
  const userData = useSelector(state => state?.UserProfileReducer?.data?.data);
  const dispatch = useDispatch();
  const [reportmodal, setReportModal] = useState(false);

  const [blockChat, setBlockChat] = useState(false);
  const [reportDescription, setReportDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState(false);
  const [UserId, setUserId] = useState(null);
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

  useEffect(() => {
    let params = 'id=' + route?.params?.userId;
    let id = +route.params.userId;
    console.log(id, 'piddddd');
    dispatch(UserProfileData(params));
    setUserId(id);
  }, []);

  const reportchatfunc = () => {
    if (!reportDescription) {
      setErrorMessage(true);
    } else {
      let params = JSON.stringify({
        id: UserId,
        report: reportDescription,
      });

      dispatch(reportchat(params));
      setReportDescription('');
      setIsPanelActive(false);
      // Alert.alert('Your report successfully submited');
      setReportModal(true);
    }
  };
  const deletechatfunc = () => {
    const chat_list = messageListData?.filter(data => data.to_user != UserId);

    let k = {chat_list, status: true};

    dispatch({
      type: messagelistsuccess,
      payload: k,
    });
    let params = 'id=' + UserId;
    dispatch(deleteChat(params));
    navigation.navigate('Inbox');
    // setBlockChat(false)
  };

  const mediascreen = () => {
    navigation.navigate('Media', {
      userId: UserId,
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <ImageBackground
        source={AppImages.Loginbackground}
        style={styles.loginbackdground}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={AppImages.arrowback}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
          {/* </View> */}
          {/* <View style={styles.header1}> */}
          <View
            style={{
              width: 100,
              height: 100,
              borderColor: '#EA8C00',
              borderWidth: 2,
              borderRadius: 100,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Image
              borderRadius={100}
              style={{width: 90, height: 90}}
              source={{uri: userData?.background_image}}
            />
          </View>
          <Text style={styles.headertext}>{userData?.shop_name}</Text>
          <Text style={styles.headertext1}>{userData?.country}</Text>
          <View style={styles.headericon}>
            <Image
              source={AppImages.shopp}
              style={{width: 40, height: 40}}></Image>
            <Image
              source={AppImages.unmutee}
              style={{width: 40, height: 40}}></Image>
          </View>
        </View>
        <View style={styles.contentview}>
          <View style={{marginBottom: 10}}>
            <Text style={styles.contentname}>Name</Text>
            <View style={styles.content1}>
              <Image source={AppImages.user} style={{width: 20, height: 20}} />
              <Text style={styles.txtinput}>{userData?.username}</Text>
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={styles.contentname}>E-mail</Text>
            <View style={styles.content1}>
              <Image source={AppImages.sms} style={{width: 20, height: 20}} />
              <Text style={styles.txtinput}>{userData?.email}</Text>
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <Text style={styles.contentname}>Phone Number</Text>
            <View style={styles.content1}>
              <Image source={AppImages.phon} style={{width: 20, height: 20}} />
              <Text style={styles.txtinput}>{userData?.phone}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              mediascreen();
            }}
            style={styles.mediafile}>
            <View style={styles.mediaimg}>
              <View>
                <Image
                  source={AppImages.mediaa}
                  style={{width: 26, height: 22}}
                />
              </View>
            </View>
            <View style={{width: '70%'}}>
              <Text style={styles.mediatxt}>Media File</Text>
            </View>
            <View style={styles.mediaimg1}>
              <Image
                source={AppImages.rightarow}
                style={{width: 24, height: 24}}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, paddingHorizontal: 20}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setBlockChat(true)}>
            <Image source={AppImages.delete} style={{width: 24, height: 24}} />
            <Text style={styles.buttontxt}>Delete Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => setIsPanelActive(true)}>
            <Image source={AppImages.reportt} style={{width: 24, height: 24}} />
            <Text style={styles.button2txt}>Report Dealer</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* start modal */}
      <Modal isVisible={blockChat}>
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
              onPress={() => setBlockChat(false)}
              style={styles.blockChattbtn}>
              <Text style={styles.blockChattbtntext}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deletechatfunc()}
              style={styles.blockChattbtn2}>
              <Text style={styles.blockChattbtn2text}>Yes, Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={reportmodal}>
        <View style={styles.reportchatview}>
          <View style={styles.reportChatt}>
            <Image source={AppImages.tickbadge} style={styles.reportChattimg} />
            <Text style={styles.reportChattheading}>Report Submitted</Text>
            <Text style={styles.reportChatttext}>
              Your report has been successfully submitted
            </Text>
          </View>
          <View style={styles.reportChattbtnview}>
            <TouchableOpacity
              style={styles.reportChattbtn2}
              onPress={() => setReportModal(false)}>
              <Text style={styles.reportChattbtn2text}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* start SwipeablePanel */}

      <SwipeablePanel
        style={{height: height * 0.51}}
        {...panelProps}
        isActive={isPanelActive}>
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.swipeablePanelview}>
            <Image
              source={AppImages.reportt}
              style={styles.swipeablePanelimg}
            />
            <Text style={styles.swipeablePanelheading}>Report Item</Text>
            <Text style={styles.swipeablePaneltext}>
              hey, please write a reason to us for “why do you {'\n'} want to
              report this dealer”?
            </Text>
          </View>
          {/* <View style={{height: 20, backgroundColor: 'red'}}>
            <Text>ddddddddd</Text>
          </View> */}
          <View style={styles.swipeablePaneldescription}>
            <View style={{height: 20}}>
              {errorMessage ? (
                <Text
                  style={{
                    // width: '90%',
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#CD1B1B',
                    // lineHeight: 16,
                    fontFamily: 'Nunito-Medium',
                  }}>
                  Please write reason
                </Text>
              ) : null}
            </View>

            <Text style={styles.swipeablePaneldescription1}>Description</Text>
            <TextInput
              placeholder="write here..."
              placeholderTextColor="#19242C"
              value={reportDescription}
              onChangeText={e => {
                setReportDescription(e), setErrorMessage(false);
              }}
              style={{
                color: '#19242C',
                fontSize: 14,
                fontFamily: 'Nunito-Bold',
              }}></TextInput>
          </View>
          <View style={styles.swipeablePanelbtnview}>
            <TouchableOpacity
              onPress={() => setIsPanelActive(false)}
              style={styles.btn}>
              <Text style={styles.btntext}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                reportchatfunc();
              }}
              style={styles.btn2}>
              <Text style={styles.btn2text}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SwipeablePanel>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    // paddingTop: 30,
  },
  loginbackdground: {
    width: '100%',
    height: '100%',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    // backgroundColor: 'red',
    paddingTop: 42,
  },
  header1: {
    alignItems: 'center',
    flex: 0.22,
    // top: -35,
  },
  headertext: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#19242C',
    alignSelf: 'center',
    marginTop: 4,
  },
  headertext1: {
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    color: '#838FA0',
    alignSelf: 'center',
    marginTop: 4,
  },
  headericon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 90,
    marginTop: 10,
    alignSelf: 'center',
  },
  contentview: {
    flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: 'green',
    justifyContent: 'space-around',
  },
  contentname: {
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    color: '#838FA0',
  },
  content1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  txtinput: {
    color: '#19242C',
    width: '80%',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    marginLeft: 10,
  },
  mediafile: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 10,
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginVertical: 15,
  },
  mediaimg: {
    width: '15%',
    alignItems: 'center',
  },
  mediatxt: {
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
    color: '#19242C',
  },
  mediaimg1: {
    width: '15%',
    alignItems: 'flex-end',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#19242C',
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  buttontxt: {
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
    color: 'white',
    paddingLeft: 10,
  },
  button2: {
    flexDirection: 'row',
    backgroundColor: '#CD1B1B',
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  button2txt: {
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
    color: 'white',
    paddingLeft: 10,
  },

  // delete chat
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

  // start SwipeablePanel
  swipeablePanelview: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 170,
    // backgroundColor:'red',
  },
  swipeablePanelimg: {
    width: 40,
    height: 40,
    marginBottom: 10,
    tintColor: '#CD1B1B',
  },
  swipeablePanelheading: {
    color: '#19242C',
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  swipeablePaneltext: {
    color: '#838FA0',
    fontSize: 11,
    fontFamily: 'Nunito-Medium',
    paddingTop: 20,
    textAlign: 'center',
  },
  swipeablePaneldescription: {
    height: 100,
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
  },
  swipeablePaneldescription1: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  swipeablePanelbtnview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor:'red',
    height: 95,
  },
  btn: {
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
    backgroundColor: '#CD1B1B',
  },
  btn2text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  reportchatview: {
    height: '37%',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  reportChatt: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  reportChattimg: {
    width: 40,
    height: 40,
    marginBottom: 15,
    // tintColor: 'black'
  },
  reportChattheading: {
    color: '#19242C',
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  reportChatttext: {
    color: '#838FA0',
    fontSize: 11,
    fontFamily: 'Nunito-Medium',
    paddingTop: 15,
    textAlign: 'center',
  },
  reportChattbtnview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
  },
  reportChattbtn: {
    borderWidth: 1,
    borderColor: '#19242C',
    width: 125,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportChattbtntext: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  reportChattbtn2: {
    width: 125,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  reportChattbtn2text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
});
export default ViewProfile;
