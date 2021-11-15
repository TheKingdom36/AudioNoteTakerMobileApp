import React from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import AudioPanel from '../molecules/AudioPanel';
import Player from './Player';

const PanelList = ({ audioIds, options = {} }) => {

  const renderItem = ({ item }) => <Player audioId={item} />;

  const [titleSearchText, setTitleSearchText] = React.useState('');


  return (
    <View style={[styles.container]}>
      <View behavior="padding" style={[styles.listSection]}>
        <FlatList
          numColumns={2}
          horizontal={false}
          data={audioIds}
          renderItem={renderItem}
          keyExtractor={item => item.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});



export default PanelList;
