import React, {setState} from 'react';

import defaultStringValue from '../Elements/String';
import {View, Text, StyleSheet} from 'react-native';

import Slider from '@react-native-community/slider';

function pad(n, width, z = 0) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const minutesAndSeconds = position => [
  Math.floor(position / 60),
  Math.floor(position % 60),
];

const AudioProgressBar = ({
  trackLength,
  currentPosition,
  onSeek,
  onSlidingStart,
}) => {
  //tracklength and currentPostion are in milliseconds
  const elapsed = minutesAndSeconds(currentPosition / 60);
  const length = minutesAndSeconds(trackLength / 60);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Text style={[styles.text, {color: defaultStringValue.darkColor}]}>
          {elapsed[0] + ':' + elapsed[1]}
        </Text>
        <View style={{flex: 1}} />
        <Text
          style={[
            styles.text,
            {width: 40, color: defaultStringValue.darkColor},
          ]}>
          {length[0] + ':' + length[1]}
        </Text>
      </View>
      <Slider
        maximumValue={Math.max(trackLength, 1, currentPosition + 1)}
        onSlidingStart={onSlidingStart}
        onSlidingComplete={onSeek}
        value={currentPosition}
        minimumTrackTintColor={defaultStringValue.darkColor}
        maximumTrackTintColor={defaultStringValue.lightGrayColor}
        thumbStyle={styles.thumb}
        trackStyle={styles.track}
      />
    </View>
  );
};

export default AudioProgressBar;

const styles = StyleSheet.create({
  slider: {
    marginTop: -12,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
  },
  track: {
    height: 2,
    borderRadius: 1,
  },
  thumb: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: defaultStringValue.darkColor,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 12,
    textAlign: 'center',
  },
});
