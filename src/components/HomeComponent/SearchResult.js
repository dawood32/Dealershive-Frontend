import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {useSelector, useDispatch} from 'react-redux';
import {filterData} from '../../redux/action/appcall';
import SortBy from './SortBy';
import {likedislike} from '../../redux/action/appcall';
import {useNavigation} from '@react-navigation/native';
import {CountryCodes} from '../CountryCodes';
const {height, width} = Dimensions.get('screen');

const SearchResult = ({screentype, searchText}) => {
  const [valuebrand1, setvaluebrand1] = useState('');
  const [dialColor1, setdialColor1] = useState('');
  const [yearvalue1, setyearvalue1] = useState('');
  const [referenceValue1, setReferenceValue1] = useState('');
  const [dilveryContent1, setDilveryContent1] = useState('full set');
  const [caseSize1, setCaseSize1] = useState('');
  const [filter, setFilter] = useState(false);
  const navigation = useNavigation();
  const resultdata = useSelector(state => state.HomeDataReducer?.data?.data);
  const [sortValue, setSortValue] = useState('');

  const [boldS1, setBoldS1] = useState(false);
  const [boldS2, setBoldS2] = useState(false);

  const [boldS3, setBoldS3] = useState(false);

  const [boldS4, setBoldS4] = useState(false);

  const [boldS5, setBoldS5] = useState(false);

  const [boldS6, setBoldS6] = useState(false);

  const arrlength = resultdata;
  const [sortby, setsortby] = useState(false);
  const [sorttext, setSortText] = useState('');
  const dispatch = useDispatch();

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
  const sortbyscreen = () => {
    setsortby(true);
  };

  useEffect(() => {
    console.log(screentype, 'kq123cc');
    setItemdata(resultdata);
    dispatch(filterData());
  }, [resultdata]);
  useEffect(() => {
    resultdata?.forEach(obj1 => {
      const matchingCountry = CountryCodes.find(
        obj2 => obj2.name == obj1.country,
      );
      console.log(matchingCountry, 'matcccccc');
      if (matchingCountry) {
        obj1.flag = matchingCountry.flag;
      }
    });
  });
  const [itemdata, setItemdata] = useState([]);
  const likeapi = (item, status) => {
    console.log(resultdata, 'kqqq');
    console.log(item.id, '1234pak');
    const updatedData = resultdata.map(data => {
      if (data.id === item.id) {
        return {
          ...data,
          like_status: !status,
        };
      }
      return data;
    });

    setItemdata(updatedData);

    // console.log(id,status);

    let params = JSON.stringify({
      product_id: item.id,
      like: !status,
    });
    dispatch(likedislike(params));
  };

  return (
    <View style={styles.mainContainer}>
      {arrlength?.length == 0 ? (
        <View>
          <Image
            style={{alignSelf: 'center', width: 217, height: 217}}
            source={AppImages.nodata}
          />
          <Text
            style={{
              color: '#000',
              fontSize: 20,
              fontFamily: 'Nunito-Bold',
              alignSelf: 'center',
            }}>
            No Results Found
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.headertext}>
            <View style={{flexDirection: 'row'}}>
              {sortby ? null : (
                <Text style={styles.headingtxt1}>{arrlength?.length}</Text>
              )}
              {sortby ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <Text style={styles.headingtxt}>Sort By</Text>
                  <TouchableOpacity
                    style={{
                      // backgroundColor: 'red',
                      width: 50,
                      height: 40,
                      alignItems: 'flex-end',
                      top: -10,
                      right: -10,
                    }}
                    onPress={() => setsortby(false)}>
                    <Image
                      style={{width: 24, height: 24, top: 15, right: 12}}
                      source={AppImages.crossvector}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.headingtxt1}>Results Found</Text>
              )}
            </View>
            {sortby ? null : (
              <View style={styles.headingicin}>
                <TouchableOpacity
                  style={{padding: 7, left: -10}}
                  onPress={() => filterscreen()}>
                  <Image
                    style={{width: 24, height: 24}}
                    source={AppImages.fltr}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{padding: 7, right: 3}}
                  onPress={() => sortbyscreen()}>
                  <Image
                    style={{width: 26, height: 26}}
                    source={AppImages.men}></Image>
                </TouchableOpacity>
              </View>
            )}
          </View>
          {sortby ? (
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
              setSortValue={setSortValue}
              screentype={screentype}
              searchText={searchText}
              valuebrand1={valuebrand1}
              dialColor1={dialColor1}
              yearvalue1={yearvalue1}
              referenceValue1={referenceValue1}
              dilveryContent1={dilveryContent1}
              caseSize1={caseSize1}
              filter={filter}
            />
          ) : (
            <>
              {screentype == 'userprofile' ? (
                <View style={{paddingTop: 20}}>
                  <FlatList
                    data={itemdata}
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => {
                      return (
                        <View style={{paddingBottom: 20}}>
                          <View style={styles.categoryyview}>
                            <View style={styles.cardview}>
                              <View style={{width: '18%'}}>
                                <Image source={AppImages.rolexwatch} />
                              </View>
                              <View style={styles.card}>
                                <Text
                                  numberOfLines={1}
                                  style={styles.categoryytxt}>
                                  {item.product_title}
                                </Text>
                                <Text style={styles.cardyear}>
                                  {item.model}
                                </Text>
                                <Text style={styles.cardcondition}>
                                  Condition:Used
                                </Text>
                              </View>
                              <View style={styles.cardimg}>
                                <TouchableOpacity>
                                  <Image source={AppImages.trash} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                  <Image source={AppImages.edit} />
                                </TouchableOpacity>
                              </View>
                            </View>
                            <View style={styles.card2}>
                              <View style={{width: '18%'}}></View>
                              <View style={styles.cardstyle}>
                                <Image source={AppImages.certificate3} />
                                <Image
                                  source={AppImages.certificate4}
                                  style={{marginLeft: 6}}
                                />
                              </View>
                              <Text style={styles.cardprice}>
                                ${item.price}
                              </Text>
                            </View>
                          </View>
                        </View>
                      );
                    }}
                  />
                  <View style={{height: 123}} />
                </View>
              ) : (
                <View style={styles.bottomContainer}>
                  <FlatList
                    scrollEnabled={false}
                    data={itemdata}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    keyExtractor={(item, index) => item.id.toString()}
                    renderItem={({item, index}) => {
                      return (
                        <ImageBackground
                          source={AppImages.itemcard}
                          style={styles.cardbg}>
                          <View style={styles.cardbox}>
                            <View style={styles.cardbox1}>
                              <View style={styles.watchbox}>
                                <View>
                                  <Image
                                    style={{width: 18, height: 18}}
                                    borderRadius={500}
                                    source={item.flag}
                                  />
                                  <Text style={styles.card3}>
                                    {item.country}
                                  </Text>
                                </View>
                                <TouchableOpacity
                                  onPress={() =>
                                    likeapi(item, item.like_status)
                                  }>
                                  {item.like_status ? (
                                    <Image
                                      style={{width: 20, height: 20}}
                                      source={AppImages.redheart}></Image>
                                  ) : (
                                    <Image
                                      style={{width: 20, height: 20}}
                                      source={AppImages.heart}></Image>
                                  )}
                                </TouchableOpacity>
                              </View>
                              <Image
                                style={styles.watchimg}
                                source={AppImages.rolex1}
                              />
                              <Image source={AppImages.rolexshadow}></Image>
                            </View>
                            <View>
                              <Text style={styles.modal}>
                                {item.product_title}
                              </Text>
                              <View
                                style={{flexDirection: 'row', marginTop: 3}}>
                                <Text style={styles.card5}>
                                  {item.category}
                                </Text>
                                <Text>-</Text>
                                <Text style={styles.card5}>{item.model}</Text>
                              </View>
                              <View style={styles.certificateContainer}>
                                <Image
                                  style={{
                                    marginRight: 8,
                                    width: 20,
                                    height: 20,
                                  }}
                                  source={AppImages.certificate1}
                                />
                                <Image
                                  style={{width: 20, height: 20}}
                                  source={AppImages.certificate2}
                                />
                              </View>
                              <Text style={styles.card8}>${item.price}</Text>
                            </View>
                          </View>
                          <View style={styles.btnbox}>
                            <TouchableOpacity style={styles.btn}>
                              <Image
                                source={AppImages.plusbutton}
                                style={styles.card9}></Image>
                            </TouchableOpacity>
                          </View>
                        </ImageBackground>
                      );
                    }}
                  />
                </View>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#F8F8F8',
  },
  headertext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headingtxt: {
    color: '#838FA0',
    fontSize: 16,

    fontFamily: 'Nunito-Medium',
  },
  headingtxt1: {
    color: '#838FA0',
    fontSize: 16,
    marginRight: 5,

    fontFamily: 'Nunito-Medium',
  },

  headingtxtt: {
    color: '#EA8C00',
    fontSize: 12,

    fontFamily: 'Nunito-Bold',
  },
  cardbg: {
    width: width * 0.42,
    height: 270,
    marginRight: 20,
    marginBottom: 20,
  },
  card1: {
    backgroundColor: '#F8F8F8',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 6,
    borderRadius: 8,
  },
  card2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingRight: 18,
  },
  card3: {
    color: '#202342',
    fontSize: 10,

    fontFamily: 'Nunito-Bold',
    alignSelf: 'center',
  },
  modal: {
    color: '#202342',
    fontSize: 14,

    fontFamily: 'Nunito-Bold',
    marginTop: 6,
  },
  card5: {
    color: '#202342',
    fontSize: 12,

    fontFamily: 'Nunito-Medium',
  },
  card6: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 4,
    width: 55,
    justifyContent: 'space-between',
  },
  card7: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 2,
  },
  card8: {
    color: '#EA8C00',
    fontSize: 14,

    fontFamily: 'Nunito-Bold',
  },
  card9: {
    height: 29,
    width: 48,
  },
  cardbox: {
    // backgroundColor: 'green',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 10,
  },
  btnbox: {
    width: '100%',
    alignItems: 'flex-end',
    // backgroundColor:'yellow'
  },
  btn: {
    top: -24,
    left: -1,
  },
  cardbox1: {
    paddingHorizontal: 10,
    paddingTop: 10,
    height: 160,
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
  },
  watchbox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  certificateContainer: {
    flexDirection: 'row',
    marginVertical: 3,
    marginTop: 5,
  },
  bottomContainer: {
    marginTop: 15,
  },
  watchimg: {
    alignSelf: 'center',
    width: 90,
    height: 90,
  },
  headingicin: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
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
    // backgroundColor: 'red',
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

export default SearchResult;
