import React, {useState} from 'react';
import {View, Pressable, StyleSheet} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import {RequestRecordPermissions} from '../Utils/PermissionRequests';
import {ScreenNames} from './MainNavigator';
import {Text, Button, ButtonGroup} from '@ui-kitten/components';
import {Colors} from '../Utils/Colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

let audioRecorderPlayer = new AudioRecorderPlayer();

const CreateNewRecordingScreen = ({navigation}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasActiveRecording, setHasActiveRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [uri, setUri] = useState('');

  const recordListener = e => {
    setRecordTime(audioRecorderPlayer.mmssss(e.currentPosition));
  };

  const onStartRecord = async () => {
    if (hasActiveRecording === true) {
      audioRecorderPlayer.resumeRecorder();
    } else {
      RequestRecordPermissions();

      var RNFS = require('react-native-fs');

      const path = RNFS.DocumentDirectoryPath + '/' + 'temp';

      let exists = await RNFS.exists(path);

      if (exists) {
        // exists call delete
        await RNFS.unlink(path);
      }

      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.DEFAULT,
        AudioSourceAndroid: AudioSourceAndroidType.DEFAULT,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };

      const uri = await audioRecorderPlayer.startRecorder(path, audioSet);
      console.log('uri', uri);
      setUri(uri);
      audioRecorderPlayer.addRecordBackListener(recordListener);

      setHasActiveRecording(true);
    }

    setIsRecording(true);
  };

  const onStopRecord = async () => {
    setIsRecording(false);
    const result = await audioRecorderPlayer.pauseRecorder();

    navigation.navigate(ScreenNames.ConfirmNewRecording, {path: uri});
  };

  const onPauseRecord = async () => {
    let msg = await audioRecorderPlayer.pauseRecorder();
    setIsRecording(false);
  };

  const onReset = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();

    setIsRecording(false);
    setRecordTime('00:00:00');
    setHasActiveRecording(false);
    console.log('result', result);
  };

  const PauseIcon = props => (
    <MaterialCommunityIcons name="pause" color={'black'} size={60} />
  );

  return (
    <View style={[styles.contianer]}>
      <View style={[styles.recordingSection]}>
        <View style={[styles.recordButtonSection]}>
          {isRecording ? (
            <Button
              onPress={onPauseRecord}
              style={styles.recordButton}
              accessoryRight={PauseIcon}
              size={'giant'}
            />
          ) : (
            <Button
              onPress={onStartRecord}
              appearance={'outline'}
              style={styles.recordButton}
              size={'giant'}>
              {recordTime === '00:00:00' ? (
                <Text>Record</Text>
              ) : (
                <Text>Continue</Text>
              )}
            </Button>
          )}
        </View>
        <View style={[styles.recordingValues]}>
          <Text style={[styles.recordTimeLabel]}>RecordTime</Text>
          <Text style={[styles.recordTimeText]}>{recordTime}</Text>
        </View>

        <ButtonGroup
          style={[styles.bottomButtons]}
          status={hasActiveRecording ? 'info' : 'danger'}>
          <Button style={[styles.btn]} onPress={onReset}>
            <Text>Reset</Text>
          </Button>

          <Button
            style={[styles.btn]}
            onPress={hasActiveRecording ? onStopRecord : null}>
            <Text>Finish</Text>
          </Button>
        </ButtonGroup>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.secondaryColor,
  },
  recordingSection: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'white',
  },

  recordButtonSection: {
    flex: 3,
    justifyContent: 'center',
  },

  recordButton: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    padding: 10,
    borderRadius: 100,
  },
  bottomButtons: {
    borderRadius: 20,
    margin: 20,
  },

  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  recordingValues: {
    flex: 1,
    alignSelf: 'center',
  },
  recordTimeText: {
    fontSize: 40,
  },
  recordTimeLabel: {
    fontSize: 20,
    alignSelf: 'flex-start',
  },
});
export default CreateNewRecordingScreen;
