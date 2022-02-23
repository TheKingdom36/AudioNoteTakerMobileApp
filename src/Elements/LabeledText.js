import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const LabeledText = ({label, text, style, textStyle, labelStyle}) => {
  return (
    <View style={([styles.container], style)}>
      <Text style={labelStyle}>{label}</Text>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default LabeledText;
