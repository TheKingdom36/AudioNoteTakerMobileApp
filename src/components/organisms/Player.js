import React, {Component, useState} from 'react';
import {View, Text, StatusBar, Pressable} from 'react-native';
import AudioProgressBar from './AudioProgressBar';
import Controls from './Controls';
import {useSelector} from 'react-redux';
import LabeledText from '../atoms/LabeledText';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import {ScreenNames} from '../Screens/Navigators';
import {useNavigation} from '@react-navigation/native';
import withAudioPlayer from './withAudioPlayer';
import {Button} from '@ui-kitten/components';
const Player = ({
  props,
  onPlay,
  onPause,
  onSeek,
  getPaused,
  getDuration,
  getPlayTime,
}) => {
  /*
  const [paused, setPaused] = useState(true);
  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(
    new AudioRecorderPlayer(),
  );

  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const seek = time => {
    time = Math.round(time);
    audioRecorderPlayer.seekToPlayer(time);
    setPlayTime(time);
    setPaused(paused);
  };

  const onPlay = async e => {
    console.log('onStartPlay');

    var RNFS = require('react-native-fs');
    const path = '../../Audio/FirstItem.m4a';
    RNFS.writeFile('FirstItem.m4a', 'sasd').then(result => console.log(result));
    RNFS.mkdir();
    let r = await RNFS.readDir(RNFS.DocumentDirectoryPath); // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

    console.log('r', r);
    const msg = await audioRecorderPlayer.startPlayer(r[1].path);
    audioRecorderPlayer.setVolume(1.0);

    setPaused(false);

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

  const onPause = async e => {
    setPaused(true);
    audioRecorderPlayer.pausePlayer();
  };
*/
  const audioInfo = useSelector(state => {
    return state.audioRecs.values.find(element => element.id == props.audioId);
  });

  const navigation = useNavigation();

  const navToAudioInfoScreen = () => {
    navigation.navigate(ScreenNames.RecordingInfo, {audioId: props.audioId});
  };

  function thfuc() {
    navigation.navigate('NewRecording');
  }

  console.log('props', props);

  return (
    <View style={styles.container}>
      <Pressable onPress={navToAudioInfoScreen} style={styles.allRoom}>
        {/* <StatusBar hidden={true} /> */}
        {/* <Header message="Playing From Charts" /> */}

        <Button
          onPress={() => {
            onPlay();
          }}>
          Hello
        </Button>
        {/*Need to pass in the audio path to play*/}
        <Controls
          onPressPlay={onPlay}
          onPressPause={onPause}
          paused={getPaused}
        />

        {/*
        <AudioProgressBar
          onSeek={onSeek}
          trackLength={() => getDuration()}
          onSlidingStart={() => setPaused(getPaused())}
          currentPosition={() => getPlayTime()}
        />
*/}
        <View style={[styles.infoSec]}>
          <LabeledText label={'Title'} text={<Text>{audioInfo.title}</Text>} />
          <LabeledText
            label={'Created'}
            text={<Text>{audioInfo.createdAt}</Text>}
          />
          <LabeledText
            text={<Text>{audioInfo.length}</Text>}
            label={'Length'}
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    margin: 5,
    padding: 6,
    width: 180,
    height: 200,
    borderRadius: 50,
    backgroundColor: '#FFA500',
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  infoSec: {
    flex: 1,

    paddingLeft: 10,
    paddingTop: 10,
  },
  allRoom: {
    flex: 1,
  },
};

export default withAudioPlayer(Player);
