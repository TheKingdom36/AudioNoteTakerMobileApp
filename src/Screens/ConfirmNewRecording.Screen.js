import React from 'react';
import {View, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Colors} from '../Utils/Colors';
import AudioPlayer from '../Components/Player.component';
import NewRecordingForm from '../Components/NewRecordingForm.component';
import Entypo from 'react-native-vector-icons/Entypo';
import {ScreenNames} from './MainNavigator';
import AudioApi from '../Utils/ClientApis/AudioApi';
const ConfirmNewRecordingScreen = ({navigation, route}) => {
  console.log('route', route);

  const onSubmit = data => {
    console.log('data', data);
    AudioApi.instance.createRecording(route.params.path, data.Title, data.tags);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainView}>
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
              audioUrl={route.params.path}
            />
          </View>

          <NewRecordingForm onSubmit={data => onSubmit(data)} />
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.secondaryColor,
  },
  contentContainer: {
    justifyContent: 'center',
    flexGrow: 1,
  },
  scrollView: {
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
  mainView: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'white',
  },
});

export default ConfirmNewRecordingScreen;
