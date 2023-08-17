import React from 'react';
import {
  Text,
  View,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {useSelector} from 'react-redux';
const DealerReviews = () => {
  const userData = useSelector(state => state?.UserProfileReducer?.data?.data);

  const category = [
    {
      name: 'San jjjjci',
      Image: AppImages.Ell,
      text: 'lorem ipsum is a simple dummy lorem ipsum is a simple dummy lorem ipsum is a simple.',
      days: '. 2-days-ago',
      number: '4.8',
      star: AppImages.Star,
    },
    {
      name: 'Railey Rossow',
      Image: AppImages.Ell,
      text: 'lorem ipsum is a simple dummy lorem ipsum is a simple dummy lorem ipsum is a simple.',
      days: '. 7-days-ago',
      number: '5.0',
      star: AppImages.Star,
    },
    {
      name: 'Railey Rossow',
      Image: AppImages.Ell,
      text: 'lorem ipsum is a simple dummy lorem ipejkdddifjfjfjfjfjfjfjjfjfjfjffjjfjfjfjfjfjfjfjfjfjfjfjfsjjsjsjssjjsjsjsjsum is a simple dummy lorem ipsum is a simple.',
      days: '. 7-days-ago',
      number: '5.0',
      star: AppImages.Star,
    },
    {
      name: 'Railey Rossow',
      Image: AppImages.Ell,
      text: 'lorem ipsum is a simple dummy lorem ipejkdddifjfjfjfjfjfjfjjfjfjfjffjjfjfjfjfjfjfjfjfjfjfjfjfsjjsjsjssjjsjsjsjsum is a simple dummy lorem ipsum is a simple.',
      days: '. 7-days-ago',
      number: '5.0',
      star: AppImages.Star,
    },

    {
      name: 'Railey Rossow',
      Image: AppImages.Ell,
      text: 'lorem ipsum is a simple dummy lorem ipejkdddifjfjfjfjfjfjfjjfjfjfjffjjfjfjfjfjfjfjfjfjfjfjfjfsjjsjsjssjjsjsjsjsum is a simple dummy lorem ipsum is a simple.',
      days: '. 7-days-ago',
      number: '5.0',
      star: AppImages.Star,
    },
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={{paddingHorizontal: 20, height: '100%'}}>
        <View style={styles.card}>
          <View style={styles.card1}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.card3}>{userData.ratings}</Text>
              <Image
                source={AppImages.Star}
                style={{
                  marginLeft: 3,
                  top: -2,
                }}></Image>
            </View>
            <Text style={styles.card1textt}>Total Ratings</Text>
          </View>

          <View style={styles.card2}>
            <Text style={styles.card2text}>{userData.reviews}</Text>
            <Text style={styles.card2textt}>Total Reviews</Text>
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <FlatList
            data={userData?.metrics}
            renderItem={({item}) => {
              return (
                <View style={styles.categoryview}>
                  <View style={styles.cardview}>
                    <Image
                      style={{marginRight: 10}}
                      source={item.Image}></Image>

                    <View style={{maxWidth: '40%'}}>
                      <Text style={styles.categorytxt}>
                        {item.contact_name}
                      </Text>
                    </View>
                    <View style={styles.cardstyle}>
                      <Text style={styles.cardday}>{item.days}</Text>
                      <Image
                        style={{marginRight: 8}}
                        source={item.star}></Image>
                      <Text style={styles.cardnum}>{item.stars}</Text>
                    </View>
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text style={styles.cardtext}>{item.feedback}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
      <View style={{height: 100}} />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  card: {
    height: 120,
    // paddingHorizontal: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  card1: {
    backgroundColor: '#F9F9F9',
    width: 150,
    justifyContent: 'center',
    borderRadius: 12,
    height: 80,
    paddingLeft: 15,
  },
  card3: {
    color: '#19242C',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    paddingBottom: 6,
  },
  card1text: {
    color: '#19242C',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    paddingBottom: 6,
  },
  card1textt: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  card2: {
    backgroundColor: '#F9F9F9',
    width: 150,
    justifyContent: 'center',
    borderRadius: 12,
    height: 80,
    paddingLeft: 15,
  },
  card2text: {
    color: '#19242C',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    paddingBottom: 6,
  },
  card2textt: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },

  textview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 275,
    alignItems: 'center',
    height: 60,
  },
  text1: {
    color: '#19242C',
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
  },
  text2: {
    color: '#838FA0',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nunito-Medium',
  },
  text3: {
    color: '#EA8C00',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Nunito-Medium',
  },
  text4: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  flatlistview: {
    backgroundColor: 'red',
  },
  categoryview: {
    marginBottom: 20,
  },
  cardview: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  categorytxt: {
    color: '#19242C',
    // backgroundColor: '#F8F8F8',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  cardstyle: {
    flexDirection: 'row',

    alignItems: 'center',
  },
  cardday: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
    marginRight: 8,
  },
  cardnum: {
    color: '#EA8C00',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
  cardtext: {
    color: '#838FA0',
    fontSize: 14,
    fontFamily: 'Nunito-Medium',
  },
});
export default DealerReviews;
