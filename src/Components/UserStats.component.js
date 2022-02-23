import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {Text, Button, ListProps} from '@ui-kitten/components';
import LabeledText from '../Elements/LabeledText';
import {black} from 'react-native-paper/lib/typescript/styles/colors';

const UserStats = () => {
  return (
    <View style={styles.container}>
      <Text>Stats</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UserStats;
