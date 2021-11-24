import React, {useEffect} from 'react';
import {View, StyleSheet, Pressable, Image, SafeAreaView} from 'react-native';
import PanelList from '../organisms/PanelList';
import {useSelector, useDispatch} from 'react-redux';
import {
  updateRecList,
  clearAudioRecs,
  fetchAudioRecs,
} from '../../AudioRecsSlice';
import {useIsFocused} from '@react-navigation/native';
import {Layout, Card, Text} from '@ui-kitten/components';
import {Colors} from '../../colors';

const HomeScreen = ({navigation}) => {
  var isFocused = useIsFocused();
  const dispatch = useDispatch();

  const audioIds = useSelector(state => {
    const ids = [];
    state.audioRecs.values.forEach(element => {
      ids.push(element.id);
    });

    return ids;
  });

  useEffect(() => {
    fetchAudioRecs()
      .then(response => {
        dispatch(updateRecList(response));
      })
      .catch(error => 'Error ' + error);
  }, [dispatch, isFocused]);

  function onPress() {
    console.log('Hello');

    navigation.navigate('NewRecording');
  }

  return (
    <Layout style={[styles.container]}>
      <View style={[styles.buffer]} />

      <Card style={[styles.newRecordingSection]}>
        <View>
          <Pressable onPress={onPress}>
            <Image source={require('../../img/recordIcon.jpg')} />
          </Pressable>
        </View>
      </Card>

      <View style={[styles.buffer]} />

      <View style={[styles.recentRecordingSection]}>
        <PanelList audioIds={audioIds} />
      </View>
      <View style={[styles.buffer]} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
    paddingRight: 10,
    paddingLeft: 10,
  },
  newRecordingSection: {
    flex: 2,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.secondaryColor,
    borderRadius: 50,
  },
  titleText: {
    fontSize: 40,
  },
  recentRecordingSection: {
    flex: 4,
    justifyContent: 'center',
  },
  buffer: {
    flex: 0.15,
  },
});

export default HomeScreen;
