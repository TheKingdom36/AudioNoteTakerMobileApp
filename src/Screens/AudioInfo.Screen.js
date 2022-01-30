import React from 'react';
import {ScrollView, Pressable} from 'react-native';
import {StyleService, Text, useStyleSheet} from '@ui-kitten/components';
import {Colors} from '../Utils/Colors';
import AudioDetails from '../Components/AudioDetails.component';
import TranscribeCard from '../Components/TranscribeAudio.component';
import {useSelector} from 'react-redux';
import AudioPlayer from '../Components/Player.component';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScreenNames} from './MainNavigator';

const AudioInfo = ({route, navigation}) => {
  const styles = useStyleSheet(themedStyles);

  const audioInfo = useSelector(state => {
    return state.audioRecs.values.find(
      element => element.id === route.params.audioId,
    );
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Pressable
        style={styles.cancel}
        onPress={() => navigation.navigate(ScreenNames.Home)}>
        <Entypo name="cross" size={50} />
      </Pressable>
      <Text style={styles.titleText} category="h1">
        {audioInfo.name}
      </Text>
      <AudioPlayer
        style={styles.audioPlayerControls}
        audioUrl={'default audioUrl'}
      />
      <AudioDetails style={styles.audioDetails} data={audioInfo} />

      <TranscribeCard style={styles.transcribe} data={audioInfo} />
    </ScrollView>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: 'background-basic-color-2',
  },

  titleText: {
    paddingLeft: 10,
  },

  audioPlayerControls: {
    backgroundColor: Colors.secondaryColor,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  audioDetails: {
    backgroundColor: Colors.secondaryColor,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
  },

  transcribe: {
    backgroundColor: Colors.secondaryColor,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  contentContainer: {
    paddingVertical: 24,
  },
  detailsList: {
    alignSelf: 'center',
    marginVertical: 24,
  },
  descriptionLabel: {
    margin: 16,
  },
  sectionLabel: {
    marginHorizontal: 16,
  },
  buyButton: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  cancel: {alignItems: 'flex-end', paddingRight: 20, paddingTop: 20},
});

export default AudioInfo;
