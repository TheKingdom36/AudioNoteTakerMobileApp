import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Text, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card} from '@ui-kitten/components';
import {Colors} from '../Utils/Colors';

const SelectablePanel = props => {
  const onPress = () => {
    props.onSelect({text: props.text});
  };

  return (
    <Pressable
      style={[containerStyle(props.isSelected), props.styles]}
      onPress={onPress}>
      <Text>{props.text}</Text>
    </Pressable>
  );
};

const containerStyle = isSelected => {
  let backColor = '';

  if (isSelected) {
    backColor = Colors.secondaryColor;
  } else {
    backColor = 'white';
  }

  return {
    flex: 1,
    margin: 5,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Colors.secondaryColor,
    height: 60,
    backgroundColor: backColor,
    justifyContent: 'center',
    alignItems: 'center',
  };
};

const componentStyle = isSelected => {};

const styles = StyleSheet.create({});

export default SelectablePanel;
