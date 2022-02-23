import {View, StyleSheet} from 'react-native';
import React from 'react';

const FourGrid = ({items}) => {
  var firstRow = [];
  var secondRow = [];

  for (let i = 0; i < items.length; i++) {
    if (i < 2) {
      firstRow.push(<View style={[styles.row]}>{items[i]}</View>);
    } else {
      secondRow.push(<View style={[styles.row]}>{items[i]}</View>);
    }
  }

  return (
    <View style={[styles.grid]}>
      <View style={[styles.column]}>{firstRow}</View>
      <View style={[styles.column]}>{secondRow}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  column: {
    flex: 1,
    flexDirection: 'row',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  grid: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default FourGrid;
