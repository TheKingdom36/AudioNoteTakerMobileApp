import React from 'react';
import {View} from 'react-native';
import AudioProgressBar from './PlayerProgressBar.component';
import Controls from './PlayerControls.component.';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

import withAudioPlayer from './withAudioPlayer';

const AudioPlayer = ({
  props,
  onPlay,
  onPause,
  onSeek,
  setPaused,
  paused,
  duration,
  playTime,
}) => {
  /*const audioInfo = useSelector(state => {
    return state.audioRecs.values.find(element => element.id === props.audioId);
  });*/

  const navigation = useNavigation();

  const Duration = () => {
    return duration;
  };

  const PlayTime = () => {
    if (isNaN(playTime)) {
      return 0;
    }

    return playTime;
  };

  return (
    <View style={props.style}>
      {/* <StatusBar hidden={true} /> */}
      {/* <Header message="Playing From Charts" /> */}

      {/*Need to pass in the audio path to play*/}
      <Controls onPressPlay={onPlay} onPressPause={onPause} paused={paused} />

      <AudioProgressBar
        onSeek={onSeek}
        trackLength={Duration()}
        onSlidingStart={setPaused(paused)}
        currentPosition={PlayTime()}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
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
