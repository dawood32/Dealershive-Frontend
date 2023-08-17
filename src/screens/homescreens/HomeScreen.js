import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Image,
  BackHandler,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from 'react-native';
import Header from '../../components/HomeComponent/Header';
import Search from '../../components/HomeComponent/Search';
import Categories from '../../components/HomeComponent/Categories';
import NewPost from '../../components/HomeComponent/NewPost';
import HotDeals from '../../components/HomeComponent/HotDeals';
import {AppImages} from '../../components/AppImages';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {homeData, searchsuggestion} from '../../redux/action/appcall';
import {homeMainPageData} from '../../redux/action/appcall';
import SearchResult from '../../components/HomeComponent/SearchResult';
import {homeSearch} from '../../redux/action/appcall';

import SkeletonDealerHive from '../../components/HomeComponent/SkeletonDealerHive';
const {width, height} = Dimensions.get('screen');
var firstScreen;
const HomeScreen = ({navigation, route, loading}) => {
  const [focusSearch, setFoucusSearch] = useState(false);
  const [searchsection, setSearchsection] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [suggestionsearch, setsuggestionsearch] = useState(false);
  const [likedislikes, setlikedislikes] = useState(false);
  const [screentype, setScreenType] = useState('home');

  const searchresult = e => {
    if (!e) {
      setSearchsection(false);

      setFoucusSearch(false);

      setSearchText('');
    } else {
      setFoucusSearch(true);
      setSearchsection(true);
      setsuggestionsearch(true);
      setSearchText(e);
      let params = 'search=' + e;
      dispatch(searchsuggestion(params));
    }
  };

  const filterResult = e => {
    Keyboard.dismiss();
    const params = 'screen=' + 'home' + '&search=' + e;
    dispatch(homeData(params, onSuccess));
  };

  const onSuccess = res => {
    console.log(res, 'ddddd');

    setFoucusSearch(false);
    setSearchsection(true);
  };
  const dispatch = useDispatch();

  const homesearchlatest = () => {
    dispatch(homeSearch());
  };
  useEffect(() => {
    homesearchlatest();

    const backAction = () => {
      // Perform screen refresh or other actions here
      // ...
      if (firstScreen == false) {
        setSearchText(''),
          setFoucusSearch(false),
          setSearchsection(false),
          (firstScreen = true);
        return true;
      } else {
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Cleanup the event listener
  }, []);

  const searchScreen = () => {
    homesearchlatest();
    firstScreen = false;
    setFoucusSearch(true);
    // dispatch(homeSearch);
    setsuggestionsearch(false);
  };
  const success = res => {
    console.log(res);
  };

  return (
    <>
      {loading ? (
        <SkeletonDealerHive />
      ) : (
        <View style={styles.mainContainer}>
          <StatusBar
            animated={true}
            translucent={true}
            backgroundColor={'transparent'}
            barStyle={'dark-content'}
          />

          <Header navigation={navigation} />

          <TouchableOpacity style={styles.mainsearch}>
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
                    // backgroundColor: 'red',
                  }}
                  onPress={() => {
                    setFoucusSearch(false),
                      setSearchsection(false),
                      setSearchText('');
                  }}>
                  <Image
                    style={{width: 24, height: 24}}
                    source={AppImages.crossvector}
                  />
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  Keyboard.dismiss(), filterResult(searchText);
                }}
                style={{height: 51, width: 80}}></TouchableOpacity>
            </ImageBackground>
          </TouchableOpacity>

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
                <SearchResult
                  searchText={searchText}
                  screentype={screentype}
                  navigation={navigation}
                />
              ) : (
                <>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <NewPost
                      likedislikes={likedislikes}
                      setlikedislikes={setlikedislikes}
                    />
                    <HotDeals />
                    <View style={{height: 120, backgroundColor: '#F8F8F8'}} />
                  </ScrollView>
                </>
              )}
            </>
          )}

          {/* <BottomTab 
      signout={signout}
      navigation={navigation}
      /> */}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  mainsearch: {
    height: 70,
    flexDirection: 'row',
    // paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor:'red'
  },
  imgbg: {
    // maxWidth: Platform.OS=="ios"?284:273,
    height: 50,
    justifyContent: 'space-between',
    width: width * 0.88,
    // top:10
    // alignItems:'center'
    flexDirection: 'row',
    // backgroundColor: 'red',
  },
  searchinput: {
    color: '#000000',
    fontSize: 14,

    fontFamily: 'Nunito-Medium',
    width: 260,
    paddingLeft: 15,
    // backgroundColor: 'lightgray',
    height: 40,
    width: '60%',
    alignSelf: 'center',
  },
  imgbg1: {
    width: 87,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    left: -8,
  },
});
export default HomeScreen;
