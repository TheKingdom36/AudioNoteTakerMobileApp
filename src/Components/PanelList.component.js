import React from 'react';
import {StyleSheet} from 'react-native';
import AudioPreview from './AudioPreview.component';
import {List, ListItem, Text} from '@ui-kitten/components';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PanelList = ({audioIds, options = {}}) => {
  const renderItem = ({item}) => (
    <ListItem style={[styles.item]} {...touchableOpacityProps}>
      <AudioPreview audioId={item} />
    </ListItem>
  );

  let touchableOpacityProps = {disabled: true};

  return (
    <List
      style={[styles.container]}
      numColumns={2}
      horizontal={false}
      data={audioIds}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
  item: {
    width: '50%',
  },
});

export default PanelList;
