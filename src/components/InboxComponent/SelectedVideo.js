import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {AppImages} from '../../components/AppImages';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
const SelectedVideo = ({route}) => {
  const navigation = useNavigation();
  const [itemIndex, SetitemIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoPlayer = useRef(null);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor={'transparent'}
        barStyle={'light-content'}
      />
      <View style={styles.watchview}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            width: 50,
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity>
            <Image style={{alignSelf: 'center'}} source={AppImages.leftarrow} />
          </TouchableOpacity>
          {/* <Text style={styles.watchname}>Rolex Z902 Boys.png</Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.imageview}>
        <TouchableOpacity
          // onPress={() => {
          //   setPaused(!paused);
          // }}
          style={{top: -40}}>
          <Video
            source={{
              uri: route.params.Video,
            }}
            resizeMode={'cover'}
            ref={videoPlayer}
            repeat={true}
            // onEnd={() => setPaused(true)}
            style={{
              position: 'relative',
              height: 330,
              width: 330,
              marginRight: 7,
              // borderRadius: 150 / 2,
              // borderWidth: 2,
              // borderColor: 'red',
              borderRadius: 10,
              backgroundColor: 'transparent',
              justifyContent: 'center',
            }}
            controls={true}
            // muted={true}
            volume={100}
            // resizeMode={"contain"}
            fullscreen={true}
            fullscreenAutorotate={true}
            paused={false}
          />
          {/* {paused ? (
            <Image
              style={{
                width: 30,
                height: 30,
                top: '-50%',
                alignSelf: 'center',
              }}
              source={AppImages.videoplay}
            />
          ) : null} */}
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#010101',
    flex: 1,
  },
  watchview: {
    flex: 1,
    height: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    // alignItems: 'center',
    // paddingTop: 50,
    // backgroundColor: 'red',
  },
  watchname: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    marginLeft: 15,
    color: '#FFF',
  },
  imageview: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'green',
    flex: 5,
  },
});
export default SelectedVideo;
