import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {AppImages} from '../AppImages';
import {useDispatch} from 'react-redux';
import {homeData} from '../../redux/action/appcall';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SortBy = ({
  navigation,
  setsortby,
  setBoldS1,
  setBoldS2,
  setBoldS3,
  setBoldS4,
  setBoldS5,
  boldS1,
  boldS2,
  boldS3,
  boldS4,
  boldS5,
  screentype,
  setSearchsection,
  searchText,
  setSortValue,
  valuebrand1,
  dialColor1,
  yearvalue1,
  referenceValue1,
  dilveryContent1,
  caseSize1,
  filter,
}) => {
  const dispatch = useDispatch();

  const sortingdata = async e => {
    // console.log(filter, 'kfilterccc');
    setSortValue(e);
    let userid = await AsyncStorage.getItem('@user_id');
    let iduser = +userid;
    console.log(searchText, 'kpppp');
    if (screentype == 'home') {
      let params;
      {
        filter
          ? (params =
              'screen=' +
              'home' +
              '&sort=' +
              e +
              '&search=' +
              searchText +
              '&filter=' +
              'true' +
              '&brand=' +
              valuebrand1 +
              '&model=' +
              yearvalue1 +
              '&reference=' +
              referenceValue1 +
              '&size=' +
              caseSize1 +
              '&color=' +
              dialColor1 +
              '&delivery_content=' +
              dilveryContent1)
          : (params =
              'screen=' + 'home' + '&sort=' + e + '&search=' + searchText);
      }
      dispatch(homeData(params, onSuccess));
    } else if (screentype == 'dealer' || screentype == 'userprofile') {
      const params =
        'screen=' + 'dealer' + '&dealer_id=' + iduser + '&sort=' + e;
      dispatch(homeData(params, onSuccess));
    }
  };

  const onSuccess = () => {
    console.log('kkkkkkk');
    setsortby(false);
    setSearchsection(true);
    // navigation.navigate("HomeScreen")
  };
  return (
    <View style={{flax: 1, height: '100%'}}>
      <TouchableOpacity
        onPress={() => {
          setBoldS1(true),
            setBoldS2(false),
            setBoldS3(false),
            setBoldS4(false),
            setBoldS5(false),
            sortingdata('brands');
        }}
        style={styles.list1}>
        <Text
          style={[
            styles.list1text,
            {
              fontFamily: boldS1 ? 'Nunito-Bold' : 'Nunito-Medium',
              color: boldS1 ? '#202342' : '#838FA0',
            },
          ]}>
          Branddds
        </Text>
        {boldS1 ? <Image source={AppImages.tik}></Image> : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setBoldS1(false),
            setBoldS2(true),
            setBoldS3(false),
            setBoldS4(false),
            setBoldS5(false),
            sortingdata('highest price');
        }}
        style={styles.list1}>
        <Text
          style={[
            styles.list1text,
            {
              fontFamily: boldS2 ? 'Nunito-Bold' : 'Nunito-Medium',
              color: boldS2 ? '#202342' : '#838FA0',
            },
          ]}>
          Highest Price
        </Text>
        {boldS2 ? <Image source={AppImages.tik}></Image> : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setBoldS1(false),
            setBoldS2(false),
            setBoldS3(true),
            setBoldS4(false),
            setBoldS5(false),
            sortingdata('lowest price');
        }}
        style={styles.list1}>
        <Text
          style={[
            styles.list1text,
            {
              fontFamily: boldS3 ? 'Nunito-Bold' : 'Nunito-Medium',
              color: boldS3 ? '#202342' : '#838FA0',
            },
          ]}>
          Lowest Price
        </Text>
        {boldS3 ? <Image source={AppImages.tik} /> : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setBoldS1(false),
            setBoldS2(false),
            setBoldS3(false),
            setBoldS4(true),
            setBoldS5(false),
            sortingdata('relevant');
        }}
        style={styles.list1}>
        <Text
          style={[
            styles.list1text,
            {
              fontFamily: boldS4 ? 'Nunito-Bold' : 'Nunito-Medium',
              color: boldS4 ? '#202342' : '#838FA0',
            },
          ]}>
          Most Relevant
        </Text>
        {boldS4 ? <Image source={AppImages.tik}></Image> : null}
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setBoldS1(false),
            setBoldS2(false),
            setBoldS3(false),
            setBoldS4(false),
            setBoldS5(true),
            sortingdata('publication date');
        }}
        style={styles.list1}>
        <Text
          style={[
            styles.list1text,
            {
              fontFamily: boldS5 ? 'Nunito-Bold' : 'Nunito-Medium',
              color: boldS5 ? '#202342' : '#838FA0',
            },
          ]}>
          Publication Date (earlier to older)
        </Text>
        {boldS5 ? <Image source={AppImages.tik}></Image> : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headingview: {
    height: 52,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor:'red'
  },
  sort: {
    color: '#838FA0',
    fontSize: 16,

    fontFamily: 'Nunito-Medium',
  },
  headingicin: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    height: 50,
    borderColor: '#EAECF0',
  },
  listtext: {
    fontSize: 16,
    fontWeight: '500',
  },
  list1: {
    flexDirection: 'row',
    // marginHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: 20,
    borderColor: '#EAECF0',
    marginTop: 20,
  },
  list1text: {
    fontSize: 16,

    fontFamily: 'Nunito-Medium',
  },
});

export default SortBy;
