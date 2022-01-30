import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {Text, Button, ListProps} from '@ui-kitten/components';
import LabeledText from '../Elements/LabeledText';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

const AudioDetails = ({data, style, ...viewProps}) => {
  console.log('info', data);
  const Details = ({audioInfo}) => {
    console.log('title', audioInfo);
    return (
      <View>
        <Text appearance="hint" category="s2">
          Description
        </Text>
        <Text category="s1">{audioInfo.description}</Text>

        <Text appearance="hint" category="s2">
          Length
        </Text>
        <Text category="s1">{audioInfo.length}</Text>
        <Text appearance="hint" category="s2">
          Created
        </Text>
        <Text category="s1">{audioInfo.createdAt}</Text>
      </View>
    );
  };

  return (
    <View {...viewProps} style={[styles.container, style]}>
      <Details audioInfo={data} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  textStyle: {
    fontSize: 20,
    color: 'black',
  },
  labelStyle: {
    fontSize: 20,
    color: 'grey',
  },
  labelContainer: {},
});

export default AudioDetails;
