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
import {likedislike} from '../../redux/action/appcall';
import {homedatasuccess} from '../../redux/type';
const {height, width} = Dimensions.get('screen');
import {CountryCodes} from '../CountryCodes';
const DealerPost = () => {
  const dispatch = useDispatch();

  const newPostData = useSelector(state => state.HomeDataReducer?.data?.items);
  const secondtData = useSelector(state => state.HomeDataReducer?.data);

  const likeapi = (item, status) => {
    console.log(secondtData, 'seconddata');
    const updatedData = newPostData.map(data => {
      if (data.id === item.id) {
        return {
          ...data,
          like_status: !status,
        };
      }
      return data;
    });
    let k = {items: updatedData, status: true};

    dispatch({
      type: homedatasuccess,
      payload: k,
    });

    let params = JSON.stringify({
      product_id: item.id,
      like: !status,
    });
    dispatch(likedislike(params));
  };
  useEffect(() => {
    newPostData?.forEach(obj1 => {
      const matchingCountry = CountryCodes.find(
        obj2 => obj2.name == obj1.country,
      );
      console.log(matchingCountry, 'matcccccc');
      if (matchingCountry) {
        obj1.flag = matchingCountry.flag;
      }
    });
  });
  return (
    <View style={styles.mainContainer}>
      {newPostData?.length == 0 ? (
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
            No Data
          </Text>
        </View>
      ) : (
        <View style={styles.bottomContainer}>
          <FlatList
            data={newPostData}
            scrollEnabled={false}
            numColumns={2}
            // showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
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
                            borderRadius={1000}
                            source={item.flag}
                          />
                          <Text style={styles.card3}>{item.country}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => likeapi(item, item.like_status)}>
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
                      <Image style={styles.watchimg} source={AppImages.rolex} />
                      <Image source={AppImages.rolexshadow}></Image>
                    </View>
                    <View>
                      <Text numberOfLines={1} style={styles.modal}>
                        {item.product_title}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.card5}>{item.category}</Text>
                        <Text>-</Text>
                        <Text style={styles.card5}>{item.model}</Text>
                      </View>
                      <View style={styles.certificateContainer}>
                        {item.paper == 'yes' ? (
                          <Image
                            style={{marginRight: 8, width: 20, height: 20}}
                            source={AppImages.certificate1}
                          />
                        ) : (
                          <View style={{height: 20}} />
                        )}
                        {item.box == 'yes' ? (
                          <Image
                            style={{width: 20, height: 20}}
                            source={AppImages.certificate2}
                          />
                        ) : (
                          <View style={{height: 20}} />
                        )}
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
          <View style={{height: 100}} />
        </View>
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
    color: '#000000',
    fontSize: 16,

    fontFamily: 'Nunito-Bold',
  },
  headingtxtt: {
    color: '#EA8C00',
    fontSize: 12,

    fontFamily: 'Nunito-Bold',
  },
  cardbg: {
    width: width * 0.42,

    height: 259,
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
    marginTop: 5,
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
  },
  btn: {
    top: -20,
  },
  cardbox1: {
    paddingHorizontal: 10,
    paddingTop: 10,
    height: 150,
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
  },
  bottomContainer: {
    marginTop: 10,
  },
  watchimg: {
    alignSelf: 'center',
    width: 90,
    height: 90,
  },
});

export default DealerPost;
