import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import BottomTab from '../../components/BottomTab';
import Categories from '../../components/HomeComponent/Categories';
import Inventory from '../../components/InventoryComponent/Inventory';
import UserEditPanel from '../../components/InventoryComponent/UserEditPanel';
import ShopInfo from '../../components/InventoryComponent/ShopInfo';
import {useDispatch, useSelector} from 'react-redux';
import {UserProfileData, homeData} from '../../redux/action/appcall';
import DealerShop from '../../components/DealerComponent/DealerShop';
import DealerInfo from '../../components/DealerComponent/DealerInfo';
import DealerReviews from '../../components/DealerComponent/DealerReviews';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {filterData} from '../../redux/action/appcall';
const DealerProfile = ({navigation}) => {
  const userData = useSelector(state => state?.UserProfileReducer?.data?.data);
  const [tuitylink, setTuitylink] = useState('');

  useEffect(() => {
    console.log(userData?.background_image, 'kip3333');
    dealerapi();
    dispatch(filterData());
  }, []);
  const dispatch = useDispatch();
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'shop', title: 'Shop'},
    {key: 'shopinfo', title: 'Shop info'},
    {key: 'reviews', title: 'Reviews'},
  ]);

  const dealerapi = async () => {
    let userid = await AsyncStorage.getItem('@user_id');
    let link = await AsyncStorage.getItem('@platform_tuity_link');
    setTuitylink(link);

    let iduser = +userid;
    console.log(iduser, 'screenid');
    const params = 'screen=' + 'dealer' + '&dealer_id=' + iduser;
    dispatch(homeData(params));
  };

  const Shop = () => <DealerShop />;

  const ShopInfo = () => <DealerInfo />;

  const Reviews = () => <DealerReviews />;

  const renderScene = SceneMap({
    shop: Shop,
    shopinfo: ShopInfo,
    reviews: Reviews,
  });
  const backfunc = () => {
    navigation.goBack();
  };
  const renderTabBar = props => {
    return (
      <TabBar
        {...props}
        pressOpacity={0.5}
        indicatorStyle={{
          height: 1,
          backgroundColor: '#EA8C00',
          marginHorizontal: 10,
          width: 120,
        }}
        indicatorContainerStyle={styles.indicatStyle}
        style={{backgroundColor: 'transparent', elevation: 0}}
        renderLabel={({route, focused, color}) => (
          <View>
            {focused == false ? (
              <Text style={[styles.titleStyle, {color: '#838FA0'}]}>
                {route.title}
              </Text>
            ) : (
              <View style={{}}>
                <Text style={[styles.titleStylee, {color: '#EA8C00'}]}>
                  {route.title}
                </Text>
              </View>
            )}
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor={'transparent'}
      />
      {userData?.background_image ? (
        <ImageBackground
          source={{uri: userData?.background_image}}
          style={styles.header}>
          <View
            style={{
              width: '100%',
              height: 30,
            }}>
            <TouchableOpacity
              style={{
                width: 30,
                height: 40,
                justifyContent: 'center',
                top: -10,
                alignItems: 'center',
                left: -10,
              }}
              onPress={() => {
                backfunc();
              }}>
              <Image
                style={{tintColor: '#FFF', width: 24, height: 24}}
                source={AppImages.arrowback}></Image>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}>
            {/* <Image source={AppImages.timecraft} /> */}
            {/* <Text>{userData?.contact_name}</Text> */}
          </View>
        </ImageBackground>
      ) : (
        <ImageBackground source={AppImages.dealerimg} style={styles.header}>
          <View
            style={{
              width: '100%',
              height: 30,
            }}>
            <TouchableOpacity
              style={{
                width: 30,
                height: 40,
                justifyContent: 'center',
                top: -10,
                alignItems: 'center',
                left: -10,
              }}
              onPress={() => {
                backfunc();
              }}>
              <Image
                style={{tintColor: '#FFF', width: 24, height: 24}}
                source={AppImages.arrowback}></Image>
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center'}}></View>
        </ImageBackground>
      )}

      <View style={{height: '12%'}}>
        {userData?.dealer_image ? (
          <Image
            borderRadius={100}
            style={{width: 70, height: 70, marginTop: -50, left: 20}}
            source={{uri: userData?.dealer_image}}
          />
        ) : (
          <Image source={AppImages.seconddummy} style={styles.img}></Image>
        )}
        <View style={styles.headerview}>
          <View style={styles.headerview1}>
            <View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.headerview2}>
                  <Text style={styles.headerviewtxt}>{userData?.username}</Text>
                </View>

                <Image
                  style={{marginLeft: 7, height: 18, width: 18}}
                  source={AppImages.goldtik}></Image>
                <Image
                  style={{marginLeft: 7, height: 18, width: 18}}
                  source={AppImages.contract}></Image>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.headerviewtxt4}>{userData?.shop_name}</Text>
                <Text style={styles.headerviewtxt3}>{userData?.country}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <TabView
        style={{paddingTop: 12, color: 'black'}}
        navigationState={{index, routes}}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
        swipeEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 150,

    backgroundColor: '#19242C',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  img: {
    width: 72,
    height: 72,
    marginTop: -50,
    left: 18,
  },
  headerview: {
    height: 62,
    paddingHorizontal: 20,
    flexDirection: 'row',
    paddingTop: 12,
    marginTop: 8,
  },
  headerview1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerview2: {
    maxWidth: '80%',

    alignContent: 'center',
  },
  headerviewtxt: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  headerviewtxt1: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    paddingTop: 5,
  },
  heading: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  heading1: {
    fontFamily: 'Nunito-ExtraBold',
    color: '#EA8C00',
  },
  heading2: {
    fontFamily: 'Nunito-Bold',
    color: '#838FA0',
  },
  heading3: {
    fontFamily: 'Nunito-Bold',
    color: '#838FA0',
  },
  contentview: {
    flex: 0.54,
    backgroundColor: 'blue',
  },
  searchbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  imgbg: {
    width: 250,
    height: 48,
  },
  searchinput: {
    color: '#19242C',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    maxWidth: 210,
    paddingLeft: 15,
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
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    paddingHorizontal: 15,
    paddingTop: 10,
    marginTop: 10,
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
  },
  imgbg: {
    height: 50,
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
  },
  headerviewtxt3: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Medium',
    marginLeft: 5,
    color: '#838FA0',
  },
  headerviewtxt4: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Medium',

    color: '#838FA0',
  },
});
export default DealerProfile;
