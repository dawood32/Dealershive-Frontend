import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AVEncodingOption,
  AudioSourceAndroidType,
  AVModeIOSOption,
  AVEncoderAudioQualityIOSType,
} from 'react-native-audio-recorder-player';
import {AppImages} from '../AppImages';
import {Uploadtobucket} from './Uploastobucket';
import RecordingWave from './Waves';
class Audios extends Component {
  constructor(props) {
    super(props);
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.state = {
      isRecording: false,
      isPlaying: false,
      recordSecs: 0,
      recordTime: '00:00',
      currentPositionSec: 0,
      currentDurationSec: 0,
      playTime: '00:00',
      duration: '00:00',
      files: '',
      isPusedRecoding: false,
    };
  }
  componentDidMount() {
    this.onStartRecord(); // Start recording automatically when the component is mounted
  }
  componentWillUnmount() {
    this.onStopRecord(); // Stop recording when the component is unmounted
    this.files = '';
  }
  onStartRecord = async () => {
    try {
      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVModeIOS: AVModeIOSOption.measurement,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };
      this.files = await this.audioRecorderPlayer.startRecorder(
        undefined, // Passing undefined will use the default path for saving the recording.
        audioSet,
        false, // meteringEnabled
      );
      this.audioRecorderPlayer.addRecordBackListener(e => {
        const seconds = Math.floor(e.currentPosition / 1000); // Convert to seconds
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        this.setState({
          recordSecs: seconds,
          recordTime: `${this.padNumber(minutes)}:${this.padNumber(
            remainingSeconds,
          )}`,
        });
      });
      this.setState({isRecording: true});
    } catch (error) {
      console.log('Error starting recording:', error);
    }
  };
  onStopRecord = async () => {
    try {
      this.files = await this.audioRecorderPlayer.stopRecorder();
      this.audioRecorderPlayer.removeRecordBackListener();
      this.setState({
        isRecording: false,
      });
      console.log('Recording result:', this.files);
    } catch (error) {
      console.log('Error stopping recording:', error);
    }
  };
  padNumber = number => {
    return number.toString().padStart(2, '0');
  };
  onSendFile = async () => {
    // Call the function to upload the audio to AWS S3
    try {
      this.files = await this.audioRecorderPlayer.stopRecorder();
      this.audioRecorderPlayer.removeRecordBackListener();
      this.setState({
        isRecording: false,
      });
      Uploadtobucket(
        this.files,
        'audio',
        this.props.sendmesgfunc,
        this.state.recordSecs,
      );
    } catch (error) {
      console.log('Error stopping playback:', error);
    }
  };
  onPauseRecoding = async () => {
    await this.audioRecorderPlayer.pauseRecorder();
    this.setState({
      isPusedRecoding: true,
    });
  };
  onResumeRecorder = async () => {
    await this.audioRecorderPlayer.resumeRecorder();
    this.setState({
      isPusedRecoding: false,
    });
  };
  render() {
    const {recordTime, playTime} = this.state;
    return (
      <>
        {/* Recording Controls */}

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            // height: '8%',
            borderWidth: 1,
            borderRadius: 10,
            borderColor: 'gray',
            marginBottom: 40,
            justifyContent: 'space-between',
            paddingHorizontal: 13,
            paddingVertical: 5,
            // backgroundColor: 'green',
            // bottom: 20,
          }}>
          <View>
            <Text>{recordTime}</Text>
            {/* <RecordingWave  /> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              // backgroundColor: 'red',
            }}>
            <TouchableOpacity onPress={() => this.props.setIsPlaying(false)}>
              <Image
                source={AppImages.delete}
                style={{height: 24, width: 24, tintColor: 'grey'}}
              />
            </TouchableOpacity>
            {this.state.isPusedRecoding ? (
              <TouchableOpacity onPress={this.onResumeRecorder}>
                <Image
                  source={AppImages.stoprecording}
                  style={{height: 24, width: 24}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={this.onPauseRecoding}>
                <Image
                  source={AppImages.audiocircle}
                  style={{height: 24, width: 24}}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                this.onSendFile();
                this.props.setIsPlaying(false);
              }}>
              <Image source={AppImages.sentt} style={{height: 36, width: 36}} />
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}
export default Audios;
