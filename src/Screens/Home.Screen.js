import React, {useEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {updateRecList} from '../Utils/AudioRecsSlice';
import {useIsFocused} from '@react-navigation/native';
import {Layout, Card, Text} from '@ui-kitten/components';
import {Colors} from '../Utils/Colors';
import {ScreenNames} from './MainNavigator';
import AudioPreview from '../Components/AudioPreview.component';
import FourGrid from '../Components/FourGrid.component';
import AudioApi from '../Utils/ClientApis/AudioApi';
import {ConstructAudioUrl} from '../Utils/AudioUtils';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
  var isFocused = useIsFocused();
  const dispatch = useDispatch();

  const recentAudioIds = useSelector(state => {
    const ids = [];
    state.audioRecs.values.forEach(element => {
      ids.push(element.id);
    });

    return ids.slice(0, 4);
  });

  const recentAudioRecordings = () => {
    var audios = [];

    recentAudioIds.forEach(id => {
      audios.push(
        <View style={{flex: 1, margin: 5}}>
          <AudioPreview audioId={id} audioUrl={ConstructAudioUrl(id)} />
        </View>,
      );
    });

    return audios;
  };

  useEffect(() => {
    AudioApi.instance
      .getRecordings()
      .then(result => dispatch(updateRecList(result)));
  }, [dispatch, isFocused]);

  function onPress() {
    navigation.navigate(ScreenNames.NewRecording);
  }

  return (
    <Layout style={[styles.container]}>
      <View style={[styles.buffer]} />

      <View style={{alignItems: 'center'}}>
        <Text style={styles.text} category="h4">
          Create New Recording
        </Text>
      </View>

      <Card style={[styles.newRecordingSection]}>
        <View>
          <Pressable onPress={onPress} style={styles.createRecording}>
            <MaterialIcons name="create" size={60} />
          </Pressable>
        </View>
      </Card>

      <View style={[styles.buffer]} />

      <View style={{alignItems: 'center'}}>
        <Text style={styles.text} category="h4">
          Your Recent Recordings
        </Text>
      </View>

      <View style={[styles.recentRecordingSection]}>
        <FourGrid items={recentAudioRecordings()} />
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
    justifyContent: 'center',
    alignContent: 'center',
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
  text: {
    margin: 2,
    color: '#808080',
  },
  createRecording: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
