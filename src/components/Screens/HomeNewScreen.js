import React from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import PanelList from '../organisms/PanelList';
import {useSelector, useDispatch} from 'react-redux';
import {decrement, increment, incrementByAmount} from '../../CounterSlice';
import {addRec, removeRec, addRecList, clear} from '../../AudioRecsSlice';

const NewHomeScreen = ({audioId}) => {
  const onCreateTranscriptPressed = () => {
    console.log('Button Pressed');
  };

  console.log(audioId);
  return (
    <View>
      <Text>{audioId}</Text>

      <Button title="Create transcript" onPress={onCreateTranscriptPressed} />

      <Text>View Recording Screen</Text>
    </View>
  );
};

export default NewHomeScreen;
