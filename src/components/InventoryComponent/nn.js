import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import BottomTab from '../../components/BottomTab';
import Categories from '../../components/HomeComponent/Categories';

const Inventory = () => {
  const layout = useWindowDimensions();

  const categoryy = [
    {
      name: 'Rolex Z902',
      watch: AppImages.rolexwatch,
      trash: AppImages.trash,
      edit: AppImages.edit,
      year: 'Patek Philippe - 2022',
      condition: 'Condition: Used',
      certificate3: AppImages.certificate3,
      certificate4: AppImages.certificate4,
      price: '$24.90',
    },
    {
      name: '116789RB - Rainbow ',
      watch: AppImages.rainbow,
      trash: AppImages.trash,
      edit: AppImages.edit,
      year: 'Patek Philippe - 2022',
      condition: 'Condition: Used',
      certificate3: AppImages.certificate1,
      certificate4: AppImages.certificate2,
      price: '$87.00',
    },
    {
      name: 'Rolex Z902',
      watch: AppImages.rolexwatch,
      trash: AppImages.trash,
      edit: AppImages.edit,
      year: 'Patek Philippe - 2022',
      condition: 'Condition: Used',
      certificate3: AppImages.certificate3,
      certificate4: AppImages.certificate4,
      price: '$24.90',
    },
    {
      name: 'Rolex Z902',
      watch: AppImages.rolexwatch,
      trash: AppImages.trash,
      edit: AppImages.edit,
      year: 'Patek Philippe - 2022',
      condition: 'Condition: Used',
      certificate3: AppImages.certificate3,
      certificate4: AppImages.certificate4,
      price: '$24.90',
    },
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View
        style={{
          height: '100%',
        }}>
        <View style={styles.mainsearch}>
          <ImageBackground
            // resizeMode='contain'
            source={AppImages.rename}
            style={styles.imgbg}>
            <TextInput
              placeholder="Search watches, parts..."
              style={styles.searchinput}
              autoCorrect={false}
              autoCapitalize="none"
              //  value={searchText}
              keyboardType={
                Platform.OS == 'android' ? 'visible-password' : null
              }
              //  onChangeText={(e)=>searchresult(e)}

              placeholderTextColor={'#9D9D9D'}
            />

            <TouchableOpacity
              style={{height: 51, width: 80}}></TouchableOpacity>
          </ImageBackground>
        </View>

        <Categories />
        <View style={styles.headingview}>
          <Text style={styles.headingtxt}>All Watches</Text>
          <View style={styles.headingimg}>
            <Image source={AppImages.fltr}></Image>
            <Image source={AppImages.men}></Image>
          </View>
        </View>

        <View style={{paddingTop: 20}}>
          <FlatList
            data={categoryy}
            scrollEnabled
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => {
              return (
                <View style={{paddingBottom: 20}}>
                  <View style={styles.categoryyview}>
                    <View style={styles.cardview}>
                      <View style={{width: '18%'}}>
                        <Image source={item.watch}></Image>
                      </View>
                      <View style={styles.card}>
                        <Text style={styles.categoryytxt}>{item.name}</Text>
                        <Text style={styles.cardyear}>{item.year}</Text>
                        <Text style={styles.cardcondition}>
                          {item.condition}
                        </Text>
                      </View>
                      <View style={styles.cardimg}>
                        <TouchableOpacity>
                          <Image source={item.trash}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity>
                          <Image source={item.edit}></Image>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View style={styles.card2}>
                      <View style={{width: '18%'}}></View>
                      <View style={styles.cardstyle}>
                        <Image source={item.certificate3}></Image>
                        <Image
                          source={item.certificate4}
                          style={{marginLeft: 6}}></Image>
                      </View>
                      <Text style={styles.cardprice}>{item.price}</Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <View style={{height: 123}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imgbg1: {
    width: 85,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatlistview: {
    height: 60,
    paddingLeft: 19,
  },
  categoryview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingRight: 10,
  },
  categorytxt: {
    color: '#19242C',
    backgroundColor: '#F8F8F8',
    padding: 13,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: '500',
    height: 48,
    fontFamily: 'Nunito-Bold',
  },
  headingview: {
    // height: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  headingtxt: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  headingimg: {
    flexDirection: 'row',
    width: 65,
    justifyContent: 'space-between',
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
  categoryyview: {
    height: 117,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    elevation: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    marginHorizontal: 20,
    shadowOffset: {width: 0, height: 5},
    // paddingHorizontal: 15,
    padding: 10,
  },
  categoryytxt: {
    color: '#EA8C00',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Nunito-Bold',
    paddingBottom: 7,
  },
  cardview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    width: '62%',
    paddingLeft: 10,
  },
  cardyear: {
    color: '#19242C',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Nunito-Bold',
    paddingBottom: 7,
  },
  cardcondition: {
    color: '#19242C',
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'Nunito-Bold',
  },
  cardimg: {
    flexDirection: 'row',
    width: '20%',
    justifyContent: 'space-between',
  },
  card2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    alignItems: 'center',
    paddingLeft: 10,
  },
  cardstyle: {
    flexDirection: 'row',
    width: '62%',
  },
  cardprice: {
    color: '#EA8C00',
    fontSize: 16,
    fontWeight: '400',
    fontFamily: 'Nunito-Bold',
  },
  mainsearch: {
    height: 70,
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // backgroundColor:'red'
  },
  imgbg: {
    // maxWidth: Platform.OS=="ios"?284:273,
    height: 50,
    justifyContent: 'space-between',
    width: '100%',
    // top:10
    // alignItems:'center'
    flexDirection: 'row',
    // backgroundColor:'red',
  },
});
export default Inventory;
