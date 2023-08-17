import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Video from 'react-native-video';

const Videos = () => {
  const Videolist = useSelector(state => state?.ChatMediaReducer?.data?.data);
  const [itemIndex, SetitemIndex] = useState(0);
  const [paused, setPaused] = useState(true);
  const videoPlayer = useRef(null);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.recentview}>
        {/* <Text style={styles.recenttxt}>Recent</Text> */}
        <FlatList
          data={Videolist}
          horizontal
          renderItem={({item, index}) => {
            return (
              <View style={styles.recent1}>
                <TouchableOpacity
                  onPress={() => {
                    // setPaused(!paused);
                    // SetitemIndex(index);
                    navigation.navigate('SelectedVideo', {
                      Video: item.message,
                    });
                  }}
                  style={styles.category4}>
                  <Video
                    source={{
                      uri: item.message,
                    }}
                    resizeMode={'cover'}
                    ref={videoPlayer}
                    // repeat={true}
                    style={{
                      position: 'relative',
                      height: 140,
                      width: 140,
                      marginRight: 7,

                      borderRadius: 10,
                      backgroundColor: '#000000',
                      justifyContent: 'center',
                    }}
                    controls={false}
                    // volume={100}
                    fullscreen={false}
                    // fullscreenAutorotate={true}
                    paused={true}
                  />
                </TouchableOpacity>
                {index == itemIndex ? (
                  paused ? (
                    <Image
                      style={{
                        width: 30,
                        height: 30,
                        top: '-50%',

                        alignSelf: 'center',
                      }}
                      source={AppImages.videoplay}
                    />
                  ) : null
                ) : (
                  <Image
                    style={{
                      width: 30,
                      height: 30,
                      top: '-50%',

                      alignSelf: 'center',
                    }}
                    source={AppImages.videoplay}
                  />
                )}
              </View>
            );
          }}
        />
      </View>
      {/* <View style={{paddingHorizontal: 20}}>
          <Text style={styles.lastweektxt}>Last Week</Text>
          <FlatList
            data={lastweek}
            numColumns={3}
            renderItem={({item}) => {
              return (
                <View style={styles.lastweek1}>
                  <TouchableOpacity>
                    <Image source={item.image}></Image>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <Text style={styles.lastweektxt}>Last Month</Text>
          <FlatList
            data={lastmonth}
            numColumns={3}
            renderItem={({item}) => {
              return (
                <View style={styles.lastweek1}>
                  <TouchableOpacity>
                    <Image source={item.image}></Image>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View> */}
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
    // width: 140,
    // height: 140,
    // marginRight: 5,
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderRadius: 10,
    // // borderWidth:1,
    // borderColor: '#EAECF0',
    // backgroundColor: 'red',
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
export default Videos;
