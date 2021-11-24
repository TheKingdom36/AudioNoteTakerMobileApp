import React, {useEffect, useState} from 'react';
import {View, Pressable, StyleSheet, Image} from 'react-native';
import {Text, Button, ButtonGroup} from '@ui-kitten/components';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {TextInput} from 'react-native-gesture-handler';
import {ScreenNames} from './Navigators';
import {CreateNewRecording} from '../../scripts/AudioRequests';
import {Colors} from '../../colors';

const ConfirmNewRecordingScreen = ({audioId, navigation, route}) => {
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState('00:00:00');
  const [duration, setDuration] = useState('00:00:00');
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(
    new AudioRecorderPlayer(),
  );

  const [title, setTitle] = useState('');
  const [describtion, setDescribtion] = useState('');
  const [tags, setTags] = useState([]);

  const onStartPlay = async e => {
    console.log('onStartPlay');

    const msg = await audioRecorderPlayer.startPlayer(route.params.path);
    audioRecorderPlayer.setVolume(1.0);
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer();
      }

      setCurrentPositionSec(e.currentPosition);
      setCurrentDurationSec(e.duration);
      setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
    });
  };

  const onConfrim = () => {
    let audioData = {
      title: title,
      describtion: describtion,
      tags: tags,
    };

    CreateNewRecording(route.params.path, audioData);

    navigation.navigate(ScreenNames.Home);
  };

  const onCancel = () => {
    navigation.navigate(ScreenNames.Home);
  };

  return (
    <View style={{flex: 1}}>
      <Text>{route.params.data}</Text>
      <View style={[styles.recordImage]}>
        {isPlaying === true ? (
          <Pressable onPress={() => onPausePlay()}>
            <Image source={require('../../img/resizedSmallSearchIcon.png')} />
          </Pressable>
        ) : (
          <Pressable onPress={() => onStartPlay()}>
            <Image source={require('../../img/recordIcon.jpg')} />
          </Pressable>
        )}
      </View>

      <Text>
        {playTime}/{duration}
      </Text>

      <TextInput onChangeText={setTitle} value={title} placeholder="title..." />
      <TextInput
        onChangeText={setDescribtion}
        value={describtion}
        placeholder="describtion..."
      />
      <Text>Tags</Text>

      <ButtonGroup style={[styles.bottomButtons]}>
        <Button
          style={[styles.btn]}
          onPress={() => onCancel()}
          status={'basic'}>
          <Text>Cancel</Text>
        </Button>
        <Button
          style={[styles.btn]}
          onPress={() => onConfrim()}
          status={'basic'}>
          <Text>Confirm</Text>
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
export default ConfirmNewRecordingScreen;
