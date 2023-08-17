import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Linking,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const MediaLink = () => {
  const link = useSelector(state => state?.ChatMediaReducer?.data?.links);
  const Openlink = url => {
    Linking.openURL(url);
  };
  const recent = [
    {
      image: AppImages.linkwatch,
      name: 'Title',
      link: 'https://www.externallinks.com/xy238shdklf2390-fsaksljesjlkdf9o0e98r3',
      description: 'description line...',
    },
  ];
  const lastweek = [
    {
      image: AppImages.linkwatch4,
      name: 'Title',
      link: 'https://www.externallinks.com/xy238shdklf2390-fsaksljesjlkdf9o0e98r3',
      description: 'description line...',
    },
    {
      image: AppImages.linkwatch2,
      name: 'Title',
      link: 'https://www.externallinks.com/xy238shdklf2390-fsaksljesjlkdf9o0e98r3',
      description: 'description line...',
    },
    {
      image: AppImages.linkwatch3,
      name: 'Title',
      link: 'https://www.externallinks.com/xy238shdklf2390-fsaksljesjlkdf9o0e98r3',
      description: 'description line...',
    },
    {
      image: AppImages.linkwatch4,
      name: 'Title',
      link: 'https://www.externallinks.com/xy238shdklf2390-fsaksljesjlkdf9o0e98r3',
      description: 'description line...',
    },
    {
      image: AppImages.linkwatch2,
      name: 'Title',
      link: 'https://www.externallinks.com/xy238shdklf2390-fsaksljesjlkdf9o0e98r3',
      description: 'description line...',
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.recentview}>
          {/* <Text style={styles.recenttxt}>Recent</Text> */}
          <FlatList
            data={link}
            renderItem={({item}) => {
              return (
                <View style={styles.recent1}>
                  <View style={{width: '75%'}}>
                    <TouchableOpacity onPress={() => Openlink(item.message)}>
                      <Text style={styles.externallink}>{item.message}</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.descriptionline}>
                      {item.description}
                    </Text> */}
                  </View>
                  <View style={styles.linkimg}>
                    <Image
                      source={item.image}
                      style={styles.linkimgsize}></Image>
                  </View>
                </View>
              );
            }}
          />
        </View>
        {/* <View style={{paddingHorizontal: 20}}>
          <Text style={styles.lastweektxt}>Last Week</Text>
          <FlatList
            data={lastweek}
            renderItem={({item}) => {
              return (
                <View style={styles.lastweek1}>
                  <View style={{width: '75%'}}>
                    <TouchableOpacity>
                      <Text style={styles.externallink}>{item.link}</Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.descriptionline}>
                      {item.description}
                    </Text>
                  </View>
                  <View style={styles.linkimg}>
                    <Image
                      source={item.image}
                      style={styles.linkimgsize}></Image>
                  </View>
                </View>
              );
            }}
          />
        </View> */}

        <View style={{height: 50}}></View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: 40,
  },
  header: {
    // backgroundColor: 'red',
    flex: 0.12,
    // paddingHorizontal:20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    marginHorizontal: 20,
    borderColor: '#EAECF0',
    height: 100,
  },
  headertxt: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#19242C',
    paddingLeft: 15,
  },
  flatlistview: {
    height: 60,
    paddingLeft: 19,
    flex: 0.12,
  },
  categoryview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingRight: 12,
  },
  categorytxt: {
    color: '#19242C',
    backgroundColor: '#F8F8F8',
    padding: 13,
    borderRadius: 10,
    fontSize: 16,
    height: 48,
    fontFamily: 'Nunito-Medium',
  },
  recentview: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    // flex:0.22
  },
  recenttxt: {
    color: '#838FA0',
    paddingBottom: 15,
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
  recent1: {
    // height: 107,
    width: 320,
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAECF0',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#F8F8F8',
  },
  externallink: {
    color: '#EA8C00',
    fontSize: 11,
    fontFamily: 'Nunito-Medium',
    paddingBottom: 7,
  },
  title: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Bold',
    paddingBottom: 7,
  },
  descriptionline: {
    color: '#838FA0',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
  },
  linkimg: {
    alignItems: 'flex-end',
    width: '25%',
  },
  linkimgsize: {
    width: 61,
    height: 41,
  },
  lastweektxt: {
    color: '#838FA0',
    paddingBottom: 15,
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
  lastweek1: {
    // width: 107,
    // height: 107,
    // marginRight: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderRadius: 10,
    // borderWidth: 1,
    // borderColor: '#EAECF0',
    // marginBottom: 5
    // height: 107,
    width: 320,
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAECF0',
    flexDirection: 'row',
    padding: 10,
    marginBottom: 5,
  },
});
export default MediaLink;
