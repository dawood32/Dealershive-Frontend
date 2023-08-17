import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {useDispatch, useSelector} from 'react-redux';
const Search = ({setSearchText, filterResult, suggestionsearch}) => {
  useEffect(() => {
    //   dispatch(homeSearch())
  }, []);
  const latestsearch = useSelector(
    state => state.HomeSearchReducer?.data?.lattestSearches,
  );
  const suggestionData = useSelector(
    state => state.SearchSuggestionReducer?.data,
  );

  const arrsuggest = suggestionData?.data;

  return (
    <View style={styles.container}>
      {suggestionsearch ? (
        <View>
          <Text
            onPress={() => console.log(suggestionData.data, 'kkkkk')}
            style={styles.headingtxt}>
            Related Searches
          </Text>
          {arrsuggest?.map((item, key) => {
            return (
              <TouchableOpacity
                key={key}
                onPress={() => {
                  setSearchText(item.name), filterResult(item.name);
                }}
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                  marginTop: 20,
                  borderColor: '#EAECF0',
                }}>
                <Image
                  source={AppImages.searchnormal}
                  style={{width: 24, height: 24}}></Image>

                <Text style={styles.listtxt}>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <View>
          <Text style={styles.headingtxt}>Recent Search</Text>
          {latestsearch?.map(item => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSearchText(item.search), filterResult(item.search);
                }}
                style={{
                  flexDirection: 'row',
                  borderBottomWidth: 1,
                  paddingBottom: 20,
                  marginTop: 20,
                  borderColor: '#EAECF0',
                }}>
                <Image
                  source={AppImages.searchnormal}
                  style={{width: 24, height: 24}}></Image>

                <Text style={styles.listtxt}>{item.search}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
      <View style={{height: 50}} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',

    marginTop: 20,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
  },
  headingview: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headingtxt: {
    color: '#202342',
    fontSize: 18,
    fontStyle: 'normal',
    fontFamily: 'Nunito-Bold',
  },
  headingtxt1: {
    color: '#202342',
    fontSize: 18,
    fontStyle: 'normal',
    fontFamily: 'Nunito-Bold',
    marginTop: 20,
  },

  heading2view: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
  },
  list: {
    marginHorizontal: 20,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
  },
  listtxt: {
    color: '#202342',
    fontSize: 16,
    width: '85%',
    fontFamily: 'Nunito-Medium',
    marginLeft: 20,
  },
});
export default Search;
