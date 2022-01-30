import React from 'react';
import defaultStringValue from '../Elements/String';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Colors} from '../../Colors';

const Controls = ({paused, onPressPlay, onPressPause}) => {
  return (
    <View style={styles.container}>
      {paused ? (
        <TouchableOpacity onPress={onPressPlay}>
          <View style={styles.playButton}>
            <MaterialCommunityIcons name="play" size={70} />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPressPause}>
          <View style={styles.playButton}>
            <MaterialCommunityIcons name="pause" size={60} />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Controls;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  playButton: {
    height: 72,
    width: 72,
    borderWidth: 1,
    borderColor: defaultStringValue.darkColor,
    borderRadius: 72 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
