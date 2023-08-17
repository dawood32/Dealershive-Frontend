import React, {useEffect, useState, useRef} from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {AppImages} from './AppImages';
import Tabbar from '@mindinventory/react-native-tab-bar-interaction';
import * as Animatable from 'react-native-animatable';

const BottomTab = ({
  setActivityTab,
  setInventoryTab,
  setInboxTab,
  setMoreTab,
  setHomeTab,
}) => {
  const [focus1, setfocus1] = useState(true);
  const [focus2, setfocus2] = useState(false);

  const [focus3, setfocus3] = useState(false);

  const [focus4, setfocus4] = useState(false);
  const [focus5, setfocus5] = useState(false);
  const viewRef1 = useRef(null);
  const viewRef2 = useRef(null);
  const viewRef3 = useRef(null);
  const viewRef4 = useRef(null);
  const viewRef5 = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      if (focus1) {
        viewRef1.current.animate({
          0: {scale: 0.5, rotate: '0deg'},
          1: {scale: 1, rotate: '360deg'},
        });
      }
      if (focus2) {
        viewRef2.current.animate({
          0: {scale: 0.5, rotate: '0deg'},
          1: {scale: 1, rotate: '360deg'},
        });
      }
      if (focus3) {
        viewRef3.current.animate({
          0: {scale: 0.5, rotate: '0deg'},
          1: {scale: 1, rotate: '360deg'},
        });
      }
      if (focus4) {
        viewRef4.current.animate({
          0: {scale: 0.5, rotate: '0deg'},
          1: {scale: 1, rotate: '360deg'},
        });
      }
      if (focus5) {
        viewRef5.current.animate({
          0: {scale: 0.5, rotate: '0deg'},
          1: {scale: 1, rotate: '360deg'},
        });
      }
    }, 400);
  }, [focus1, focus2, focus3, focus4]);
  const changecomponent = e => {
    let indexvalue = e.index;
    console.log(e, 'kkkkk');
    if (indexvalue == 0) {
      setfocus1(true);
      setInventoryTab(false);
      setActivityTab(true);
      setInboxTab(false);
      setMoreTab(false);
      setHomeTab(false);

      setfocus2(false);
      setfocus3(false);

      setfocus4(false);
    } else if (indexvalue == 1) {
      setInventoryTab(true);
      setActivityTab(false);
      setInboxTab(false);
      setMoreTab(false);
      setHomeTab(false);

      setfocus1(false);
      setfocus2(true);
      setfocus3(false);

      setfocus4(false);
    } else if (indexvalue == 2) {
      setMoreTab(false);
      setInventoryTab(false);
      setActivityTab(false);
      setInboxTab(false);
      setHomeTab(true);

      setfocus1(false);
      setfocus2(false);
      setfocus3(true);

      setfocus4(false);
    } else if (indexvalue == 3) {
      setMoreTab(false);
      setInventoryTab(false);
      setActivityTab(false);

      setInboxTab(true);
      setHomeTab(false);

      setfocus1(false);
      setfocus2(false);
      setfocus3(false);

      setfocus4(true);
    } else if (indexvalue == 4) {
      setMoreTab(true);
      setInventoryTab(false);
      setActivityTab(false);
      setHomeTab(false);

      setInboxTab(false);
      setfocus1(false);
      setfocus2(false);
      setfocus3(false);

      setfocus5(true);
    }
  };
  const tabs = [
    {
      name: 'Activities',
      activeIcon: (
        <View style={{justifyContent: 'center', alignItems: 'center', top: 7}}>
          <Animatable.View useNativeDriver={true} ref={viewRef1} duration={500}>
            <Image
              style={{width: 24, height: 24, tintColor: '#FFF'}}
              source={AppImages.activity}
            />
          </Animatable.View>
          <Text
            style={{
              fontSize: 10,
              color: '#838FA0',
              fontFamily: 'Nunito-Medium',
              top: '87%',
            }}>
            Activities
          </Text>
        </View>
      ),
      inactiveIcon: (
        <Image style={{width: 24, height: 24}} source={AppImages.activity} />
      ),
      index: 0,
    },
    {
      name: 'Inventory',
      activeIcon: (
        <View style={{justifyContent: 'center', alignItems: 'center', top: 7}}>
          <Animatable.View useNativeDriver={true} ref={viewRef2} duration={500}>
            <Image
              style={{width: 24, height: 24, tintColor: '#FFF'}}
              source={AppImages.inventory}
            />
          </Animatable.View>
          <Text
            style={{
              fontSize: 10,
              color: '#838FA0',
              fontFamily: 'Nunito-Medium',
              top: '87%',
            }}>
            Inventory
          </Text>
        </View>
      ),
      inactiveIcon: (
        <Image style={{width: 24, height: 24}} source={AppImages.inventory} />
      ),
      index: 1,
    },
    {
      name: 'Home',
      activeIcon: (
        <View style={{justifyContent: 'center', alignItems: 'center', top: 7}}>
          <Animatable.View useNativeDriver={true} ref={viewRef3} duration={500}>
            <Image
              style={{width: 32, height: 32, tintColor: '#FFF'}}
              source={AppImages.homescreen}
            />
          </Animatable.View>
          <Text
            style={{
              fontSize: 10,
              color: '#838FA0',
              fontFamily: 'Nunito-Medium',
              top: '62%',
            }}>
            Home
          </Text>
        </View>
      ),
      inactiveIcon: (
        <Image style={{width: 24, height: 24}} source={AppImages.homescreen} />
      ),
      index: 2,
    },
    {
      name: 'Inbox',
      activeIcon: (
        <View style={{justifyContent: 'center', alignItems: 'center', top: 7}}>
          <Animatable.View useNativeDriver={true} ref={viewRef4} duration={500}>
            <Image
              style={{width: 24, height: 24, tintColor: '#FFF'}}
              source={AppImages.inbox}
            />
          </Animatable.View>
          <Text
            style={{
              fontSize: 10,
              color: '#838FA0',
              fontFamily: 'Nunito-Medium',
              top: '87%',
            }}>
            Inbox
          </Text>
        </View>
      ),
      inactiveIcon: (
        <Image style={{width: 24, height: 24}} source={AppImages.inbox} />
      ),
      index: 3,
    },
    {
      name: 'More',
      activeIcon: (
        <View style={{justifyContent: 'center', alignItems: 'center', top: 7}}>
          <Animatable.View useNativeDriver={true} ref={viewRef5} duration={500}>
            <Image
              style={{width: 24, height: 24, tintColor: '#FFF'}}
              source={AppImages.more}
            />
          </Animatable.View>
          <Text
            style={{
              fontSize: 10,
              color: '#838FA0',
              fontFamily: 'Nunito-Medium',
              top: '87%',
            }}>
            More
          </Text>
        </View>
      ),
      inactiveIcon: (
        <Image style={{width: 24, height: 24}} source={AppImages.more} />
      ),
      index: 4,
    },
  ];
  return (
    <View style={{backgroundColor: '#FFF', height: 60}}>
      <Tabbar
        tabs={tabs}
        tabBarContainerBackground="#FFF"
        tabBarBackground="#F8F8F8"
        activeTabBackground="#EA8C00"
        labelStyle={{
          fontSize: 10,
          color: '#838FA0',
          fontFamily: 'Nunito-Medium',
          top: 16,
        }}
        onTabChange={e => changecomponent(e)}
        containerBottomSpace={52}
        transitionSpeed={100}
        containerBottomRightRadius={10}
        defaultActiveTabIndex={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgbackground: {
    width: '100%',
    height: 90,
    backgroundColor: 'transparent',
    position: 'absolute',
    bottom: 40,
  },
  mainContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:'green'
  },
  imgRightbar: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    alignItems: 'flex-end',
  },
  imgbox: {
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgLeftbar: {
    width: '35%',
    flexDirection: 'row',
    justifyContent: 'space-between',

    height: 80,
    alignItems: 'flex-end',
  },
  centerbar: {
    width: '30%',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 25,
  },
  rightText: {
    flexDirection: 'row',
    width: '35%',
    justifyContent: 'space-between',
  },
  leftText: {
    flexDirection: 'row',
    width: '33%',
    justifyContent: 'space-between',
  },
  centerText: {width: '32%', alignItems: 'center'},
  text: {fontSize: 10, color: '#838FA0', fontFamily: 'Nunito-Medium', top: -3},
  bottomwidth: {
    height: 41,
    backgroundColor: '#FFF',
  },
  btn: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default BottomTab;
