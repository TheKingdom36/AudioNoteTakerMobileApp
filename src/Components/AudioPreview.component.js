import React from 'react';
import {View, Text, StatusBar, Pressable} from 'react-native';
import AudioProgressBar from './PlayerProgressBar.component';
import Controls from './PlayerControls.component.';
import {useSelector} from 'react-redux';
import LabeledText from '../Elements/LabeledText';
import {ScreenNames} from '../Screens/MainNavigator';
import {useNavigation} from '@react-navigation/native';
import AudioPlayer from './Player.component';
import {Colors} from '../Utils/Colors';

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
      <AudioPlayer audioUrl={props.audioUrl} style={styles.audioPlayer} />

      <View style={[styles.infoSec]}>
        <Text>{audioInfo.name}</Text>
      </View>
    </Pressable>
  );
};

const styles = {
  container: {
    flex: 1,
    margin: 5,
    padding: 6,
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
    margin: 5,
    padding: 6,
    borderRadius: 50,
  },

  audioElement: {
    height: 0,
    width: 0,
  },
  infoSec: {
    flex: 1,
    alignItems: 'center',
  },
  allRoom: {
    flex: 1,
  },
};

export default AudioPreview;
