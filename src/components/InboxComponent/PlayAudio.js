import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import {AppImages} from '../AppImages';
import RecordingWave from './Waves';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import moment from 'moment';
const audioRecorderPlayer = new AudioRecorderPlayer();

export default function PlayAudio({item, setState, state, status}) {
  const [duration, setDuration] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [playTime, setPlayTime] = useState(null);

  const onPlayAudio = async (item, id) => {
    if (state.isPlaying) {
      await audioRecorderPlayer.stopPlayer();
      audioRecorderPlayer.removePlayBackListener();
      setDuration(0);
      setCurrentPosition(0);
    }
    setState(preState => ({
      ...preState,
      isSelectedPlayId: id,
      isPlaying: true,
    }));
    try {
      await audioRecorderPlayer.startPlayer(item);
    } catch (err) {
      console.log(err);
    }
    audioRecorderPlayer.addPlayBackListener(e => {
      setDuration(e.duration);
      setCurrentPosition(e.currentPosition);
      const seconds = Math.floor(e.currentPosition / 1000);
      setPlayTime(seconds);
      if (e.currentPosition > 0) {
        if (e.currentPosition === e.duration) {
          setState(preState => ({...preState, isPlaying: false}));
        }
      } else {
        console.log('no position');
      }
      return;
    });
  };

  const onStopAudio = async item => {
    await audioRecorderPlayer.pausePlayer(item);
    setState(preState => ({...preState, isPlaying: false}));
  };

  const formatDuration = durationInSeconds => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <View key={item.id} style={styles.audioContainer}>
      <View style={styles.audioRow}>
        {state.isSelectedPlayId == item.id && state.isPlaying ? (
          <TouchableOpacity onPress={() => onStopAudio(item.message)}>
            <Image
              source={AppImages.audiocircle}
              style={[
                styles.audioIcon,
                {
                  tintColor: status == 'recive' ? '#838FA0' : '#FFF',
                },
              ]}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onPlayAudio(item.message, item.id)}>
            <Image
              source={AppImages.playicon}
              style={[
                styles.audioIcon,
                {
                  tintColor: status == 'recive' ? '#838FA0' : '#FFF',
                },
              ]}
            />
          </TouchableOpacity>
        )}
        <RecordingWave
          currentduration={currentPosition}
          duration={duration}
          isSelected={state.isSelectedPlayId == item.id}
          isPlaying={state.isPlaying}
          status={status}
        />
        <Text
          style={[
            styles.audioDuration,
            {
              color: status == 'recive' ? '#838FA0' : '#FFF',
            },
          ]}>
          {state.isSelectedPlayId == item.id && state.isPlaying
            ? formatDuration(playTime)
            : formatDuration(item.duration)}
        </Text>
      </View>
      <View style={{paddingHorizontal: 3}}>
        <Text
          style={[
            styles.audioTime,
            {
              color: status == 'recive' ? '#838FA0' : '#FFF',
            },
          ]}>
          {moment(item.created_at).format('LT')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  audioContainer: {
    borderRadius: 8,
    // backgroundColor: '#EA8C00',
    width: '100%',
    alignSelf: 'flex-end',
    marginVertical: 4,
    height: 55,
    justifyContent: 'center',
    padding: 5,
  },
  audioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '99%',
    // backgroundColor: 'red',
  },
  audioIcon: {
    width: 22,
    height: 22,
    tintColor: '#FFFFFF',
  },
  audioDuration: {
    alignItems: 'center',
    // color: '#fff',
    fontSize: 12,
    fontFamily: 'Nunito-Medium',
    marginLeft: 7,
    width: '15%',
  },
  audioTime: {
    color: '#fff',
    alignSelf: 'flex-end',
    fontSize: 8,
    fontWeight: '400',
    fontFamily: 'Nunito-Medium',
    width: '25%',
    // backgroundColor: 'red',
    left: 14,
  },
});
