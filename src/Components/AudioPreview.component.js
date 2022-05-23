import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {ScreenNames} from '../Screens/MainNavigator';
import {useNavigation} from '@react-navigation/native';
import AudioPlayer from './Player.component';
import {Colors} from '../Utils/Colors';
import {generateAudioUrl} from '../Utils/AudioURLUtils';

const AudioPreview = props => {
  const audioInfo = useSelector(state => {
    return state.audioRecs.values.find(element => element.id === props.audioId);
  });

  const navigation = useNavigation();

  const navToAudioInfoScreen = () => {
    navigation.navigate(ScreenNames.AudioInfo, {audioId: props.audioId});
  };

  return (
    <Pressable onPress={navToAudioInfoScreen} style={styles.container}>
      <View style={[styles.infoSec]}>
        <Text>{audioInfo.name}</Text>
      </View>

      <AudioPlayer
        audioUrl={generateAudioUrl(props.audioId)}
        audioId={props.audioId}
        style={styles.audioPlayer}
      />
    </Pressable>
  );
};

const styles = {
  container: {
    flex: 1,
    margin: 5,
    padding: 5,
    paddingTop: 15,
    borderRadius: 30,
    backgroundColor: Colors.secondaryColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 8,
    elevation: 6,
  },

  audioPlayer: {
    flex: 2,
  },

  audioElement: {
    height: 0,
    width: 0,
  },
  infoSec: {
    alignItems: 'center',
  },
  allRoom: {
    flex: 1,
  },
};

export default AudioPreview;
