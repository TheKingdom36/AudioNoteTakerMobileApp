import React, {Component, useState} from 'react';
import {View, Text, StatusBar, Pressable} from 'react-native';
import AudioProgressBar from './PlayerProgressBar.component';
import Controls from './PlayerControls.component.';
import {useSelector} from 'react-redux';
import LabeledText from '../Elements/LabeledText';
import {ScreenNames} from '../Screens/MainNavigator';
import {useNavigation} from '@react-navigation/native';
import withAudioPlayer from './withAudioPlayer';

const AudioPlayer = ({
  props,
  onPlay,
  onPause,
  onSeek,
  getPaused,
  getDuration,
  getPlayTime,
}) => {
  /*const audioInfo = useSelector(state => {
    return state.audioRecs.values.find(element => element.id === props.audioId);
  });*/

  const audioUrl = props.audioUrl;

  const navigation = useNavigation();

  /*var containerStyle;
  if (props.containerStyle == null) {
    containerStyle = styles.container;
  } else {
    containerStyle = props.containerStyle;
  }*/

  return (
    <View style={props.style}>
      {/* <StatusBar hidden={true} /> */}
      {/* <Header message="Playing From Charts" /> */}

      {/*Need to pass in the audio path to play*/}
      <Controls
        onPressPlay={onPlay}
        onPressPause={onPause}
        paused={getPaused()}
      />

      {/*
        <AudioProgressBar
          onSeek={onSeek}
          trackLength={() => getDuration()}
          onSlidingStart={() => setPaused(getPaused())}
          currentPosition={() => getPlayTime()}
        />*/}
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    margin: 5,
    padding: 6,
    borderRadius: 50,
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  allRoom: {
    flex: 1,
  },
};

export default withAudioPlayer(AudioPlayer);
