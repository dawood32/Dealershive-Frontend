import React, {useEffect, useState} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import BottomTab from '../../components/BottomTab';
import HomeScreen from './HomeScreen';
import InventoryScreen from './InventoryScreen';
import {UserProfileData} from '../../redux/action/appcall';
import {useDispatch} from 'react-redux';
import More from './More';
import Inbox from './Inbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {homeMainPageData} from '../../redux/action/appcall';
import Activities from './Activities';
const BottomNavigation = ({navigation}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [activitiesTab, setActivityTab] = useState(false);
  const [inventoryTab, setInventoryTab] = useState(false);

  const [inboxTab, setInboxTab] = useState(false);

  const [moreTab, setMoreTab] = useState(false);
  const [homeTab, setHomeTab] = useState(true);

  useEffect(() => {
    homeapicall();
    apiCall();
  }, []);

  const homeapicall = () => {
    const params = 'screen=' + 'home';
    dispatch(homeMainPageData(params, success));
  };

  const success = res => {
    console.log(res);
    setLoading(false);
  };

  const apiCall = async () => {
    let userid = await AsyncStorage.getItem('@user_id');
    let iduser = +userid;
    let params = 'id=' + iduser;
    dispatch(UserProfileData(params));
  };

  return (
    <View style={styles.mainContainer}>
      {/* all bottomtabsscreen */}
      {homeTab ? (
        <HomeScreen loading={loading} />
      ) : activitiesTab ? (
        <Activities />
      ) : inventoryTab ? (
        <InventoryScreen />
      ) : inboxTab ? (
        <Inbox />
      ) : moreTab ? (
        <More />
      ) : null}

      <BottomTab
        setHomeTab={setHomeTab}
        setActivityTab={setActivityTab}
        setInventoryTab={setInventoryTab}
        setInboxTab={setInboxTab}
        setMoreTab={setMoreTab}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
export default BottomNavigation;
