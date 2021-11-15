import React, { useEffect } from 'react';
import { View, StyleSheet, Pressable, Image, SafeAreaView } from 'react-native';
import PanelList from '../organisms/PanelList';
import { useSelector, useDispatch } from 'react-redux';
import { updateRecList, clearAudioRecs, fetchAudioRecs } from '../../AudioRecsSlice';
import { useIsFocused } from '@react-navigation/native';


const HomeScreen = ({ navigation }) => {

  var isFocused = useIsFocused();
  const dispatch = useDispatch();

  const audioIds = useSelector((state) => {
    const ids = [];
    state.audioRecs.values.forEach(element => {
      ids.push(element.id);
    });

    return ids;
  });


  useEffect(() => {

    fetchAudioRecs()
      .then(response => {
        dispatch(updateRecList(response))
      })
      .catch(error => "Error " + error);
  }, [isFocused]);


  return (
    <SafeAreaView style={[styles.container]}>

      <View style={[styles.buffer]} />

      <View style={[styles.newRecordingSection]}>
        <Pressable onPress={() => navigation.navigate("NewRecording")}>
          <Image source={require('../../img/recordIcon.jpg')} />
        </Pressable>
      </View>

      <View style={[styles.buffer]} />

      <View style={[styles.recentRecordingSection]}>
        <PanelList audioIds={audioIds} />
      </View>

      <View style={[styles.buffer]} />




    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fcc57e",
    paddingRight: 10,
    paddingLeft: 10,
  },
  newRecordingSection: {
    flex: 2,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FFA500",
    borderRadius: 50,
  },
  titleText: {
    fontSize: 40
  },
  recentRecordingSection: {
    flex: 4,
    justifyContent: 'center',

  },
  buffer: {
    flex: 0.15
  }

});



export default HomeScreen;

