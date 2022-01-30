import React, {useState} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import base64 from 'base-64';
//https://github.com/hyochan/react-native-audio-recorder-player/issues/130
const withAudioPlayer = Component => props => {
  const [paused, setPaused] = useState(true);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [audioRecorderPlayer, setAudioRecorderPlayer] = useState(
    () => new AudioRecorderPlayer(),
  );

  const onPlay = async () => {
    if (paused === false) {
      audioRecorderPlayer.stopPlayer();
    }

    console.log('onStartPlay', props.audioUrl);

    /*var RNFS = require('react-native-fs');
    const path = '../../Audio/FirstItem.m4a';
    RNFS.writeFile('FirstItem.m4a', 'sasd').then(result => console.log(result));
    RNFS.mkdir();
    let r = await RNFS.readDir(RNFS.DocumentDirectoryPath); // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
*/

    const buf = 'Sanson3@gmail.com' + ':' + 'hcgEynqjHczk';
    let headers = {};

    headers.Authorization = 'Basic ' + base64.encode(buf);

    try {
      const msg = await audioRecorderPlayer.startPlayer(
        'http://localhost:9999/recordings/37',
        headers,
      );
      console.log('msg', msg);
    } catch (error) {
      console.log('error', error);
    }

    audioRecorderPlayer.setVolume(1.0);

    setPaused(false);

    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition === e.duration) {
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

  const onSeek = time => {
    time = Math.round(time);
    audioRecorderPlayer.seekToPlayer(time);
    setPlayTime(time);
    setPaused(paused);
  };

  return (
    <Component
      props={props}
      onPlay={onPlay}
      onSeek={onSeek}
      onPause={onPause}
      setPaused={setPaused}
      getPaused={() => paused}
      getDuration={() => duration}
      getPlayTime={() => playTime}
    />
  );
};

export default withAudioPlayer;
