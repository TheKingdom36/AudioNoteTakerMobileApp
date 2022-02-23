import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import store from '../Slices/store';

let audioRecorderPlayer;
let currentPath;
let currentCallback = () => {};
let currentPosition = 0;

const AUDIO_STATUS = {
  play: 'play',
  begin: 'begin',
  pause: 'pause',
  resume: 'resume',
  stop: 'stop',
};

async function startPlayer(path, callback) {
  console.log({currentPath, path});

  if (currentPath === undefined) {
    currentPath = path;
    currentCallback = callback;
  } else if (currentPath !== path) {
    if (audioRecorderPlayer !== undefined) {
      try {
        await stopPlayer();
      } catch (error) {
        console.log('ERROR STOP PLAYER TOP');
      }
    }
    currentPath = path;
    currentCallback = callback;
  }

  if (audioRecorderPlayer === undefined) {
    audioRecorderPlayer = new AudioRecorderPlayer();
  }

  try {
    await playAudio().catch(error => console.log('playAudio Error', error));

    currentCallback({
      status:
        currentPath === path && currentPosition > 0
          ? AUDIO_STATUS.resume
          : AUDIO_STATUS.begin,
    });
    audioRecorderPlayer.addPlayBackListener(async e => {
      if (e.current_position === e.duration) {
        try {
          await stopPlayer();
        } catch (error) {
          console.log('ERROR STOP PLAYER IN LISTENER');
        }
      } else {
        currentPosition = e.current_position;
        currentCallback({
          status: AUDIO_STATUS.play,
          data: e,
        });
      }
      return;
    });
  } catch (error) {
    console.log({'ERROR PLAY PLAYER': error});
  }
}

async function pausePlayer() {
  try {
    await audioRecorderPlayer.pausePlayer();
    currentCallback({status: AUDIO_STATUS.pause});
  } catch (error) {
    console.log({'ERROR PAUSE PLAYER': error});
  }
}

async function stopPlayer() {
  const isStop = await audioRecorderPlayer.stopPlayer();
  console.log({isStop});
  audioRecorderPlayer.removePlayBackListener();
  currentPosition = 0;
  currentCallback({status: AUDIO_STATUS.stop});
  audioRecorderPlayer = undefined;
}

async function seekPlayer(time) {
  audioRecorderPlayer.seekToPlayer(time);
}

async function playAudio() {
  var activePath;

  if (currentPath.slice(0, 4) === 'http') {
    //File on server
    let headers = {};

    let accessToken = store.getState().auth.accessToken;

    headers.Authorization = 'Bearer ' + accessToken;
    activePath = await audioRecorderPlayer.startPlayer(currentPath, headers);
  } else {
    //Local file
    activePath = await audioRecorderPlayer.startPlayer(currentPath);
  }
  console.log({activePath});
}

export {AUDIO_STATUS, startPlayer, stopPlayer, pausePlayer};
