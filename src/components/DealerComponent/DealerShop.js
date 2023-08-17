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
import {AppImages} from '../AppImages';
import Categories from '../HomeComponent/Categories';
import DealerPost from './DealerPost';
import Search from '../HomeComponent/Search';
import SearchResult from '../HomeComponent/SearchResult';
import {searchsuggestion} from '../../redux/action/appcall';
import {useDispatch} from 'react-redux';
import {homeData} from '../../redux/action/appcall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SortBy from '../HomeComponent/SortBy';
import {useNavigation} from '@react-navigation/native';
const {width, height} = Dimensions.get('screen');

const DealerShop = () => {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const layout = useWindowDimensions();
  const [focusSearch, setFoucusSearch] = useState(false);
  const [searchsection, setSearchsection] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [suggestionsearch, setsuggestionsearch] = useState(false);
  const [screentype, setScreenType] = useState('dealer');
  const [valuebrand1, setvaluebrand1] = useState('');
  const [dialColor1, setdialColor1] = useState('');
  const [yearvalue1, setyearvalue1] = useState('');
  const [referenceValue1, setReferenceValue1] = useState('');
  const [dilveryContent1, setDilveryContent1] = useState('full set');
  const [caseSize1, setCaseSize1] = useState('');
  const [filter, setFilter] = useState(false);

  const [sortby, setsortby] = useState(false);
  const [boldS1, setBoldS1] = useState(false);
  const [boldS2, setBoldS2] = useState(false);

  const [boldS3, setBoldS3] = useState(false);

  const [boldS4, setBoldS4] = useState(false);

  const [boldS5, setBoldS5] = useState(false);

  const [boldS6, setBoldS6] = useState(false);
  const [sortValue, setSortValue] = useState('');

  const searchScreen = () => {
    setFoucusSearch(true);
  };
  const searchresult = e => {
    setFoucusSearch(true);
    setSearchsection(true);
    setsuggestionsearch(true);
    setSearchText(e);
    let params = 'search=' + e;
    dispatch(searchsuggestion(params));
  };
  const filterscreen = () => {
    navigation.navigate('Filter', {
      screentype: screentype,
      searchText: searchText,

      sortValue: sortValue,
      setvaluebrand1: setvaluebrand1,
      setdialColor1: setdialColor1,
      setyearvalue1: setyearvalue1,
      setReferenceValue1: setReferenceValue1,
      setDilveryContent1: setDilveryContent1,
      setCaseSize1: setCaseSize1,
      setFilter: setFilter,
    });
  };

  const filterResult = async e => {
    let userid = await AsyncStorage.getItem('@user_id');
    let iduser = +userid;
    const params =
      'screen=' + 'dealer' + '&dealer_id=' + iduser + '&search=' + e;
    dispatch(homeData(params, onSuccess));
  };
  const onSuccess = res => {
    console.log(res, 'ddddd');

    setFoucusSearch(false);
    setSearchsection(true);
  };
  const dealerapi = async () => {
    let userid = await AsyncStorage.getItem('@user_id');
    let iduser = +userid;
    console.log(iduser, 'screenid');
    const params = 'screen=' + 'dealer' + '&dealer_id=' + iduser;
    dispatch(homeData(params));
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <>
        <View
          style={{
            height: '100%',
          }}>
          <View style={styles.mainsearch}>
            <ImageBackground
              // resizeMode='contain'
              borderRadius={10}
              source={AppImages.rename}
              style={styles.imgbg}>
              <TextInput
                placeholder="Search watches, parts..."
                onPressIn={() => {
                  searchScreen();
                }}
                style={styles.searchinput}
                autoCorrect={false}
                autoCapitalize="none"
                value={searchText}
                keyboardType={
                  Platform.OS == 'android' ? 'visible-password' : null
                }
                onChangeText={e => searchresult(e)}
                placeholderTextColor={'#9D9D9D'}
              />
              {focusSearch || searchsection ? (
                <TouchableOpacity
                  style={{
                    width: 25,
                    height: 50,
                    alignItems: 'center',
                    right: width * 0.03,

                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    setFoucusSearch(false),
                      setSearchsection(false),
                      setSearchText('');
                    dealerapi();
                  }}>
                  <Image
                    style={{width: 24, height: 24}}
                    source={AppImages.crossvector}
                  />
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                onPress={() => filterResult(searchText)}
                style={{height: 51, width: 80}}></TouchableOpacity>
            </ImageBackground>
          </View>
          {focusSearch ? (
            <Search
              setSearchText={setSearchText}
              filterResult={filterResult}
              suggestionsearch={suggestionsearch}
            />
          ) : (
            <>
              <Categories />
              {searchsection ? (
                <SearchResult screentype={screentype} />
              ) : (
                <>
                  <View style={styles.headingview}>
                    <Text style={styles.headingtxt}>All Watches</Text>
                    <View style={styles.headingimg}>
                      <TouchableOpacity onPress={() => filterscreen()}>
                        <Image
                          style={{width: 26, height: 26}}
                          source={AppImages.fltr}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setsortby(true)}>
                        <Image
                          style={{width: 26, height: 26}}
                          source={AppImages.men}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  {sortby ? (
                    <View style={{paddingHorizontal: 20}}>
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}>
                        <Text style={styles.headingtxt}>SortBy</Text>
                        <TouchableOpacity onPress={() => setsortby(false)}>
                          <Text style={[styles.headingtxt, {fontSize: 20}]}>
                            x
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <SortBy
                        setsortby={setsortby}
                        setBoldS1={setBoldS1}
                        setBoldS2={setBoldS2}
                        setBoldS3={setBoldS3}
                        setBoldS4={setBoldS4}
                        setBoldS5={setBoldS5}
                        boldS1={boldS1}
                        boldS2={boldS2}
                        boldS3={boldS3}
                        boldS4={boldS4}
                        boldS5={boldS5}
                        screentype={screentype}
                        setSearchsection={setSearchsection}
                        setSortValue={setSortValue}
                        searchText={searchText}
                        valuebrand1={valuebrand1}
                        dialColor1={dialColor1}
                        yearvalue1={yearvalue1}
                        referenceValue1={referenceValue1}
                        dilveryContent1={dilveryContent1}
                        caseSize1={caseSize1}
                        filter={filter}
                      />
                      <View style={{height: 123}} />
                    </View>
                  ) : (
                    <DealerPost />
                  )}
                </>
              )}
            </>
          )}

          <Categories />
        </View>
      </>
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
    paddingBottom: 10,
    backgroundColor: '#F8F8F8',
    paddingTop: 15,
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
    width: width * 0.9,
    // top:10
    // alignItems:'center'
    flexDirection: 'row',
    // backgroundColor:'red',
  },
  searchinput: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    width: '60%',

    height: 40,
    paddingLeft: 15,
    alignSelf: 'center',
  },
});
export default DealerShop;
