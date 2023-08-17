import React, {useState, useEffect} from 'react';
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
import Photos from './Photos';
import {useDispatch, useSelector} from 'react-redux';
import {ChatMedia} from '../../redux/action/chatapi';
import Videos from './Videos';
import MediaDocument from './MediaDocument';
import MediaLink from './MediaLink';
import {chatmediasuccess} from '../../redux/type';
const Media = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState(0);
  //   const [mediaType, setMediaType] = useState('photos');
  const category = [
    {name: 'Photos'},
    {name: 'Videos'},
    {name: 'Links'},

    {name: 'Documents'},
  ];

  useEffect(() => {
    Mediachat(0);
  }, []);

  const Mediachat = index => {
    dispatch({
      type: chatmediasuccess,
      data: null,
    });

    let mediaType;
    setSelectedItem(index);
    if (index == 0) {
      mediaType = 'photos';
    } else if (index == 1) {
      mediaType = 'videos';
    } else if (index == 2) {
      mediaType = 'link';
    } else if (index == 3) {
      mediaType = 'pdf';
    }
    let params = 'id=' + route?.params?.userId + '&keyword=' + mediaType;
    dispatch(ChatMedia(params));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={AppImages.arrowback} style={{width: 24, height: 24}} />
        </TouchableOpacity>
        <Text style={styles.headertxt}>Media</Text>
      </View>
      <View style={styles.flatlistview}>
        <FlatList
          data={category}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({item, index}) => {
            let destinationScreen = '';

            if (index === 0) {
              destinationScreen = 'Media';
            } else if (index === 1) {
              destinationScreen = 'Vedio';
            } else if (index === 2) {
              destinationScreen = 'Link';
            } else if (index === 3) {
              destinationScreen = 'Documents';
            }
            return (
              <View style={styles.categoryview}>
                <TouchableOpacity
                  disabled={index == selectedItem ? true : false}
                  onPress={() => Mediachat(index)}>
                  <Text
                    style={[
                      styles.categorytxt,
                      {
                        backgroundColor:
                          index == selectedItem ? '#EA8C00' : '#F8F8F8',
                        color: index == selectedItem ? '#FFF' : '#19242C',
                      },
                    ]}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      {selectedItem == 0 ? (
        <Photos />
      ) : selectedItem == 1 ? (
        <Videos />
      ) : selectedItem == 3 ? (
        <MediaDocument />
      ) : selectedItem == 2 ? (
        <MediaLink />
      ) : null}
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
    width: 107,
    height: 107,
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
  blockchatview: {
    height: '37%',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  blockChatt: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
  },
  blockChattimg: {
    width: 40,
    height: 40,
    marginBottom: 15,
    // tintColor: 'black'
  },
  blockChattheading: {
    color: '#19242C',
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
  },
  blockChatttext: {
    color: '#838FA0',
    fontSize: 11,
    fontFamily: 'Nunito-Medium',
    paddingTop: 15,
    textAlign: 'center',
  },
  blockChattbtnview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 10,
  },
  blockChattbtn: {
    borderWidth: 1,
    borderColor: '#19242C',
    width: 125,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blockChattbtntext: {
    color: '#19242C',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
  blockChattbtn2: {
    width: 125,
    height: 45,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  blockChattbtn2text: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
  },
});
export default Media;
