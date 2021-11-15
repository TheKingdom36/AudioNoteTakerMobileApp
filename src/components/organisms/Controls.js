import React from 'react';
import defaultStringValue from '../atoms/String';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

const Controls = ({
  paused,
  onPressPlay,
  onPressPause,
}) => {
  return (
    <View style={styles.container}>
      {!paused ?
        <TouchableOpacity onPress={onPressPause}>
          <View style={styles.playButton}>
            <Image source={require('../../img/resizedLogo.png')} />
          </View>
        </TouchableOpacity> :
        <TouchableOpacity onPress={onPressPlay}>
          <View style={styles.playButton}>
            <Image source={require('../../img/resizedLogo.png')} />
          </View>
        </TouchableOpacity>
      }
    </View>)
}


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
  }
})