import React, {useState} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

export default withAudioPlayer = Component => props => {
  const [paused, setPaused] = useState(true);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(
    new AudioRecorderPlayer(),
  );

  const dot = () => {
    console.log('do');
  };

  const onPlay = async () => {
    console.log('onStartPlay');

    var RNFS = require('react-native-fs');
    const path = '../../Audio/FirstItem.m4a';
    RNFS.writeFile('FirstItem.m4a', 'sasd').then(result => console.log(result));
    RNFS.mkdir();
    let r = await RNFS.readDir(RNFS.DocumentDirectoryPath); // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

    console.log('r', r);
    try {
      const msg = await audioRecorderPlayer.startPlayer();
      console.log('playing');
    } catch (error) {
      console.log('error', error);
    }

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

  const seek = time => {
    time = Math.round(time);
    audioRecorderPlayer.seekToPlayer(time);
    setPlayTime(time);
    setPaused(paused);
  };

  function printHewllo() {
    console.log('Hello');
  }

  return (
    <Component
      props={props}
      onPlay={onPlay}
      onSeek={seek}
      onPause={onPause}
      setPaused={setPaused}
      getPaused={() => paused}
      getDuration={() => duration}
      getPlayTime={() => playTime}
    />
  );
};
