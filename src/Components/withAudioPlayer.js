import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import * as AudioManager from '../Utils/AudioManager';
import {v4 as uuid} from 'uuid';
import {addAudioPlayer, updateAudioPlayer} from '../Slices/AudioPlayerSlice';

//https://github.com/hyochan/react-native-audio-recorder-player/issues/130

const withAudioPlayer = Component => props => {
  const audioInfo = useSelector(state => {
    return state.audioRecs.values.find(element => element.id === props.audioId);
  });

  const accessToken = useSelector(state => {
    return state.auth.accessToken;
  });
  let audioPlayerState = useSelector(state => {
    return state.audioPlayer.values.find(element => element.id === uniqueId);
  });
  const [paused, setPaused] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currentPositionSec, setCurrentPositionSec] = useState(0);
  const [currentDurationSec, setCurrentDurationSec] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const dispatch = useDispatch();
  const [uniqueId, setUniqueId] = useState(uuid());

  useEffect(() => {
    if (audioPlayerState == null) {
      dispatch(addAudioPlayer({id: uniqueId, paused: true, playing: false}));
    } else {
      if (audioPlayerState.paused) {
        onPause();
      }
    }

    if (audioInfo !== undefined) {
      if (audioInfo.hasOwnProperty('length')) {
        setDuration(audioInfo.length);
      }
    }
  }, []);

  const onPlay = async () => {
    const audioUrl = props.audioUrl;
    await AudioManager.startPlayer(audioUrl, res => {
      const {status} = res;
      switch (status) {
        case AudioManager.AUDIO_STATUS.begin: {
          console.log('BEGIN AUDIO');
          dispatch(
            updateAudioPlayer({id: uniqueId, paused: false, playing: true}),
          );
          setPaused(false);
          break;
        }
        case AudioManager.AUDIO_STATUS.play: {
          const {current_position, dur} = res.data;

          setDuration(dur);
          setPlayTime(current_position);
          break;
        }
        case AudioManager.AUDIO_STATUS.pause: {
          console.log('PAUSE AUDIO');
          dispatch(
            updateAudioPlayer({id: uniqueId, paused: true, playing: true}),
          );
          setPaused(true);
          break;
        }
        case AudioManager.AUDIO_STATUS.resume: {
          console.log('RESUME AUDIO');
          dispatch(
            updateAudioPlayer({id: uniqueId, paused: false, playing: true}),
          );
          setPaused(false);

          break;
        }
        case AudioManager.AUDIO_STATUS.stop: {
          console.log('STOP AUDIO');
          dispatch(
            updateAudioPlayer({id: uniqueId, paused: true, playing: false}),
          );
          setPaused(true);

          break;
        }
      }
    });
  };

  const onPause = async e => {
    AudioManager.pausePlayer();
  };

  const onSeek = time => {
    time = Math.round(time);
    AudioManager.seekPlayer(time);
  };

  return (
    <Component
      props={props}
      onPlay={onPlay}
      onSeek={onSeek}
      onPause={onPause}
      setPaused={setPaused}
      paused={paused}
      duration={duration}
      playTime={playTime}
    />
  );
};

export default withAudioPlayer;
