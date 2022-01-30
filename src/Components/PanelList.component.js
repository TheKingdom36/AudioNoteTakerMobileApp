import React from 'react';
import {StyleSheet} from 'react-native';
import AudioPreview from './AudioPreview.component';
import {List, ListItem, Text} from '@ui-kitten/components';

const PanelList = ({audioIds, options = {}}) => {
  const renderItem = ({item}) => (
    <ListItem style={[styles.item]}>
      <AudioPreview audioId={item} />
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
    padding: 0,
  },
  item: {
    width: '50%',
  },
});

export default PanelList;
