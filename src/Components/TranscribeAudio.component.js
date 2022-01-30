import React, {useState} from 'react';
import {StyleSheet, Text, View, ViewProps, Image} from 'react-native';
import {Button, ListProps} from '@ui-kitten/components';

import AudioApi from '../Utils/ClientApis/AudioApi';

const TranscribeCard = props => {
  const {audioInfo, style, ...viewProps} = props;
  const [loading, setLoading] = useState(false);
  const [transcription, setTranscription] = useState('');

  const getTranscription = ({audioId}) => {
    return AudioApi.instance.getTranscription(audioId);
  };

  const loadTranscription = ({audioId}) => {
    setLoading(true);
    setTimeout(() => {
      setTranscription('Updated');
      setLoading(false);
    }, 2000);
    //getTranscription(audioId).then(setLoading(false));
  };

  const TranscribeItem = () => {
    if (transcription !== '') {
      return <Text>{transcription}</Text>;
    } else {
      return <Button onPress={loadTranscription} />;
    }
  };

  return (
    <View {...viewProps} style={[styles.container, style]}>
      {loading === false ? (
        <TranscribeItem />
      ) : (
        //Put Image
        <Text>Image Should be here</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  primaryImage: {
    alignSelf: 'center',
    width: 56,
    height: 60,
    borderRadius: 8,
  },
});

export default TranscribeCard;
