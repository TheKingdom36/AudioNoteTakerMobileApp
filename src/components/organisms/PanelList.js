import React from 'react';
import {StyleSheet} from 'react-native';
import Player from './Player';
import {List, ListItem, Text} from '@ui-kitten/components';
import {Card} from '@ui-kitten/components';
const PanelList = ({audioIds, options = {}}) => {
  const renderItem = ({item}) => (
    <ListItem style={[styles.item]}>
      <Player audioId={item} />
    </ListItem>
  );

  const [titleSearchText, setTitleSearchText] = React.useState('');

  return (
    <List
      style={styles.container}
      numColumns={2}
      horizontal={false}
      data={audioIds}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcc57e',
  },
  item: {
    width: '50%',
    backgroundColor: '#fcc57e',
  },
});

export default PanelList;
