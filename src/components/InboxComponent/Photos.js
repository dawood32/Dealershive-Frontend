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
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const Photos = () => {
  const navigation = useNavigation();
  const Photolist = useSelector(state => state?.ChatMediaReducer?.data?.data);

  const lastweek = [
    {image: AppImages.rolex},
    {image: AppImages.rolex},
    {image: AppImages.rolex},
    {image: AppImages.rolex},
    {image: AppImages.rolex},
  ];
  const lastmonth = [
    {image: AppImages.rolex},
    {image: AppImages.rolex},
    {image: AppImages.rolex},
    {image: AppImages.rolex},
    {image: AppImages.rolex},
  ];
  return (
    <View style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.recentview}>
          {/* <Text style={styles.recenttxt}>Recent</Text> */}
          <FlatList
            data={Photolist}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <View style={styles.recent1}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('SelectedPhoto', {
                        Image: item.message,
                      });
                    }}>
                    <Image
                      style={{width: 110, height: 110}}
                      source={{uri: item.message}}></Image>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        {/* <View style={{paddingHorizontal: 20}}>
          <Text
            onPress={() => {
              console.log(Photolist, 'kjkjkj');
            }}
            style={styles.lastweektxt}>
            Last Week
          </Text>
          <FlatList
            data={lastweek}
            numColumns={3}
            renderItem={({item}) => {
              return (
                <View style={styles.lastweek1}>
                  <TouchableOpacity>
                    <Image
                      style={{width: 80, height: 80}}
                      source={item.image}></Image>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <View style={{paddingHorizontal: 20}}>
          <Text style={styles.lastweektxt}>Last Month</Text>
          <FlatList
            data={lastmonth}
            numColumns={3}
            renderItem={({item}) => {
              return (
                <View style={styles.lastweek1}>
                  <TouchableOpacity>
                    <Image
                      style={{width: 80, height: 80}}
                      source={item.image}></Image>
                  </TouchableOpacity>
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
    width: 120,
    height: 120,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAECF0',
  },
  lastweektxt: {
    color: '#838FA0',
    paddingBottom: 15,
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
  },
  lastweek1: {
    width: 107,
    height: 107,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EAECF0',
    marginBottom: 5,
  },
});
export default Photos;
