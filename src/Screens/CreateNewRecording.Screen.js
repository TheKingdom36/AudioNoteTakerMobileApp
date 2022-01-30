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

const CreateNewRecordingScreen = ({navigation}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasActiveRecording, setHasActiveRecording] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [recordSecs, setRecordSecs] = useState(0);

  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(
    new AudioRecorderPlayer(),
  );

  const onStartRecord = async () => {
    if (hasActiveRecording === true) {
      audioRecorderPlayer.resumeRecorder();
      const uri = await audioRecorderPlayer.resumeRecorder();
    } else {
      RequestRecordPermissions();

      var RNFS = require('react-native-fs');

      const path = RNFS.DocumentDirectoryPath + '/' + 'temp.m4a';

      const audioSet = {
        AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
        AudioSourceAndroid: AudioSourceAndroidType.MIC,
        AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
        AVNumberOfChannelsKeyIOS: 2,
        AVFormatIDKeyIOS: AVEncodingOption.aac,
      };

      const uri = await audioRecorderPlayer.startRecorder(path, audioSet);

      audioRecorderPlayer.addRecordBackListener(e => {
        setRecordSecs(e.currentPosition);
        setRecordTime(
          audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        );
      });

      setHasActiveRecording(true);
    }

    setIsRecording(true);
  };

  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();

    audioRecorderPlayer.removeRecordBackListener();

    setRecordSecs(0);

    setIsRecording(false);

    var RNFS = require('react-native-fs');

    const path = RNFS.DocumentDirectoryPath + '/temp.m4a';

    setHasActiveRecording(false);

    navigation.navigate(ScreenNames.ConfirmNewRecording, {path: path});
  };

  const onPauseRecord = async () => {
    setIsRecording(false);
    audioRecorderPlayer.pauseRecorder();
  };

  const onCancel = async () => {
    setIsRecording(false);
    navigation.navigate(ScreenNames.Home);
  };

  return (
    <View style={[styles.contianer]}>
      <View style={[styles.recordImage]}>
        {isRecording === true ? (
          <Pressable onPress={() => onPauseRecord()}>
            <MaterialCommunityIcons name="record" size={60} />
          </Pressable>
        ) : (
          <Pressable onPress={() => onStartRecord()}>
            <MaterialCommunityIcons name="record-rec" size={100} />
          </Pressable>
        )}
      </View>

      <View style={[styles.recordingValues]}>
        <Text>RecordTime</Text>
        <Text style={[styles.recordTimeText]}>{recordTime}</Text>
      </View>

      <ButtonGroup style={[styles.bottomButtons]}>
        <Button
          style={[styles.btn]}
          onPress={() => onCancel()}
          status={'basic'}>
          <Text>Cancel</Text>
        </Button>
        <Button
          style={[styles.btn]}
          onPress={() => onStopRecord()}
          status={'basic'}>
          <Text>Finish</Text>
        </Button>
      </ButtonGroup>
    </View>
  );
};

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  recordImage: {
    height: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 5,
    borderBottomWidth: 5,
    backgroundColor: Colors.secondaryColor,
  },
  recordingValues: {
    height: '40%',
    marginTop: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 5,
    borderBottomWidth: 5,
    backgroundColor: Colors.secondaryColor,
  },
  bottomButtons: {
    height: '10%',
    marginTop: 'auto',
  },

  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordTimeText: {
    fontSize: 50,
  },
});
export default CreateNewRecordingScreen;
