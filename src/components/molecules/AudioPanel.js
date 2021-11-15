import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import LabeledText from '../atoms/LabeledText';
import { useNavigation } from '@react-navigation/native';
import AudioProgressBar from '../organisms/AudioProgressBar';
import Player from '../organisms/Player';



const AudioPanel = ({ audioId }) => {




  const navigation = useNavigation();

  const audioInfo = useSelector((state) => {
    const result = state.audioRecs.values.find((element) => element.id == audioId)
    return result;
  });



  const onPressPanel = () => {
    console.log("panelPressed");

    navigation.navigate("RecordingInfo", { audioId: 1 });

  }

  const onPressPlay = () => {
    console.log("play button pressed")
  };

  return (

    <Pressable onPress={onPressPanel} style={[styles.container]}>


      <View style={[styles.infoSec]}>
        <LabeledText

          label={"Title"}
        />
        <LabeledText
          text={<Text>{audioInfo.createdAt}</Text>}
          label={"Created"}
        />
        <LabeledText
          text={<Text>{audioInfo.length}</Text>}
          label={"Length"}
        />


      </View>




    </Pressable>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    padding: 6,
    width: 180,
    height: 200,
    borderRadius: 50,
    backgroundColor: "#FFA500",

  },
  infoSec: {
    flex: 1,

    paddingLeft: 10,
    paddingTop: 10
  },
  playButton: {
    flex: 1,
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',

  }
});
1


export default AudioPanel;
