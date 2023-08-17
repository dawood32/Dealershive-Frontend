import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {SwipeablePanel} from 'rn-swipeable-panel-with-fade-out';
import {AppImages} from '../../components/AppImages';
import changeNavigationBarColor, {
  hideNavigationBar,
  showNavigationBar,
} from 'react-native-navigation-bar-color';
const {height, width} = Dimensions.get('screen');

const WechatSignup = ({setWeChatPanel}) => {
  const arr = [
    {
      name: 'Dawood Zia',
      email: '+92 3337445743',
      image: AppImages.Ellipse,
    },
    {
      name: 'Dawood',
      email: '+92 33445743',
      image: AppImages.profile,
    },
    //   {
    //     name: 'Dawood Zia',
    //     email: 'dawoodzia711@gmail.com',
    //     image: AppImages.Ellipse,
    //   },
    //   {
    //     name: 'Dawood Zia',
    //     email: 'dawoodzia711@gmail.com',
    //     image: AppImages.Ellipse,
    //   },
    //   {
    //     name: 'Dawood Zia',
    //     email: 'dawoodzia711@gmail.com',
    //     image: AppImages.Ellipse,
    //   },
    //   {
    //     name: 'Dawood Zia',
    //     email: 'dawoodzia711@gmail.com',
    //     image: AppImages.Ellipse,
    //   },
  ];
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
  const [isPanelActive, setIsPanelActive] = useState(true);

  const openPanel = () => {
    setIsPanelActive(true);
  };

  const closePanel = () => {
    setWeChatPanel(false);
    setIsPanelActive(false);
  };
  return (
    <SwipeablePanel
      style={{height: height * 0.62, paddingHorizontal: 30}}
      {...panelProps}
      isActive={isPanelActive}>
      <View style={styles.header}>
        <Image style={{width: 32, height: 32}} source={AppImages.wechat} />

        <Text style={styles.logingoogle}>Signup With WeChat</Text>
      </View>
      <View>
        <Text style={styles.chooseaccount}>Choose an account</Text>
        <Text style={styles.dealer}>to continue to Dealers Hive</Text>
      </View>
      <View style={{marginTop: 10}}>
        <FlatList
          data={arr}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <View key={index}>
                <View style={styles.loginview}>
                  <Image
                    source={item.image}
                    style={{marginRight: 13, width: 24, height: 24}}
                  />
                  <View>
                    <Text style={styles.username}>{item.name}</Text>
                    <Text style={styles.emailuser}>{item.email}</Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <View style={styles.loginview}>
          <View style={styles.addaccount}>
            <Text style={styles.plus}>+</Text>
          </View>
          <Text style={styles.newaccount}> Add new Account</Text>
        </View>
      </View>
      <View style={{marginTop: 20}}>
        <Text style={styles.privacypolicy}>
          To continue, Google will share your name, email address, and profile
          picture with Dealers Hive. Before using this app, you can review
          Dealers Hive’s <Text style={styles.termspolicy}>privacy policy</Text>{' '}
          and <Text style={styles.termspolicy}>terms of services.</Text>
        </Text>
      </View>
    </SwipeablePanel>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  header: {
    height: height * 0.12,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 10,
  },
  loginview: {
    width: '100%',
    height: 60,
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
  logingoogle: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  chooseaccount: {
    color: '#19242C',
    fontFamily: 'Nunito-Bold',
    lineHeight: 25,
  },
  dealer: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
  emailuser: {
    color: '#838FA0',
    fontSize: 10,
    fontFamily: 'Nunito-Medium',
  },
  privacypolicy: {
    fontSize: 13,
    fontFamily: 'Nunito-Medium',
    lineHeight: 20,
  },
  username: {
    fontSize: 12,
    color: '#19242C',
    fontFamily: 'Nunito-Bold',
    lineHeight: 22,
  },
  newaccount: {
    color: '#19242',
    fontFamily: 'Nunito-Medium',
    fontSize: 12,
  },
  termspolicy: {
    fontSize: 12,
    color: '#EA8C00',
    fontFamily: 'Nunito-Medium',
  },
  addaccount: {
    width: 30,
    height: 30,
    backgroundColor: '#19242C',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 13,
  },
  plus: {
    color: '#FFF',
    fontSize: 20,
  },
});

export default WechatSignup;
