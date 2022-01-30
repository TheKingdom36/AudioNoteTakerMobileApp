import React from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Colors} from '../Utils/Colors';
import AudioPlayer from '../Components/Player.component';
import NewRecordingForm from '../Components/NewRecordingForm.component';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScreenNames} from './MainNavigator';

const ConfirmNewRecordingScreen = ({navigation, route}) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.cancel}
        onPress={() => navigation.navigate(ScreenNames.Home)}>
        <Entypo name="cross" size={50} />
      </Pressable>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}>
        <View style={[styles.audioPlayerSection]}>
          <AudioPlayer
            containerStyle={styles.audioPlayerContainer}
            audioId={1}
          />
        </View>

        <NewRecordingForm />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  contentContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  scrollView: {
    backgroundColor: Colors.mainBackground,
    marginHorizontal: 20,
  },
  informationInput: {
    backgroundColor: 'black',
    marginLeft: '5%',
    marginRight: '5%',
  },
  tagsSelection: {},
  recordTimeText: {
    fontSize: 50,
  },
  audioPlayerSection: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  audioPlayerContainer: {
    margin: '10%',
  },
  cancel: {alignItems: 'flex-end', paddingRight: 20, paddingTop: 20},
  descriptionInput: {},
  titleInput: {},
});

export default ConfirmNewRecordingScreen;
