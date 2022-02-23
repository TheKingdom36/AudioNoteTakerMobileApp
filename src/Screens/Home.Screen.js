import React, {useEffect} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {updateRecList} from '../Slices/AudioRecsSlice';
import {useIsFocused} from '@react-navigation/native';
import {Layout, Card, Text, Button} from '@ui-kitten/components';
import {Colors} from '../Utils/Colors';
import {ScreenNames} from './MainNavigator';
import AudioPreview from '../Components/AudioPreview.component';
import FourGrid from '../Components/FourGrid.component';
import AudioApi from '../Utils/ClientApis/AudioApi';
import {ConstructAudioUrl} from '../Utils/AudioUtils';
import UserStats from '../Components/UserStats.component';
import {fetchUser, setUser} from '../Slices/UserSlice';
import {fetchToken} from '../Slices/AuthSlice';

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

  const userInfo = useSelector(state => {
    console.log(state.user);
    return state.user.User;
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

  async function sample() {
    await dispatch(
      fetchToken({username: 'dan@gmail.com', password: 'password'}),
    );
    console.log('Sample');
    await dispatch(fetchUser({}));
  }

  return (
    <Layout style={[styles.container]}>
      <Button onPress={sample} />

      <View style={[styles.upperSectionView]}>
        <Text style={styles.text} category="h4">
          Stats
        </Text>

        <UserStats />
      </View>

      <View style={[styles.buffer]} />
      <View style={[styles.lowerSectionView]}>
        <Text style={styles.text} category="h4">
          Recent Recordings
        </Text>

        <View style={[styles.recentRecordingSection]}>
          <FourGrid items={recentAudioRecordings()} />
        </View>

        <View style={[styles.buffer]} />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondaryColor,
    padding: 10,
    paddingTop: 20,
  },
  upperSectionView: {
    height: '30%',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  lowerSectionView: {
    height: '68%',
    borderRadius: 20,
    backgroundColor: 'white',
  },
  recentRecordingSection: {
    height: '90%',
    margin: 'auto',
    justifyContent: 'center',
  },
  buffer: {
    height: '2%',
  },
  text: {
    margin: 2,
    paddingLeft: 10,
  },
  headingText: {
    height: '20%',
    fontSize: 30,
    paddingLeft: 20,
    paddingTop: 10,
  },
});

export default HomeScreen;
