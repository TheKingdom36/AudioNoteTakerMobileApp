import React, {useState} from 'react';
import {View, FlatList, StyleSheet, Text, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Card} from '@ui-kitten/components';

const SelectablePanel = props => {
  const onPress = () => {
    props.onSelect({text: props.text});
  };

  return (
    <Pressable style={containerStyle(props.isSelected)} onPress={onPress}>
      <Text style={textStyle(props.isSelected)}>{props.text}</Text>
    </Pressable>
  );
};

const containerStyle = isSelected => {
  let backColor = '';

  if (isSelected) {
    backColor = '#FFA500';
  } else {
    backColor = 'white';
  }

  return {
    flex: 1,
    margin: 5,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFA500',
    width: 250,
    height: 60,
    backgroundColor: backColor,
    justifyContent: 'center',
    alignItems: 'center',
  };
};

const textStyle = isSelected => {
  let textColor = '';

  if (isSelected) {
    textColor = 'white';
  } else {
    textColor = '#FFA500';
  }

  return {
    color: textColor,
  };
};

const componentStyle = isSelected => {};

const styles = StyleSheet.create({});

export default SelectablePanel;
