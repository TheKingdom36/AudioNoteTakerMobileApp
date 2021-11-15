import React, {Component, useImperativeHandle} from 'react';
import {Text, useColorScheme, View} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const NavBar = props => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View>
      <Text>Hello {props.name}</Text>
    </View>
  );
};

export default AudioPanel;
