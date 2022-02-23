import Config from 'react-native-config';

export const generateAudioUrl = audioId => {
  if (!audioId) {
    return null;
  }

  return Config.BASE_AUDIO_URL + '/' + audioId;
};
